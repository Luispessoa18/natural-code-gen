
import { AppRequirements, GeminiResponse, ProjectStructure } from "@/lib/types";
import { toast } from "sonner";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export async function generateProjectFromPrompt(
  prompt: string,
  apiKey: string
): Promise<GeminiResponse | null> {
  try {
    if (!apiKey) {
      toast.error("Please enter a Gemini API key");
      return null;
    }

    console.log("Initializing Google Generative AI with provided API key");
    const genAI = new GoogleGenerativeAI(apiKey);

    // Usando o modelo mais recente compartilhado pelo usuário
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-pro-exp-02-05",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const enhancedPrompt = `
    You are an expert software architect and developer. I need you to generate a complete software project based on the following description:
    
    ${prompt}
    
    Please provide a comprehensive response in JSON format with the following structure:
    
    {
      "requirements": {
        "appType": "The type of application (e.g., todo app, e-commerce, etc.)",
        "mainFeatures": ["List of main features extracted from the prompt"],
        "techStack": ["List of technologies to be used"],
        "designRequirements": ["List of design requirements"],
        "description": "A brief description of the application"
      },
      "projectStructure": {
        "folders": [
          {
            "name": "folder name",
            "path": "/path/to/folder",
            "children": [] // Can contain nested folders or files
          }
        ],
        "files": [
          {
            "name": "filename.ext",
            "path": "/path/to/file",
            "content": "Full code content of the file",
            "language": "programming language (js, ts, css, etc.)"
          }
        ]
      },
      "explanation": "Explanation of the architecture and how the components work together"
    }
    
    Focus on creating a well-structured and maintainable codebase. Only include essential files needed to demonstrate the core functionality. Provide detailed code for each file, following best practices for the chosen technologies.
    `;
    
    console.log("Sending request to Gemini API with model: gemini-2.0-pro-exp-02-05");
    
    // Create a chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    
    // Send the message
    const result = await chatSession.sendMessage(enhancedPrompt);
    const responseText = result.response.text();
    
    console.log("Received response from Gemini API");
    
    // Extract JSON from the response
    const jsonRegex = /{[\s\S]*}/g;
    const jsonMatch = responseText.match(jsonRegex);
    
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from the response");
    }
    
    try {
      const parsedData = JSON.parse(jsonMatch[0]);
      return parsedData as GeminiResponse;
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      throw new Error("Failed to parse JSON from Gemini response");
    }
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    toast.error(error instanceof Error ? error.message : "Failed to generate project");
    return null;
  }
}
