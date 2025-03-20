
export interface AppRequirements {
  appType: string;
  mainFeatures: string[];
  techStack: string[];
  designRequirements: string[];
  description: string;
}

export interface ProjectStructure {
  folders: FolderStructure[];
  files: FileStructure[];
}

export interface FolderStructure {
  name: string;
  path: string;
  children?: (FolderStructure | FileStructure)[];
}

export interface FileStructure {
  name: string;
  path: string;
  content: string;
  language: string;
}

export interface GeminiResponse {
  requirements: AppRequirements;
  projectStructure: ProjectStructure;
  explanation: string;
}
