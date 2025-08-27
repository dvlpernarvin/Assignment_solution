import { fetchMF, getLatestNav } from '../../../lib/mf';
import { FundList } from '../../../components/FundList';

export const revalidate = 86400; // once per day

const CURATED = [122639,120492,125497,118825,125354,118955,120166,120586,118778,130503];

async function getCurated(){
  const results = [];
  for (const code of CURATED){
    try{
      const data = await fetchMF(code);
      const latest = getLatestNav(data);
      results.push({ code, scheme_name: data.scheme_name, latest });
    }catch(e){
      results.push({ code, scheme_name: `Code ${code}`, latest: null });
    }
  }
  return results;
}

export default async function LearnFunds(){
  const items = await getCurated();
  return (
    <div>
      <h1>Curated Funds (Daily ISR)</h1>
      <FundList items={items} />
    </div>
  );
}