import React from "react";
import { useLocation } from "react-router-dom";
// import { useQuery } from "react-query";
// import axios from "axios";
// import { List } from "../types/list";

const Lists: React.FC = () => {
  const location = useLocation();
  const folderName = location.state?.folderName || "Folder";

  // const listsQuery = useQuery<List[]>(
  //   ["lists", folderId, searchTerm],
  //   async () => {
  //     const response = await axios.get(
  //       `http://localhost:8080/api/folders/${folderId}/lists`,
  //       {
  //         params: { search: searchTerm },
  //       }
  //     );
  //     return response.data;
  //   }
  // );

  // Add functions for creating, editing, and deleting lists

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-16">
      {/* Header */}
      <header className="bg-gray-100 dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {folderName} - Lists
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* Add search input, buttons, and list of lists here */}
            {/* Similar structure to the Folders component */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lists;
