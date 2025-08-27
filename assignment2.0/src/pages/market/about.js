export async function getStaticProps(){
  return { props: {}, }
}
export default function MarketAbout(){
  return (
    <div>
      <h1>About — Dual Router MF Dashboard</h1>
      <p>This project demonstrates App Router under /learn/* (SSG/ISR/SSR/CSR) and Pages Router under /market/* (getStaticProps/getServerSideProps/CSR).</p>
      <p>Data source: MFAPI (https://api.mfapi.in). We only use the endpoints listed in the assignment.</p>
      <p>Rendering choices: /learn is for learning (App Router), /market is for production-like pages using Pages Router.</p>
    </div>
  );
}