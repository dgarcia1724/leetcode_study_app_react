import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useProblems } from "../hooks/useProblems";
import { Problem } from "../types/problem";

const Problems: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();
  const location = useLocation();
  const listName = location.state?.listName || "List";

  const {
    problemsQuery,
    createProblemMutation,
    updateProblemMutation,
    deleteProblemMutation,
  } = useProblems(Number(listId));

  const handleCreateProblem = async (problem: Omit<Problem, "id">) => {
    try {
      await createProblemMutation.mutateAsync(problem);
      // You can add a success message here
    } catch (error) {
      console.error("Error creating problem:", error);
      // You can add an error message here
    }
  };

  const handleUpdateProblem = async (
    problemId: number,
    problemDetails: Partial<Problem>
  ) => {
    try {
      await updateProblemMutation.mutateAsync({ problemId, problemDetails });
      // You can add a success message here
    } catch (error) {
      console.error("Error updating problem:", error);
      // You can add an error message here
    }
  };

  const handleDeleteProblem = async (problemId: number) => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      try {
        await deleteProblemMutation.mutateAsync(problemId);
        // You can add a success message here
      } catch (error) {
        console.error("Error deleting problem:", error);
        // You can add an error message here
      }
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-16">
      <header className="bg-gray-100 dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {listName} - Problems
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
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
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {problemsQuery.data.map((problem) => (
                  <li key={problem.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {problem.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {problem.description}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleUpdateProblem(problem.id, {
                              /* update details */
                            })
                          }
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProblem(problem.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Problems;
