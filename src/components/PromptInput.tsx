
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PromptInputProps {
  onSubmit: (prompt: string, apiKey: string) => void;
  isLoading: boolean;
}

const PromptInput = ({ onSubmit, isLoading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState("");
  const [apiKey, setApiKey] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && apiKey.trim()) {
      onSubmit(prompt.trim(), apiKey.trim());
    }
  };
  
  const examplePrompts = [
    "Create a todo app with React that allows users to add, edit, and delete tasks. Include user authentication and data persistence.",
    "Build an e-commerce product page with a gallery, product details, and add to cart functionality.",
    "Design a simple weather app that shows current weather and 5-day forecast based on user location."
  ];
  
  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-3xl mx-auto glass-card dark:glass-card-dark rounded-xl p-6 md:p-8"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Describe your app or feature
          </label>
          <Textarea
            id="prompt"
            placeholder="E.g., Create a todo list app with user authentication, task categories, and due dates..."
            className="min-h-[140px] resize-y bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="api-key" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Gemini API Key
            </label>
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Get a free API key
            </a>
          </div>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your Gemini API key here"
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            disabled={isLoading}
          />
        </div>
        
        <div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            disabled={isLoading || !prompt.trim() || !apiKey.trim()}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? "Generating..." : "Generate Project"}
          </Button>
        </div>
      </form>
      
      <div className="mt-8">
        <p className="text-sm text-muted-foreground mb-3">Try an example:</p>
        <div className="flex flex-col space-y-2">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              disabled={isLoading}
              className="text-left text-sm px-4 py-2 rounded-lg bg-gray-100/80 hover:bg-gray-200/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 backdrop-blur-sm transition-colors duration-150"
            >
              {example.length > 100 ? `${example.substring(0, 100)}...` : example}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PromptInput;
