import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchFolders,
  createFolder,
  editFolder,
  deleteFolder,
} from "../api/folderApi";
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

  const editFolderMutation = useMutation({
    mutationFn: ({
      folderId,
      folderName,
    }: {
      folderId: number;
      folderName: string;
    }) => editFolder(userId, folderId, folderName),
    onSuccess: () => {
      queryClient.invalidateQueries(["folders", userId]);
    },
  });

  const deleteFolderMutation = useMutation({
    mutationFn: (folderId: number) => deleteFolder(userId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["folders", userId]);
    },
  });

  return {
    foldersQuery,
    createFolderMutation,
    editFolderMutation,
    deleteFolderMutation,
  };
};
