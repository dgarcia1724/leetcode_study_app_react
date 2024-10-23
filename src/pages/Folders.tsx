import React, { useState } from "react";
import { useFolders } from "../hooks/useFolders";
import FolderList from "../components/folders/FolderList";
import NewFolderModal from "../components/folders/NewFolderModal";

const Folders: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: folders, isLoading, isError } = useFolders();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateFolder = (folderName: string) => {
    // Implement folder creation logic here
    console.log(`Creating folder: ${folderName}`);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-gray-900 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-[#1877f2] dark:text-[#4267B2] font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-6 md:mb-8">
          Folders
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 md:p-8">
          <h2 className="text-[#1c1e21] dark:text-white font-bold text-xl sm:text-2xl mb-3 sm:mb-4">
            Folders
          </h2>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1877f2] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mb-4">
            <button
              onClick={openModal}
              className="w-full sm:w-auto bg-[#1877f2] text-white px-4 py-2 rounded-md font-semibold hover:bg-[#166fe5] transition duration-200"
            >
              New +
            </button>
            <button className="w-full sm:w-auto bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-300 transition duration-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
              Filter
            </button>
          </div>

          {/* Display folders */}
          {isLoading && <p>Loading folders...</p>}
          {isError && <p>Error loading folders</p>}
          {folders && <FolderList folders={folders} />}
        </div>
      </div>
      <NewFolderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
};

export default Folders;
