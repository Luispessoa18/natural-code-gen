
import { AppRequirements, GeminiResponse, ProjectStructure } from "@/lib/types";
import { toast } from "sonner";

const API_KEY = ""; // We'll use a form field for the API key since it's a free service

export async function generateProjectFromPrompt(
  prompt: string,
  apiKey: string
): Promise<GeminiResponse | null> {
  try {
    if (!apiKey) {
      toast.error("Please enter a Gemini API key");
      return null;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
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
    
    const payload = {
      contents: [
        {
          parts: [
            {
              text: enhancedPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 8192,
        topP: 0.8,
        topK: 40
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("No response from Gemini API");
    }

    const content = data.candidates[0].content;
    
    if (!content || !content.parts || content.parts.length === 0) {
      throw new Error("Invalid response structure from Gemini API");
    }

    const text = content.parts[0].text;
    
    // Extract JSON from the response
    const jsonRegex = /{[\s\S]*}/g;
    const jsonMatch = text.match(jsonRegex);
    
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
