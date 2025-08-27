import { FundSummaryCard } from './FundSummaryCard';
import { Box } from '@mui/material';

export function FundList({items}){
  // items: [{code, scheme_name, latest}]
  return (
    <Box>
      {items.map(item => (
        <FundSummaryCard key={item.code} code={item.code} scheme={item.scheme_name} latest={item.latest} />
      ))}
    </Box>
  );
}