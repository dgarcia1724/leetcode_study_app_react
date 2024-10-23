import React from "react";
import { FiFolder, FiEdit2, FiTrash2 } from "react-icons/fi";

interface Folder {
  id: number;
  name: string;
  userId: string;
  editDate: string;
  confidencePercentage: number;
  lists: any[]; // You might want to define a more specific type for lists
}

interface FolderItemProps {
  folder: Folder;
  onEdit: (folderId: number) => void;
  onDelete: (folderId: number) => void;
}

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  onEdit,
  onDelete,
}) => {
  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <FiFolder className="h-6 w-6 text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {folder.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
            Last edited: {new Date(folder.editDate).toLocaleString()}
          </p>
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
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(folder.id)}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Edit folder"
          >
            <FiEdit2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(folder.id)}
            className="p-1 rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:text-red-400 dark:hover:bg-red-900"
            aria-label="Delete folder"
          >
            <FiTrash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default FolderItem;
