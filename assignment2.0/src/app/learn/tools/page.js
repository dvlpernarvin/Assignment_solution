'use client'
import { useState } from 'react';
import { fetchMF, getLatestNav } from '../../../lib/mf';
import { SearchBar } from '../../../components/SearchBar';
import { FundSummaryCard } from '../../../components/FundSummaryCard';
import { EmptyState } from '../../../components/EmptyState';

export default function Tools(){
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(code){
    setLoading(true); setError(''); setResult(null);
    try{
      const data = await fetch(`/api/proxy/mf/${code}`).then(r=>r.json());
      // We'll create a small API route proxy in pages/api to avoid CORS in dev; but MFAPI is public.
      // If you prefer direct fetch, you can call fetchMF in browser but the helper above is server-side.
      if (data && data.data){
        const latest = getLatestNav(data);
        setResult({ code, scheme_name: data.scheme_name, latest });
      } else {
        setError('No data');
      }
    }catch(e){
      setError('Failed to fetch');
    }finally{ setLoading(false); }
  }

  return (
    <div>
      <h1>Tools — Quick Fetch (CSR)</h1>
      <SearchBar onSearch={handleSearch} placeholder="Enter scheme code" />
      {loading && <div>Loading…</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      {result ? <FundSummaryCard code={result.code} scheme={result.scheme_name} latest={result.latest} /> : <EmptyState message="Enter a scheme code to fetch" />}
    </div>
  );
}
