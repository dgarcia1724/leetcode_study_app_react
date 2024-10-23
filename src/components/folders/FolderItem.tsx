import React from "react";
import { Folder } from "../../types/folder";

interface FolderItemProps {
  folder: Folder;
}

const FolderItem: React.FC<FolderItemProps> = ({ folder }) => {
  return (
    <li className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
      <h3 className="font-semibold">{folder.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Last edited: {new Date(folder.editDate).toLocaleString()}
      </p>
    </li>
  );
};

export default FolderItem;
