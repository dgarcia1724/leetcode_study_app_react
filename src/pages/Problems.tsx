import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useProblems } from "../hooks/useProblems";
// import NewProblemModal from "../components/problems/NewProblemModal";
// import EditProblemModal from "../components/problems/EditProblemModal";
// import ProblemList from "../components/problems/ProblemList";

import NewProblemModal from "../components/problems/NewProblemModal";
import EditProblemModal from "../components/problems/EditProblemModal";
import ProblemList from "../components/problems/ProblemList";

import { useToast } from "../components/Toast/ToastProvider";
import { Problem } from "../types/problem";

const Problems: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const location = useLocation();
  const listName = location.state?.listName || "List";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEditProblem, setCurrentEditProblem] = useState<Problem | null>(
    null
  );
  const { showToast } = useToast();

  const {
    problemsQuery,
    createProblemMutation,
    updateProblemMutation,
    deleteProblemMutation,
  } = useProblems(Number(listId));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openEditModal = (problem: Problem) => {
    setCurrentEditProblem(problem);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setCurrentEditProblem(null);
    setIsEditModalOpen(false);
  };

  const handleCreateProblem = async (problem: Omit<Problem, "id">) => {
    try {
      await createProblemMutation.mutateAsync(problem);
      closeModal();
      showToast("Problem created successfully!", "success");
    } catch (error) {
      console.error("Error creating problem:", error);
      showToast("Failed to create problem. Please try again.", "error");
    }
  };

  const handleUpdateProblem = async (
    problemId: number,
    problemDetails: Partial<Problem>
  ) => {
    try {
      await updateProblemMutation.mutateAsync({ problemId, problemDetails });
      closeEditModal();
      showToast("Problem updated successfully!", "success");
    } catch (error) {
      console.error("Error updating problem:", error);
      showToast("Failed to update problem. Please try again.", "error");
    }
  };

  const handleDeleteProblem = async (problemId: number) => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      try {
        await deleteProblemMutation.mutateAsync(problemId);
        showToast("Problem deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting problem:", error);
        showToast("Failed to delete problem. Please try again.", "error");
      }
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-16">
      {/* Header */}
      <header className="bg-gray-100 dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {listName} - Problems
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {/* New Problem button */}
            <div className="mb-6">
              <button
                onClick={openModal}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                New Problem
              </button>
            </div>

            {/* Problem list */}
            {problemsQuery.isLoading && (
              <p className="text-gray-700 dark:text-gray-300">
                Loading problems...
              </p>
            )}
            {problemsQuery.isError && (
              <p className="text-red-600 dark:text-red-400">
                Error loading problems
              </p>
            )}
            {problemsQuery.data && (
              <ProblemList
                problems={problemsQuery.data}
                onEditProblem={openEditModal}
                onDeleteProblem={handleDeleteProblem}
              />
            )}
          </div>
        </div>
      </main>

      <NewProblemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateProblem={handleCreateProblem}
      />

      <EditProblemModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onEditProblem={handleUpdateProblem}
        currentProblem={currentEditProblem}
      />
    </div>
  );
};

export default Problems;
