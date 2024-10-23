import { Problem } from "../types/problem";

const BASE_URL = "http://localhost:8080/api";

export const fetchProblems = async (listId: number): Promise<Problem[]> => {
  const response = await fetch(`${BASE_URL}/problems/list/${listId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getProblemById = async (problemId: number): Promise<Problem> => {
  const response = await fetch(`${BASE_URL}/problems/${problemId}`);
  if (!response.ok) {
    throw new Error("Failed to get problem");
  }
  return response.json();
};

export const createProblem = async (
  listId: number,
  problem: Omit<Problem, "id">
): Promise<Problem> => {
  const response = await fetch(`${BASE_URL}/problems/list/${listId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(problem),
  });

  if (!response.ok) {
    throw new Error("Failed to create problem");
  }

  return response.json();
};

export const updateProblem = async (
  problemId: number,
  problemDetails: Partial<Problem>
): Promise<Problem> => {
  const response = await fetch(`${BASE_URL}/problems/${problemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(problemDetails),
  });

  if (!response.ok) {
    throw new Error("Failed to update problem");
  }

  return response.json();
};

export const deleteProblem = async (problemId: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/problems/${problemId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete problem");
  }
};
