import { Container, Typography, List, ListItem } from "@mui/material";

export const dynamic = "force-dynamic"; // SSR

async function getStory(id) {
  try {
    const res = await fetch(`https://hn.algolia.com/api/v1/items/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    return null;
  }
}

export default async function StoryPage({ params }) {
  const story = await getStory(params.id);

  if (!story) {
    return (
      <Container sx={{ p: 2 }}>
        <Typography variant="h6" color="error">
          Story not found or failed to load.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        <a
          href={story.url || "http://codinggita.com/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          {story.title}
        </a>
      </Typography>

      <Typography variant="body2" gutterBottom>
        {story.points} points • {story.author} • {new Date(story.created_at).toLocaleString()}
      </Typography>

      <Typography variant="h6" gutterBottom>Comments</Typography>
      <List>
        {story.children.slice(0, 3).map((c) => (
          <ListItem key={c.id}>{c.text?.replace(/<[^>]+>/g, "")}</ListItem>
        ))}
      </List>
    </Container>
  );
}