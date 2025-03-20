
import { cn } from "@/lib/utils";

interface LoadingIndicatorProps {
  message?: string;
  className?: string;
}

const LoadingIndicator = ({ 
  message = "Generating project", 
  className 
}: LoadingIndicatorProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4 py-8",
      className
    )}>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-opacity-20"></div>
        <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-muted-foreground text-lg font-light loading-dots">{message}</p>
        <p className="text-sm text-muted-foreground mt-2">This may take a minute...</p>
      </div>
    </div>
  );
};

export default LoadingIndicator;
