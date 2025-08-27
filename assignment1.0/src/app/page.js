import Link from "next/link";
import { Container, Typography, Button, Box } from "@mui/material";
import SearchWidget from "../components/SearchWidget";
import StoryCard from "../components/StoryCard";

export const dynamic = "force-static"; // SSG

export default function Home() {
  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Tech News Portal
      </Typography>

      <Typography variant="body1" gutterBottom>
        <b>CSR:</b> Renders in browser after fetching data on client side.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>SSR:</b> Page is rendered on server for every request.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>SSG:</b> Page is pre-rendered at build time.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <b>ISR:</b> Like SSG, but regenerates after a set interval.
      </Typography>

      <Box sx={{ my: 2 }}>
        <Button variant="contained" component={Link} href="/top-news" sx={{ mr: 2 }}>
          Top News
        </Button>
        <Button variant="outlined" component={Link} href="/story/38600909">
          Sample Story
        </Button>
      </Box>

      {/* CSR Search Widget */}
      <SearchWidget />
      <StoryCard />
    </Container>
  );
}