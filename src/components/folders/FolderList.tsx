import React from "react";
import { Folder } from "../../types/folder";
import FolderItem from "./FolderItem";

interface FolderListProps {
  folders: Folder[];
}

const FolderList: React.FC<FolderListProps> = ({ folders }) => {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {folders.map((folder) => (
        <FolderItem key={folder.id} folder={folder} />
      ))}
    </ul>
  );
};

export default FolderList;