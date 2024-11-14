import { List } from "../types/list";

const BASE_URL = "http://localhost:8080/api";

export const fetchLists = async (
  folderId: number,
  sortBy: "editDate" | "name" = "editDate",
  searchPrefix: string = ""
): Promise<List[]> => {
  let url = `${BASE_URL}/folders/${folderId}/lists`;

  if (searchPrefix) {
    url += `/search?prefix=${encodeURIComponent(searchPrefix)}`;
  } else {
    url += `/sort/${sortBy}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const createList = async (
  folderId: number,
  listName: string
): Promise<List> => {
  const response = await fetch(`${BASE_URL}/folders/${folderId}/lists`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: listName }),
  });

  if (!response.ok) {
    throw new Error("Failed to create list");
  }

  return response.json();
};

export const getListById = async (
  folderId: number,
  listId: number
): Promise<List> => {
  const response = await fetch(
    `${BASE_URL}/folders/${folderId}/lists/${listId}`
  );

  if (!response.ok) {
    throw new Error("Failed to get list");
  }

  return response.json();
};

export const updateList = async (
  folderId: number,
  listId: number,
  listDetails: Partial<List>
): Promise<List> => {
  const response = await fetch(
    `${BASE_URL}/folders/${folderId}/lists/${listId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(listDetails),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update list");
  }

  return response.json();
};

export const deleteList = async (
  folderId: number,
  listId: number
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/folders/${folderId}/lists/${listId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete list");
  }
};
