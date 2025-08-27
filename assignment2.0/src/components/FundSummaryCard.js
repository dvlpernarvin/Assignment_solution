import Link from 'next/link';
import { Card, CardContent, Typography } from '@mui/material';
import { formatDateISO } from '../lib/mf';

export function FundSummaryCard({scheme, code, latest}){
  // scheme: scheme_name string, latest: {nav, date}
  return (
    <Card sx={{ mb:2 }}>
      <CardContent>
        <Typography variant="subtitle1">{scheme}</Typography>
        <Typography variant="body2" color="text.secondary">
          {latest ? `${latest.nav} • ${formatDateISO(latest.date)}` : 'No NAV available'}
        </Typography>
        <Typography sx={{ mt:1 }}>
          <Link href={`/learn/fund/${code}`}>Learn View</Link> | <Link href={`/market/fund/${code}`}>Market View</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}