import { fetchMF, getLatestNav, findNearestNavBefore, computeReturn, parseDate } from '../../../lib/mf';
import { FundDetail } from '../../../components/FundDetail';
import { EmptyState } from '../../../components/EmptyState';

export async function getServerSideProps(context){
  const { code } = context.params;
  try{
    const data = await fetchMF(code);
    const latest = getLatestNav(data);
    const navs = (data.data || []).map(d=>({date: parseDate(d.date), nav: parseFloat(d.nav)})).filter(x=>x.date && !isNaN(x.nav)).sort((a,b)=>b.date-a.date);
    // compute 1m and 3m
    let ret1m=null, ret3m=null, note='';
    if (latest){
      const targ1 = new Date(latest.date); targ1.setDate(targ1.getDate()-30);
      const past1 = findNearestNavBefore(data, targ1, 3);
      if (past1) ret1m = computeReturn(latest, past1);
      else note = 'Using nearest available NAV within ±3 days not found for 1m.';

      const targ3 = new Date(latest.date); targ3.setMonth(targ3.getMonth()-3);
      const past3 = findNearestNavBefore(data, targ3, 3);
      if (past3) ret3m = computeReturn(latest, past3);
      else note += ' 3m not found.';
    }

    return { props: { scheme_name: data.scheme_name, latest, navs: navs.slice(0, 60), ret1m, ret3m, note } };
  }catch(e){
    return { props: { error: true, message: 'Invalid code or fetch failed.' } };
  }
}

export default function MarketFund({ error, message, scheme_name, latest, navs, ret1m, ret3m, note }){
  if (error) return <EmptyState message={message} />;
  return (
    <div>
      <h1>{scheme_name}</h1>
      <div>{latest ? `${latest.nav} • ${latest.date.toLocaleDateString ? latest.date.toLocaleDateString() : latest.date}` : 'No NAV'}</div>
      <div>1m: {ret1m!=null ? `${ret1m.toFixed(2)}%` : '—'}</div>
      <div>3m: {ret3m!=null ? `${ret3m.toFixed(2)}%` : '—'}</div>
      {note && <div style={{color:'gray'}}>{note}</div>}
      <FundDetail scheme={scheme_name} latest={latest} navs={navs} />
    </div>
  );
}
