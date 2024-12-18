import React, { useState, useRef, useEffect } from "react";
import FolderList from "../components/folders/FolderList";
import NewFolderModal from "../components/folders/NewFolderModal";
import EditFolderModal from "../components/folders/EditFolderModal";
import { FiChevronDown } from "react-icons/fi";
import { debounce } from "lodash";
import { useAuth } from "../hooks/useAuth";
import { useFolders } from "../hooks/useFolders";
import { Folder } from "../types/folder";
import { useToast } from "../components/Toast/ToastProvider";
import { useNavigate } from "react-router-dom";

const Folders: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditFolder, setCurrentEditFolder] = useState<Folder | null>(
    null
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<"a-z" | "recent">("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    foldersQuery,
    createFolderMutation,
    editFolderMutation,
    deleteFolderMutation,
  } = useFolders(user?.uid || "", filterOption, searchTerm);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (folder: Folder) => {
    setCurrentEditFolder(folder);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentEditFolder(null);
    setIsEditModalOpen(false);
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleCreateFolder = async (folderName: string) => {
    try {
      await createFolderMutation.mutateAsync(folderName);
      closeModal();
      showToast("Folder created successfully!", "success");
    } catch (error) {
      console.error("Error creating folder:", error);
      showToast("Failed to create folder. Please try again.", "error");
      throw error;
    }
  };

  const handleEditFolder = async (folderId: number, folderName: string) => {
    try {
      await editFolderMutation.mutateAsync({ folderId, folderName });
      console.log(`Folder with id ${folderId} updated successfully`);
      closeEditModal();
      showToast("Folder updated successfully!", "success");
    } catch (error) {
      console.error("Error editing folder:", error);
      showToast("Failed to update folder. Please try again.", "error");
      throw error;
    }
  };

  const handleDeleteFolder = async (folderId: number) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      try {
        await deleteFolderMutation.mutateAsync(folderId);
        console.log(`Folder with id ${folderId} deleted successfully`);
        showToast("Folder deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting folder:", error);
        showToast("Failed to delete folder. Please try again.", "error");
        throw error;
      }
    }
  };

  const handleFilterChange = (option: "a-z" | "recent") => {
    setFilterOption(option);
    setIsFilterOpen(false);
  };

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFolderClick = (folderId: number, folderName: string) => {
    navigate(`/folders/${folderId}/lists`, { state: { folderName } });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-16">
      {/* Header */}
      <header className="bg-gray-100 dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Folders
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* Search input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search folders"
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4 mb-6">
              <button
                onClick={openModal}
                className="w-full sm:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                New Folder
              </button>
              <div className="relative" ref={filterRef}>
                <button
                  onClick={toggleFilter}
                  className="w-full sm:w-auto flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  Filter
                  <FiChevronDown className="ml-2" />
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <button
                        onClick={() => handleFilterChange("a-z")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        A-Z
                      </button>
                      <button
                        onClick={() => handleFilterChange("recent")}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-600"
                        role="menuitem"
                      >
                        Most Recent
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Folder list */}
            {foldersQuery.isLoading && (
              <p className="text-gray-700 dark:text-gray-300">
                Loading folders...
              </p>
            )}
            {foldersQuery.isError && (
              <p className="text-red-600 dark:text-red-400">
                Error loading folders
              </p>
            )}
            {foldersQuery.data && (
              <FolderList
                folders={foldersQuery.data}
                onEditFolder={openEditModal}
                onDeleteFolder={handleDeleteFolder}
                onFolderClick={handleFolderClick}
              />
            )}
          </div>
        </div>
      </main>

      <NewFolderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateFolder={handleCreateFolder}
      />

      <EditFolderModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onEditFolder={handleEditFolder}
        currentFolder={currentEditFolder}
      />
    </div>
  );
};

export default Folders;
