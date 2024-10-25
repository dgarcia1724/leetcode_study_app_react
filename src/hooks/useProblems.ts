import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProblems,
  createProblem,
  updateProblem,
  deleteProblem,
} from "../api/problemApi";
import { Problem } from "../types/problem";

export const useProblems = (listId: number) => {
  const queryClient = useQueryClient();

  const problemsQuery = useQuery<Problem[], Error>({
    queryKey: ["problems", listId],
    queryFn: () => fetchProblems(listId),
    enabled: !!listId,
  });

  const createProblemMutation = useMutation({
    mutationFn: (problem: Omit<Problem, "id">) =>
      createProblem(listId, problem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems", listId] });
    },
  });

  const updateProblemMutation = useMutation({
    mutationFn: ({
      problemId,
      problemDetails,
    }: {
      problemId: number;
      problemDetails: Partial<Problem>;
    }) => updateProblem(problemId, problemDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems", listId] });
    },
  });

  const deleteProblemMutation = useMutation({
    mutationFn: (problemId: number) => deleteProblem(problemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems", listId] });
    },
  });

  return {
    problemsQuery,
    createProblemMutation,
    updateProblemMutation,
    deleteProblemMutation,
  };
};
