import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export function SearchBar({placeholder='Enter scheme code', onSearch}){
  const [value, setValue] = useState('');
  return (
    <Box sx={{ display:'flex', gap:1, mb:2 }}>
      <TextField size="small" label={placeholder} value={value} onChange={e=>setValue(e.target.value)} />
      <Button variant="contained" onClick={()=>{ if(value) onSearch(value.trim()); }}>Fetch</Button>
    </Box>
  );
}