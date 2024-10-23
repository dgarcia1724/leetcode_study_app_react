import React from "react";
import { Folder } from "../../types/folder";
import FolderItem from "./FolderItem";

interface FolderListProps {
  folders: Folder[];
  onEditFolder: (folder: Folder) => void;
  onDeleteFolder: (folderId: number) => void;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  onEditFolder,
  onDeleteFolder,
}) => {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {folders.map((folder) => (
        <FolderItem
          key={folder.id}
          folder={folder}
          onEdit={() => onEditFolder(folder)}
          onDelete={() => onDeleteFolder(folder.id)}
        />
      ))}
    </ul>
  );
};

export default FolderList;
