import Link from 'next/link';
import { Card, CardContent, Typography, Button } from '@mui/material';

export function AppLinkCard({title, desc, href}){
  return (
    <Card sx={{ mb:2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" sx={{ mb:1 }}>{desc}</Typography>
        <Button component={Link} href={href} variant="contained" size="small">Open</Button>
      </CardContent>
    </Card>
  );
}