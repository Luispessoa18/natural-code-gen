
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={cn("py-12 relative overflow-hidden", className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 opacity-50"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2YzYuNjMgMCAxMiA1LjM3IDEyIDEyaC02YzAgNi42MyA1LjM3IDEyIDEyIDEydjZjOS45NCAwIDE4LTguMDYgMTgtMThoLTZjMCA2LjYzLTUuMzcgMTItMTIgMTJ2LTZjLTYuNjMgMC0xMi01LjM3LTEyLTEyeiIgZmlsbD0iI2UyZThmMCIgZmlsbC1vcGFjaXR5PSIwLjQiLz48cGF0aCBkPSJNMzAgMHYxMmMwIDkuOTQtOC4wNiAxOC0xOCAxOHY2YzkuOTQgMCAxOCA4LjA2IDE4IDE4aDZjMC05Ljk0IDguMDYtMTggMTgtMTh2LTZjLTkuOTQgMC0xOC04LjA2LTE4LTE4VjBoLTZ6TTI0IDMwYzAgMy4zMS0yLjY5IDYtNiA2cy02LTIuNjktNi02IDIuNjktNiA2LTYgNiAyLjY5IDYgNnoiIGZpbGw9IiNlMmU4ZjAiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PC9nPjwvc3ZnPg==')]
      opacity-10 dark:opacity-5"></div>
      
      <div className="container max-w-5xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Natural Code Generation
            </span>
          </div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gradient">AI-Powered</span> Software Creation
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Transform your ideas into working code with the power of artificial intelligence.
            Describe what you want, and watch as your project comes to life.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <div className="flex items-center justify-center space-x-2 py-1 px-3 rounded-full text-sm bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-300">
              <span className="block w-2 h-2 rounded-full bg-green-500"></span>
              <span>React Applications</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 py-1 px-3 rounded-full text-sm bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-300">
              <span className="block w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Complete Project Structure</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 py-1 px-3 rounded-full text-sm bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-600 dark:bg-gray-800/80 dark:border-gray-700 dark:text-gray-300">
              <span className="block w-2 h-2 rounded-full bg-purple-500"></span>
              <span>Working Code</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
