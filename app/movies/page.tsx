import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { searchMovies } from "@/lib/api/movies";
import SearchBox from "../components/header/SearchBox";
import Pagination from "../components/movies/Pagination";

type MoviesPageProps = {
  searchParams: Promise<{
    name?: string;
    page?: string;
  }>;
};

export default async function MoviesPage({
  searchParams,
}: MoviesPageProps) {
  const params = await searchParams;
  const name = params.name ?? "";
  const page = Number(params.page ?? "1");
    const currentPage = Math.max(
    1,
    Number(params.page ?? "1")
  );
  if (!name) {
    return (
        <>
        <SearchBox/>
        <Box sx={{ p: 4 }}>

        <Typography sx={{ mt: 4 }}>
          Search for a movie to see results.
        </Typography>
      </Box>
      </>
      
    );
  }

  const data = await searchMovies(name, page);
  const movies = data.Search ?? [];
  const totalResults = Number(data.totalResults ?? "0");
  const totalPages = Math.ceil(totalResults / 10);

  return (
    <>
    <SearchBox/>
    <Box sx={{ p: 4 }}>

      <Typography
        variant="h4"
        sx={{ mt: 5, mb: 3 }}
      >
        Results for `{name}`
      </Typography>

      {movies.length === 0 ? (
        <Typography>
          No movies found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gap: 3,
          }}
        >
          {movies.map((movie) => (
            <Card key={movie.imdbID}>
              <CardMedia
                component="img"
                image={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "/placeholder-movie.jpg"
                }
                alt={movie.Title}
                sx={{
                  aspectRatio: "2 / 3",
                  objectFit: "cover",
                }}
              />

              <CardContent>
                <Typography
                  variant="h6"
                  noWrap
                >
                  {movie.Title}
                </Typography>

                <Typography color="text.secondary">
                  {movie.Year}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Pagination searchTerm={name}
            currentPage={currentPage}
            totalPages={totalPages}/>
        </Box>
      )}
    </Box>
    </>
  );
}