import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFolders, createFolder } from "../api/folderApi";
import { Folder } from "../types/folder";

export const useFolders = (
  userId: string,
  filterOption: "a-z" | "recent",
  searchTerm: string
) => {
  const queryClient = useQueryClient();

  const foldersQuery = useQuery<Folder[], Error>({
    queryKey: ["folders", userId, filterOption, searchTerm],
    queryFn: () =>
      fetchFolders(
        userId,
        filterOption === "a-z" ? "name" : "editDate",
        searchTerm
      ),
    enabled: !!userId,
  });

  const createFolderMutation = useMutation({
    mutationFn: (folderName: string) => createFolder(userId, folderName),
    onSuccess: () => {
      queryClient.invalidateQueries(["folders", userId]);
    },
  });

  return {
    foldersQuery,
    createFolderMutation,
  };
};
