import { Typography } from '@mui/material';
export function EmptyState({message='No data'}){
  return <Typography color="text.secondary">{message}</Typography>;
}
