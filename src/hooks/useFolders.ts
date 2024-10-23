import { useQuery } from "@tanstack/react-query";
import { fetchFolders } from "../api/folders";
import { Folder } from "../types/folder";

export const useFolders = () => {
  return useQuery<Folder[], Error>({
    queryKey: ["folders"],
    queryFn: fetchFolders,
  });
};
