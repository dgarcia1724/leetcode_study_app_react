import { Folder } from "../types/folder";

export const fetchFolders = async (): Promise<Folder[]> => {
  const response = await fetch(
    "http://localhost:8080/api/users/user1/folders/sort/editDate"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
