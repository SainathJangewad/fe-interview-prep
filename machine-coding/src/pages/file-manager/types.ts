export type FileType = {
    id: string;
    name: string;
    type: "file";
  };
  
  export type FolderType = {
    id: string;
    name: string;
    type: "folder";
    children: (FileType | FolderType)[];
  };
  
  export type FileOrFolder = FileType | FolderType;