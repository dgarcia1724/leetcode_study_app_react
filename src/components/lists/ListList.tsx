import React from "react";
import { List } from "../../types/list";

interface ListListProps {
  lists: List[];
  onListClick: (listId: number, listName: string) => void;
}

const ListList: React.FC<ListListProps> = ({ lists, onListClick }) => {
  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {lists.map((list) => (
        <li key={list.id} className="py-4">
          <button
            onClick={() => onListClick(list.id, list.name)}
            className="text-left w-full flex items-center justify-between"
          >
            <span className="text-lg font-medium text-gray-900 dark:text-white">
              {list.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(list.editDate).toLocaleDateString()}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListList;
