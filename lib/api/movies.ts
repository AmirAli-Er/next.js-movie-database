import { apiFetch } from "./client";
import type { Movie } from "../types/movie";

export async function getMovieById(
  imdbId: string
): Promise<Movie> {
  return apiFetch<Movie>("", {
    i: imdbId,
  });
}

export async function searchMovies(
  searchTerm: string,
  page = 1
): Promise<{
  Search?: Movie[];
  totalResults?: string;
  Response: "True" | "False";
}> {
  return apiFetch("", {
    s: searchTerm,
    page,
  });
}