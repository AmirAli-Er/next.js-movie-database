"use client";

import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

type MoviePaginationProps = {
  searchTerm: string;
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  searchTerm,
  currentPage,
  totalPages,
}: MoviePaginationProps) {
  const router = useRouter();

  function goToPage(page: number) {
    const params = new URLSearchParams();

    params.set("name", searchTerm);
    params.set("page", String(page));

    router.push(`/movies?${params.toString()}`);
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mt: 4 }}
    >
        <Button
        variant="outlined"
        disabled={currentPage <= 1}
        onClick={() => goToPage(1)}
      >
        First Page
      </Button>
      <Button
        variant="outlined"
        disabled={currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </Button>

      <Button
        variant="contained"
        disabled={currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </Button>
    </Stack>
  );
}