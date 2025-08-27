'use client'
import { useState } from 'react';
import { SearchBar } from '../../components/SearchBar';
import { CompareTable } from '../../components/CompareTable';

export default function MarketCompare(){
  const [codes, setCodes] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  async function handleAdd(code){
    if (codes.includes(code)) return;
    if (codes.length>=3) { setError('Max 3 codes'); return; }
    setError('');
    setCodes(prev=>[...prev, code]);
    try{
      const data = await fetch(`/api/proxy/mf/${code}`).then(r=>r.json());
      // compute returns locally: latest, ret3m, ret6m
      const latest = data && data.data ? getLatestFromRaw(data) : null;
      const ret3m = computeFromRaw(data, 3);
      const ret6m = computeFromRaw(data, 6);
      setItems(prev=>[...prev, { code, scheme_name: data.scheme_name, latest, ret3m, ret6m }]);
    }catch(e){ setError('Fetch failed'); }
  }

  // helper inline because lib functions aren't client-safe here; implement minimal versions
  function parseDateStr(d){ const parts = d.split('-'); return new Date(`${parts[2]}-${parts[1]}-${parts[0]}T00:00:00`); }
  function getLatestFromRaw(data){ if(!data||!data.data) return null; const arr = data.data.map(x=>({date:parseDateStr(x.date), nav:parseFloat(x.nav)})).sort((a,b)=>b.date-a.date); return arr[0]; }
  function findNearest(data, targetDays){ if(!data||!data.data) return null; const arr = data.data.map(x=>({date:parseDateStr(x.date), nav:parseFloat(x.nav)})).sort((a,b)=>b.date-a.date);
    const latest = getLatestFromRaw(data); if(!latest) return null; const target = new Date(latest.date); target.setMonth(target.getMonth()-targetDays);
    const window = 3*24*3600*1000; let best=null; let bestDiff=Infinity;
    for(const a of arr){ const diff = Math.abs(a.date - target); if(diff <= window && diff < bestDiff){ best = a; bestDiff = diff; }} return best;
  }
  function computeFromRaw(data, months){ const latest=getLatestFromRaw(data); if(!latest) return null; const past = findNearest(data, months); if(!past) return null; return ((latest.nav - past.nav)/past.nav)*100; }

  return (
    <div>
      <h1>Compare Funds (CSR)</h1>
      <SearchBar onSearch={handleAdd} placeholder="Add scheme code (max 3)" />
      {error && <div style={{color:'red'}}>{error}</div>}
      <CompareTable items={items} />
    </div>
  );
}