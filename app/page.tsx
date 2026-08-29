import { Box, Typography } from "@mui/material";
import SearchBox from "./components/header/SearchBox";

export default function Home() {
  return (
    <div>
      <SearchBox/>
      <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{
          padding: 3,
          backgroundColor: "grey.200",
          borderRadius: 1}}>
        <Typography color="inherit" variant="h3" gutterBottom >Try Searching SpiderMan ! </Typography>
      </Box>
    </Box>
    </div>
    
  );
}
