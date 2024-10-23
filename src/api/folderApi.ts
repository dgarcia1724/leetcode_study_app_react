import { Folder } from "../types/folder";

const BASE_URL = "http://localhost:8080/api";

export const fetchFolders = async (
  userId: string,
  sortBy: "editDate" | "name",
  searchPrefix: string = ""
): Promise<Folder[]> => {
  let url = `${BASE_URL}/users/${userId}/folders/sort/${sortBy}`;
  if (searchPrefix) {
    url = `${BASE_URL}/users/${userId}/folders/search?prefix=${encodeURIComponent(
      searchPrefix
    )}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const createFolder = async (
  userId: string,
  folderName: string
): Promise<Folder> => {
  const response = await fetch(`${BASE_URL}/users/${userId}/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: folderName }),
  });

  if (!response.ok) {
    throw new Error("Failed to create folder");
  }

  return response.json();
};

export const editFolder = async (
  userId: string,
  folderId: number,
  folderName: string
): Promise<Folder> => {
  const response = await fetch(`${BASE_URL}/users/${userId}/folders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: folderId, name: folderName }),
  });

  if (!response.ok) {
    throw new Error("Failed to edit folder");
  }

  return response.json();
};

export const deleteFolder = async (
  userId: string,
  folderId: number
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/users/${userId}/folders/${folderId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete folder");
  }
};

// Add other folder-related API calls here (e.g., deleteFolder)
