import React from "react";
import { Folder } from "../../types/folder";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface FolderListProps {
  folders: Folder[];
  onEditFolder: (folder: Folder) => void;
  onDeleteFolder: (folderId: number) => void;
  onFolderClick: (folderId: number, folderName: string) => void;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  onEditFolder,
  onDeleteFolder,
  onFolderClick,
}) => {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {folders.map((folder) => (
        <li
          key={folder.id}
          className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <button
            onClick={() => onFolderClick(folder.id, folder.name)}
            className="text-left flex-grow"
          >
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {folder.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(folder.editDate).toLocaleString()}
            </div>
            {folder.confidencePercentage > 0 && (
              <div className="mt-1">
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: `${folder.confidencePercentage}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {folder.confidencePercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            )}
          </button>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditFolder(folder);
              }}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteFolder(folder.id);
              }}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <FiTrash2 />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FolderList;
