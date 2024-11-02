import React from "react";
import { List } from "../../types/list";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface ListListProps {
  lists: List[];
  onEditList: (list: List) => void;
  onDeleteList: (listId: number) => void;
  onListClick: (listId: number, listName: string) => void;
}

const ListList: React.FC<ListListProps> = ({
  lists,
  onEditList,
  onDeleteList,
  onListClick,
}) => {
  const formatDateToPacificTime = (dateString: string) => {
    // Ensure UTC by appending 'Z' if not present
    const utcDate = new Date(
      dateString.endsWith("Z") ? dateString : `${dateString}Z`
    );
    return utcDate.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
  };

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {lists.map((list) => (
        <li
          key={list.id}
          className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <button
            onClick={() => onListClick(list.id, list.name)}
            className="text-left flex-grow"
          >
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {list.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatDateToPacificTime(list.editDate)}
            </div>
            <div className="mt-1">
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${list.confidencePercentage}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {list.confidencePercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </button>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditList(list);
              }}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteList(list.id);
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

export default ListList;
