import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { formatDateISO } from '../lib/mf';

export function FundDetail({scheme, latest, navs}){
  // navs: array of {date:Date, nav:number}
  return (
    <div>
      <Typography variant="h5">{scheme}</Typography>
      <Typography variant="body2" color="text.secondary">{latest ? `${latest.nav} • ${formatDateISO(latest.date)}` : 'No NAV'}</Typography>

      <Typography variant="h6" sx={{ mt:2 }}>Recent NAVs</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>NAV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {navs.map((n, idx) => (
            <TableRow key={idx}>
              <TableCell>{formatDateISO(n.date)}</TableCell>
              <TableCell>{n.nav}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}