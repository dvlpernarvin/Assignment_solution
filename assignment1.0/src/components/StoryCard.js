"use client";

import Link from "next/link";
import { Card, CardContent, Typography } from "@mui/material";

export default function StoryCard({ story }) {
  if (!story) return null;

  return (
    <Card sx={{ mb: 2, p: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <a
            href={story.url || "http://codinggita.com/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            {story.title}
          </a>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {story.points} points • {story.author} • {new Date(story.created_at).toLocaleString()} |
          <Link href={`/story/${story.objectID}`}> View Details </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}