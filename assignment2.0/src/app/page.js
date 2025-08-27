import { AppLinkCard } from '../components/AppLinkCard';

export default function LearnHome(){
  return (
    <div>
      <h1>Learn — MF Dashboard</h1>
      <p>This area uses the App Router. Static overview (SSG).</p>
      <AppLinkCard title="Funds (ISR daily)" desc="View curated funds (revalidated daily)" href="/learn/funds" />
      <AppLinkCard title="Tool: Quick Fetch (CSR)" desc="Fetch a scheme by code from client" href="/learn/tools" />
      <AppLinkCard title="Sample Fund (SSR)" desc="Open a fund detail (server-rendered)" href="/learn/fund/122639" />
      <AppLinkCard title="Market (Pages Router)" desc="See market snapshot and compare routes" href="/market" />
    </div>
  );
}