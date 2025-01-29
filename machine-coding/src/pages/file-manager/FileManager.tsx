// src/components/FileManager.tsx
import React, { useState } from "react";
import { FileOrFolder, FolderType } from './types'

interface FileManagerProps {
  data: FileOrFolder;
  dispatch: React.Dispatch<any>;
}

const FileManager: React.FC<FileManagerProps> = ({ data, dispatch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(data.name);

  const handleAddItem = (type: "file" | "folder") => {
    const name = prompt(`Enter a name for the new ${type}:`);
    if (name) {
      const newItem: FileOrFolder =
        type === "file"
          ? { id: Date.now().toString(), name, type: "file" }
          : { id: Date.now().toString(), name, type: "folder", children: [] };
      dispatch({ type: "ADD_ITEM", payload: newItem });
    }
  };

  const handleRename = () => {
    if (newName.trim() && newName !== data.name) {
      dispatch({ type: "RENAME_ITEM", payload: { id: data.id, newName } });
      setIsRenaming(false);
    }
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <div>
        {data.type === "folder" ? (
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "▼" : "►"} {data.name}
          </button>
        ) : (
          <span>{data.name}</span>
        )}
        <button onClick={() => setIsRenaming(true)}>Rename</button>
        {data.type === "folder" && (
          <>
            <button onClick={() => handleAddItem("file")}>Add File</button>
            <button onClick={() => handleAddItem("folder")}>Add Folder</button>
          </>
        )}
      </div>
      {isRenaming && (
        <div>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleRename}>Save</button>
          <button onClick={() => setIsRenaming(false)}>Cancel</button>
        </div>
      )}
      {isExpanded && data.type === "folder" && (
        <div>
          {data.children.map((child:any) => (
            <FileManager key={child.id} data={child} dispatch={dispatch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileManager;