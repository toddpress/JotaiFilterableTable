import { atom } from "jotai";
import { loadable } from "jotai/utils";
import { Plant } from "./types";
import { toSpaceCase, capitalizeFirstLetter } from "./util";

const API_URL =
  "https://raw.githubusercontent.com/toddpress/playData/344e85f56c5b086a1e32b470d981dba71a3b83f9/plants.json";

export const searchTextAtom = atom("");
// Create a basic atom for fetching plant data
export const plantsAtom = atom(async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching plant data:", error);
    throw error;
  }
});

export const tableHeadersMapAtom = atom(async (get) => {
  const data = await get(plantsAtom);
  const firstRow = data[0] ?? {};
  const headers = Object.keys(firstRow);

  return headers.reduce((acc, header: string) => {
    acc[header] = toSpaceCase(header)
      .split(" ")
      .map(capitalizeFirstLetter)
      .join(" ");
    return acc;
  }, {} as Record<string, any>);
});

export const searchResultsAtom = atom((get) => {
  const plants = get(plantsAtom);
  const searchText = get(searchTextAtom);
  return plants.filter((plant: Plant) => {
    const plantString = JSON.stringify(Object.values(plant));
    return plantString.toLowerCase().includes(searchText.toLowerCase());
  });
});
