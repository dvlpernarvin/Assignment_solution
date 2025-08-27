"use client";

import { useState } from "react";
import { TextField, Button, Typography, Box, List, ListItem } from "@mui/material";

export default function SearchWidget() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!query) return;
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=5`
      );
      const data = await res.json();
      if (data.hits.length === 0) setError("No results.");
      setResults(data.hits);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Search (CSR Widget)
      </Typography>

      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <TextField
          size="small"
          label="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {loading && <Typography>Searching…</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      <List>
        {results.map((story) => (
          <ListItem key={story.objectID}>{story.title}</ListItem>
        ))}
      </List>
    </Box>
  );
}