import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLists, createList, updateList, deleteList } from "../api/listApi";
import { List } from "../types/list";

export const useLists = (
  folderId: number,
  filterOption: "a-z" | "recent",
  searchTerm: string
) => {
  const queryClient = useQueryClient();

  const listsQuery = useQuery<List[], Error>({
    queryKey: ["lists", folderId, filterOption, searchTerm],
    queryFn: () =>
      fetchLists(
        folderId,
        filterOption === "a-z" ? "name" : "editDate",
        searchTerm
      ),
    enabled: !!folderId,
  });

  const createListMutation = useMutation({
    mutationFn: (listName: string) => createList(folderId, listName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", folderId] });
    },
  });

  const updateListMutation = useMutation({
    mutationFn: ({
      listId,
      listDetails,
    }: {
      listId: number;
      listDetails: Partial<List>;
    }) => updateList(folderId, listId, listDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", folderId] });
    },
  });

  const deleteListMutation = useMutation({
    mutationFn: (listId: number) => deleteList(folderId, listId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists", folderId] });
    },
  });

  return {
    listsQuery,
    createListMutation,
    updateListMutation,
    deleteListMutation,
  };
};
