import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useLists } from "../hooks/useLists";
import NewListModal from "../components/lists/NewListModal";
import EditListModal from "../components/lists/EditListModal";
import ListList from "../components/lists/ListList";
import { FiChevronDown } from "react-icons/fi";
import { debounce } from "lodash";
import { useToast } from "../components/Toast/ToastProvider";
import { List } from "../types/list";

const Lists: React.FC = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const location = useLocation();
  const folderName = location.state?.folderName || "Folder";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditList, setCurrentEditList] = useState<List | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<"a-z" | "recent">("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const filterRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const {
    listsQuery,
    createListMutation,
    updateListMutation,
    deleteListMutation,
  } = useLists(Number(folderId), filterOption, searchTerm);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (list: List) => {
    setCurrentEditList(list);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentEditList(null);
    setIsEditModalOpen(false);
  };

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

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

  const handleEditList = async (listId: number, listName: string) => {
    try {
      await updateListMutation.mutateAsync({
        listId,
        listDetails: { name: listName },
      });
      closeEditModal();
      showToast("List updated successfully!", "success");
    } catch (error) {
      console.error("Error editing list:", error);
      showToast("Failed to update list. Please try again.", "error");
    }
  };

  const handleDeleteList = async (listId: number) => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      try {
        await deleteListMutation.mutateAsync(listId);
        showToast("List deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting list:", error);
        showToast("Failed to delete list. Please try again.", "error");
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

  const handleListClick = (listId: number, listName: string) => {
    navigate(`/folders/${folderId}/lists/${listId}`, { state: { listName } });
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
            {/* Search input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search lists"
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
                New List
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
              <ListList
                lists={listsQuery.data}
                onEditList={openEditModal}
                onDeleteList={handleDeleteList}
                onListClick={handleListClick}
              />
            )}
          </div>
        </div>
      </main>

      <NewListModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateList={handleCreateList}
      />

      <EditListModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onEditList={handleEditList}
        currentList={currentEditList}
      />
    </div>
  );
};

export default Lists;
