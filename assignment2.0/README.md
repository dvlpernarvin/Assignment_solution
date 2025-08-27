# Assignment 2 — Dual Router Mutual Funds Dashboard

This project is a small Mutual Funds dashboard that demonstrates  
**Next.js App Router** and **Pages Router** working side by side.

---

## Routes

### App Router (`/app/learn/*`)
- `/learn/funds` → List of funds (with search + cards).
- `/learn/funds/[id]` → Single fund details page.
- `/learn/compare` → Compare multiple funds.

### Pages Router (`/pages/market/*`)
- `/market/trending` → Trending funds list.
- `/market/[id]` → Fund details (Pages router style).

---

## APIs Used

Base: `https://api.mfapi.in`  
- `GET /mf/:id` → Returns fund details and NAV history.  
- Helper functions in `lib/mf.js` handle:
  - Parsing dates
  - Getting latest NAV
  - Finding nearest NAV (±3 days)
  - Calculating returns

---

## Components

- `NavBar` → Global navigation between routes.  
- `AppLinkCard` → Quick navigation cards.  
- `FundSummaryCard` → Small fund summary.  
- `FundList` → List of all funds with search.  
- `FundDetail` → Single fund detail card.  
- `CompareTable` → Table comparing 2+ funds.  
- `SearchBar` → Fund search input.  
- `EmptyState` → Placeholder when no data.  
- `LoadingSkeleton` → Skeleton loader.  

---

## Rendering Patterns

- **App Router** → Uses SSG + CSR search.  
- **Pages Router** → Classic SSR-style data fetching.  
- Shared code in `lib/mf.js`.

---

## Checklist

- ✅ Both routers exist in one project.  
- ✅ Fetches live MF data via API.  
- ✅ Handles missing NAVs using ±3 day nearest NAV search.  
- ✅ Loading skeleton + empty states included.  
- ✅ Simple MUI-based mobile-first UI.  

---

## Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
