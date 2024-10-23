import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useLists } from "../hooks/useLists";
import NewListModal from "../components/lists/NewListModal";
import ListList from "../components/lists/ListList";
import { useToast } from "../components/Toast/ToastProvider";

const Lists: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const location = useLocation();
  const folderName = location.state?.folderName || "Folder";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  const { listsQuery, createListMutation } = useLists(
    Number(folderId),
    "recent",
    ""
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateList = async (listName: string) => {
    try {
      await createListMutation.mutateAsync(listName);
      closeModal();
      showToast("List created successfully!", "success");
    } catch (error) {
      console.error("Error creating list:", error);
      showToast("Failed to create list. Please try again.", "error");
    }
  };

  const handleListClick = (listId: number, listName: string) => {
    // Navigate to the problems page or handle list click
    console.log(`Clicked on list: ${listName} (ID: ${listId})`);
  };

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
            {/* Button */}
            <div className="mb-6">
              <button
                onClick={openModal}
                className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                New List
              </button>
            </div>

            {/* List list */}
            {listsQuery.isLoading && (
              <p className="text-gray-700 dark:text-gray-300">
                Loading lists...
              </p>
            )}
            {listsQuery.isError && (
              <p className="text-red-600 dark:text-red-400">
                Error loading lists
              </p>
            )}
            {listsQuery.data && (
              <ListList lists={listsQuery.data} onListClick={handleListClick} />
            )}
          </div>
        </div>
      </main>

      <NewListModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateList={handleCreateList}
      />
    </div>
  );
};

export default Lists;
