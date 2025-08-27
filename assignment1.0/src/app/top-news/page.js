import Link from "next/link";
import { Container, Typography, List, ListItem, ListItemText } from "@mui/material";

export const revalidate = 600; // ISR: re-generate every 10 min

async function getTopStories() {
  const res = await fetch(
    "https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=10"
  );
  return res.json();
}

export default async function TopNews() {
  const data = await getTopStories();

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Top 10 News
      </Typography>

      <List>
        {data.hits.map((story) => (
          <ListItem key={story.objectID} alignItems="flex-start">
            <ListItemText
              primary={
                <a
                  href={story.url || "http://codinggita.com/"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {story.title}
                </a>
              }
              secondary={
                <>
                  {story.points} points • {story.author} • {new Date(story.created_at).toLocaleString()} |
                  <Link href={`/story/${story.objectID}`}> View Details </Link>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}