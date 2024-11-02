import React, { useState } from "react";
import { Problem } from "../../types/problem";

interface NewProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProblem: (problem: Omit<Problem, "id">) => Promise<void>;
}

const NewProblemModal: React.FC<NewProblemModalProps> = ({
  isOpen,
  onClose,
  onCreateProblem,
}) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [confidencePercentage, setConfidencePercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Problem name cannot be empty");
      return;
    }
    if (!url.trim()) {
      setError("URL cannot be empty");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await onCreateProblem({
        name: name.trim(),
        url: url.trim(),
        confidencePercentage,
        editDate: new Date().toISOString(),
      });
      setName("");
      setUrl("");
      setConfidencePercentage(0);
      onClose();
    } catch (err) {
      setError(`Failed to create problem: ${(err as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          Create New Problem
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter problem name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter problem URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
          />
          <div className="mb-4">
            <label
              htmlFor="confidencePercentage"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confidence Percentage: {confidencePercentage}%
            </label>
            <input
              type="range"
              id="confidencePercentage"
              min="0"
              max="100"
              value={confidencePercentage}
              onChange={(e) => setConfidencePercentage(Number(e.target.value))}
              className="w-full"
            />
          </div>
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
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProblemModal;
