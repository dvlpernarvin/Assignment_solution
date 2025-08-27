import { fetchMF, getLatestNav, parseDate } from '../../../../lib/mf';
import { FundDetail } from '../../../../components/FundDetail';
import { EmptyState } from '../../../../components/EmptyState';

export const dynamic = 'force-dynamic';

export default async function LearnFund({ params }){
  const { code } = params;
  try{
    const data = await fetchMF(code);
    // prepare last 30 entries sorted desc
    const navs = (data.data || []).map(d => ({ date: parseDate(d.date), nav: parseFloat(d.nav) }))
      .filter(x => x.date && !isNaN(x.nav))
      .sort((a,b)=> b.date - a.date)
      .slice(0,30);
    const latest = navs[0] || null;
    return (
      <div>
        <FundDetail scheme={data.scheme_name} latest={latest} navs={navs} />
      </div>
    );
  }catch(e){
    return <EmptyState message={`Could not load fund ${code}. Please check the code.`} />;
  }
}