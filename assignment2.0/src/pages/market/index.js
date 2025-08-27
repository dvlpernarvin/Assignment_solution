import { fetchMF, getLatestNav, findNearestNavBefore, computeReturn, parseDate } from '../../lib/mf';
import { FundList } from '../../components/FundList';

const FIXED = [125354, 118955, 120166, 120586, 118778]; // example 5 fixed codes for snapshot

export async function getStaticProps(){
  const items = [];
  const latestDateMap = []; // to compute 1m return nearest
  for(const code of FIXED){
    try{
      const data = await fetchMF(code);
      const latest = getLatestNav(data);
      // compute 1m return: lookback ~30 days before latest.date
      let ret1m = null;
      if (latest){
        const target = new Date(latest.date);
        target.setDate(target.getDate() - 30);
        const past = findNearestNavBefore(data, target, 3);
        if (past) ret1m = computeReturn(latest, past);
      }
      items.push({ code, scheme_name: data.scheme_name, latest, ret1m });
    }catch(e){
      items.push({ code, scheme_name: `Code ${code}`, latest: null, ret1m: null });
    }
  }
  return { props: { items }, revalidate: 3600 };
}

export default function Market({ items }){
  return (
    <div>
      <h1>Market Snapshot (Hourly ISR)</h1>
      {/* Simple list: show 1m return in secondary text */}
      {items.map(it => (
        <div key={it.code} style={{marginBottom:12}}>
          <strong>{it.scheme_name}</strong><br/>
          {it.latest ? `${it.latest.nav} • ${it.latest.date.toLocaleDateString ? it.latest.date.toLocaleDateString() : it.latest.date}` : 'No NAV'}
          <div>1m return: {it.ret1m!=null ? `${it.ret1m.toFixed(2)}%` : '—'}</div>
          <div><a href={`/market/fund/${it.code}`}>Market View</a></div>
        </div>
      ))}
    </div>
  );
}
