
import { GeminiResponse, FileStructure, FolderStructure } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";
import { Folder, FileText, ChevronDown, ChevronRight, Code, FileCog, PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  data: GeminiResponse;
}

const ResultDisplay = ({ data }: ResultDisplayProps) => {
  const [selectedFile, setSelectedFile] = useState<FileStructure | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["/"]));
  
  const toggleFolder = (path: string) => {
    const newExpandedFolders = new Set(expandedFolders);
    if (newExpandedFolders.has(path)) {
      newExpandedFolders.delete(path);
    } else {
      newExpandedFolders.add(path);
    }
    setExpandedFolders(newExpandedFolders);
  };
  
  // Find all files recursively for the "Files" tab
  const getAllFiles = (): FileStructure[] => {
    const files: FileStructure[] = [...data.projectStructure.files];
    
    const extractFilesFromFolders = (folders: FolderStructure[]) => {
      folders.forEach(folder => {
        if (folder.children) {
          folder.children.forEach(child => {
            if ('content' in child) {
              files.push(child as FileStructure);
            } else {
              extractFilesFromFolders([child as FolderStructure]);
            }
          });
        }
      });
    };
    
    extractFilesFromFolders(data.projectStructure.folders);
    return files.sort((a, b) => a.path.localeCompare(b.path));
  };
  
  const renderFileTree = (items: (FolderStructure | FileStructure)[], parentPath = "/") => {
    return (
      <ul className="pl-3 space-y-1 text-sm">
        {items.map((item, index) => {
          if ('content' in item) {
            // It's a file
            const file = item as FileStructure;
            return (
              <li key={`file-${index}`}>
                <button
                  onClick={() => setSelectedFile(file)}
                  className={cn(
                    "flex items-center space-x-2 w-full text-left py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    selectedFile?.path === file.path && "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  )}
                >
                  <FileText className="h-3.5 w-3.5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                  <span className="truncate">{file.name}</span>
                </button>
              </li>
            );
          } else {
            // It's a folder
            const folder = item as FolderStructure;
            const folderPath = `${parentPath}${folder.name}/`;
            const isExpanded = expandedFolders.has(folderPath);
            
            return (
              <li key={`folder-${index}`} className="space-y-1">
                <button
                  onClick={() => toggleFolder(folderPath)}
                  className="flex items-center space-x-2 w-full text-left py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                  )}
                  <Folder className="h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                  <span className="font-medium">{folder.name}</span>
                </button>
                
                {isExpanded && folder.children && folder.children.length > 0 && (
                  renderFileTree(folder.children, folderPath)
                )}
              </li>
            );
          }
        })}
      </ul>
    );
  };
  
  const getColorForLanguage = (lang: string) => {
    const colors: Record<string, string> = {
      js: "text-yellow-600",
      jsx: "text-blue-500",
      ts: "text-blue-700",
      tsx: "text-blue-600",
      css: "text-pink-600",
      html: "text-red-600",
      json: "text-green-600",
      md: "text-gray-700",
    };
    
    return colors[lang] || "text-gray-700";
  };
  
  // Animation variants for the motion components
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.07
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl mx-auto glass-card dark:glass-card-dark rounded-xl p-6 md:p-8 mt-8"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          {data.requirements.appType}
        </h2>
        <p className="text-muted-foreground">{data.requirements.description}</p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mb-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Main Features</h3>
            <ul className="space-y-1 pl-5 list-disc text-sm">
              {data.requirements.mainFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {data.requirements.techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="h-[600px] border rounded-lg overflow-hidden">
        <Tabs defaultValue="structure" className="h-full flex flex-col">
          <div className="border-b px-4">
            <TabsList className="h-12">
              <TabsTrigger value="structure" className="flex items-center gap-1.5">
                <Folder className="h-4 w-4" />
                <span>Project Structure</span>
              </TabsTrigger>
              <TabsTrigger value="files" className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                <span>Files</span>
              </TabsTrigger>
              <TabsTrigger value="explanation" className="flex items-center gap-1.5">
                <FileCog className="h-4 w-4" />
                <span>Explanation</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <TabsContent value="structure" className="h-full p-0 m-0">
              <div className="h-full flex">
                <div className="w-1/3 border-r">
                  <div className="py-3 px-4 border-b bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center space-x-2">
                      <PanelLeft className="h-4 w-4" />
                      <h3 className="font-medium text-sm">Project Explorer</h3>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(600px-49px)]">
                    <div className="p-2">
                      {renderFileTree([...data.projectStructure.folders, ...data.projectStructure.files])}
                    </div>
                  </ScrollArea>
                </div>
                
                <div className="flex-1">
                  <div className="py-3 px-4 border-b bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <h3 className="font-medium text-sm truncate">
                        {selectedFile ? selectedFile.path : "Select a file to view its content"}
                      </h3>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(600px-49px)]">
                    {selectedFile ? (
                      <pre className="p-4 text-sm code-block-animate-in">
                        <code className={cn(
                          getColorForLanguage(selectedFile.language),
                          "whitespace-pre-wrap break-words"
                        )}>
                          {selectedFile.content}
                        </code>
                      </pre>
                    ) : (
                      <div className="h-full flex items-center justify-center p-4 text-muted-foreground">
                        Select a file from the project explorer to view its content
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="h-full p-0 m-0">
              <div className="h-full grid md:grid-cols-4 gap-0 border-t">
                <div className="col-span-1 border-r">
                  <div className="py-3 px-4 border-b bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="font-medium text-sm">All Files</h3>
                  </div>
                  <ScrollArea className="h-[calc(600px-49px)]">
                    <ul className="p-2 space-y-1">
                      {getAllFiles().map((file, index) => (
                        <li key={index}>
                          <button
                            onClick={() => setSelectedFile(file)}
                            className={cn(
                              "flex items-center space-x-2 w-full text-left text-xs px-2 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800",
                              selectedFile?.path === file.path && "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            )}
                          >
                            <FileText className="h-3.5 w-3.5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                            <span className="truncate">{file.path.replace(/^\//, '')}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
                
                <div className="col-span-3">
                  <div className="py-3 px-4 border-b bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4" />
                      <h3 className="font-medium text-sm truncate">
                        {selectedFile ? selectedFile.path : "Select a file to view its content"}
                      </h3>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(600px-49px)]">
                    {selectedFile ? (
                      <pre className="p-4 text-sm code-block-animate-in">
                        <code className={cn(
                          getColorForLanguage(selectedFile.language),
                          "whitespace-pre-wrap break-words"
                        )}>
                          {selectedFile.content}
                        </code>
                      </pre>
                    ) : (
                      <div className="h-full flex items-center justify-center p-4 text-muted-foreground">
                        Select a file from the list to view its content
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="explanation" className="h-full p-0 m-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Project Architecture & Explanation</h3>
                  <div className="prose dark:prose-invert prose-sm max-w-none">
                    <p className="whitespace-pre-line">{data.explanation}</p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default ResultDisplay;
