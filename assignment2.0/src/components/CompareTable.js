import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { formatDateISO } from '../lib/mf';

export function CompareTable({items}){
  // items: [{code, scheme_name, latest, ret3m, ret6m}]
  return (
    <div>
      <Typography variant="h6">Comparison</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Metric</TableCell>
            {items.map(it => <TableCell key={it.code}>{it.code}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Scheme</TableCell>
            {items.map(it => <TableCell key={it.code}>{it.scheme_name}</TableCell>)}
          </TableRow>
          <TableRow>
            <TableCell>Latest NAV</TableCell>
            {items.map(it => <TableCell key={it.code}>{it.latest ? it.latest.nav : '—'}</TableCell>)}
          </TableRow>
          <TableRow>
            <TableCell>Latest Date</TableCell>
            {items.map(it => <TableCell key={it.code}>{it.latest ? formatDateISO(it.latest.date) : '—'}</TableCell>)}
          </TableRow>
          <TableRow>
            <TableCell>Approx 3m Return</TableCell>
            {items.map(it => <TableCell key={it.code}>{it.ret3m!=null ? `${it.ret3m.toFixed(2)}%` : '—'}</TableCell>)}
          </TableRow>
          <TableRow>
            <TableCell>Approx 6m Return</TableCell>
            {items.map(it => <TableCell key={it.code}>{it.ret6m!=null ? `${it.ret6m.toFixed(2)}%` : '—'}</TableCell>)}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}