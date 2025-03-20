
import { useState } from "react";
import Hero from "./Hero";
import PromptInput from "./PromptInput";
import ResultDisplay from "./ResultDisplay";
import LoadingIndicator from "./LoadingIndicator";
import { GeminiResponse } from "@/lib/types";
import { generateProjectFromPrompt } from "@/services/gemini";

const AIProjectGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GeminiResponse | null>(null);
  
  const handleSubmit = async (prompt: string, apiKey: string) => {
    setIsLoading(true);
    try {
      const response = await generateProjectFromPrompt(prompt, apiKey);
      if (response) {
        setResult(response);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      <main className="flex-1 container py-12">
        <PromptInput onSubmit={handleSubmit} isLoading={isLoading} />
        
        {isLoading && (
          <LoadingIndicator className="mt-12" />
        )}
        
        {!isLoading && result && (
          <ResultDisplay data={result} />
        )}
      </main>
      
      <footer className="border-t py-6 mt-12">
        <div className="container">
          <p className="text-center text-sm text-muted-foreground">
            Natural Code Generator — AI-powered software creation platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIProjectGenerator;
