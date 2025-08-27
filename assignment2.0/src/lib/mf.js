export async function fetchMF(code) {
  // code: string or number
  const url = `https://api.mfapi.in/mf/${code}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`MFAPI fetch failed: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data; // {scheme_code, scheme_name, data: [{date, nav}, ...]}
}

export function parseDate(d) {
  // Input format from MFAPI is "DD-MM-YYYY" usually. Return Date object.
  // Also accept ISO.
  if (!d) return null;
  if (d.includes('-')) {
    const parts = d.split('-');
    // MFAPI uses DD-MM-YYYY
    if (parts[0].length === 2 && parts[2].length === 4) {
      const [dd, mm, yyyy] = parts;
      return new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
    }
  }
  const parsed = new Date(d);
  if (!isNaN(parsed)) return parsed;
  return null;
}

export function getLatestNav(obj) {
  // Ensure data[] sorted desc by date, pick first
  if (!obj || !Array.isArray(obj.data)) return null;
  const arr = obj.data.map(item => ({ date: parseDate(item.date), nav: parseFloat(item.nav) }));
  const sorted = arr.filter(a => a.date && !isNaN(a.nav)).sort((a,b)=> b.date - a.date);
  return sorted[0] || null;
}

export function findNearestNavBefore(obj, targetDate, windowDays=3) {
  // targetDate: Date
  if (!obj || !Array.isArray(obj.data) || !targetDate) return null;
  const arr = obj.data.map(item => ({ date: parseDate(item.date), nav: parseFloat(item.nav) }))
    .filter(a=>a.date && !isNaN(a.nav));
  // find entries within ±windowDays
  const lower = new Date(targetDate); lower.setDate(lower.getDate() - windowDays);
  const upper = new Date(targetDate); upper.setDate(upper.getDate() + windowDays);
  const candidates = arr.filter(a => a.date >= lower && a.date <= upper);
  if (candidates.length === 0) return null;
  // choose the one closest to targetDate
  candidates.sort((x,y)=> Math.abs(x.date - targetDate) - Math.abs(y.date - targetDate));
  return candidates[0];
}

export function computeReturn(latestNavObj, pastNavObj) {
  if (!latestNavObj || !pastNavObj) return null;
  const latest = latestNavObj.nav;
  const past = pastNavObj.nav;
  if (!past || past === 0) return null;
  return ((latest - past) / past) * 100;
}

export function formatDateISO(d) {
  if (!d) return '';
  const dt = (d instanceof Date) ? d : parseDate(d);
  if (!dt) return '';
  const yyyy = dt.getFullYear();
  const mm = String(dt.getMonth()+1).padStart(2,'0');
  const dd = String(dt.getDate()).padStart(2,'0');
  return `${dd}-${mm}-${yyyy}`; // consistent DD-MM-YYYY display
}