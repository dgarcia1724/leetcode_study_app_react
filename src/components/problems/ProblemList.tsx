import React from "react";
import { Problem } from "../../types/problem";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface ProblemListProps {
  problems: Problem[];
  onEditProblem: (problem: Problem) => void;
  onDeleteProblem: (problemId: number) => void;
}

const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  onEditProblem,
  onDeleteProblem,
}) => {
  const handleProblemClick = (url: string, e: React.MouseEvent) => {
    // Prevent the click event from propagating to parent elements
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const formatDateToPacificTime = (dateString: string) => {
    // Create a date object in UTC
    const date = new Date(dateString);

    // Convert to Pacific Time
    return date.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {problems.map((problem) => (
        <li
          key={problem.id}
          className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={(e) => handleProblemClick(problem.url, e)}
        >
          <div className="flex-grow">
            <div className="font-medium text-gray-900 dark:text-gray-100">
              {problem.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {formatDateToPacificTime(problem.editDate)}
            </div>
            <div className="mt-1">
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${problem.confidencePercentage}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  {problem.confidencePercentage.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditProblem(problem);
              }}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FiEdit2 />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteProblem(problem.id);
              }}
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <FiTrash2 />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProblemList;
