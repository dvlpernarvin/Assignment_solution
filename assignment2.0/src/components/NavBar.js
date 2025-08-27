import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function NavBar(){
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap:2 }}>
        <Typography variant="h6">MF Dashboard</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={Link} href="/learn">Learn</Button>
          <Button color="inherit" component={Link} href="/learn/funds">Funds</Button>
          <Button color="inherit" component={Link} href="/learn/tools">Tools</Button>
          <Button color="inherit" component={Link} href="/market">Market</Button>
          <Button color="inherit" component={Link} href="/market/compare">Compare</Button>
          <Button color="inherit" component={Link} href="/market/about">About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}