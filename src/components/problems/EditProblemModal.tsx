import React, { useState, useEffect } from "react";
import { Problem } from "../../types/problem";

interface EditProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditProblem: (
    problemId: number,
    problemDetails: Partial<Problem>
  ) => Promise<void>;
  currentProblem: Problem | null;
}

const EditProblemModal: React.FC<EditProblemModalProps> = ({
  isOpen,
  onClose,
  onEditProblem,
  currentProblem,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentProblem) {
      setTitle(currentProblem.title);
      setDescription(currentProblem.description || "");
    }
  }, [currentProblem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Problem title cannot be empty");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (currentProblem) {
        await onEditProblem(currentProblem.id, {
          title: title.trim(),
          description: description.trim(),
        });
        onClose();
      }
    } catch (err) {
      setError("Failed to edit problem. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Edit Problem
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter problem title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter problem description (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
            rows={3}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProblemModal;
