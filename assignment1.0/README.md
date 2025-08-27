# Assignment 1 — Tech News (Next.js + MUI)

This project is a simple Hacker News client built with Next.js (App Router) and Material UI.  
It demonstrates **SSG, ISR, SSR, and CSR** rendering patterns with a minimal mobile-first UI.

---

## Routes & Rendering

| Route         | Rendering                         | What it shows                                                                           |
| ------------- | --------------------------------- | --------------------------------------------------------------------------------------- |
| `/`           | **SSG** + small **CSR** widget    | Static intro + client-side search box (5 results)                                       |
| `/top-news`   | **ISR** (`revalidate: 600`)       | Top 10 Hacker News stories (title, points, author, time-ago)                           |
| `/story/[id]` | **SSR**                           | Single story’s details + up to 3 comments                                               |

---

## APIs Used

- `https://hn.algolia.com/api/v1/search?query=<q>&tags=story&hitsPerPage=5`
- `https://hn.algolia.com/api/v1/search?tags=story&hitsPerPage=10`
- `https://hn.algolia.com/api/v1/items/<id>`

---

## Features Checklist

- ✅ Home page is static, with CSR widget for searching stories.  
- ✅ Shows loading text (`Searching...`) and empty state (`No results.`).  
- ✅ Top news page lists exactly 10 stories (revalidates every 10 minutes).  
- ✅ Each story links to detail page (`/story/[id]`).  
- ✅ Story detail page shows title, metadata, and first 3 comments.  
- ✅ Fallback external link (`http://codinggita.com/`) if story URL is missing.  

---

## Tech Stack

- Next.js (App Router)  
- React  
- Material UI (MUI)  
