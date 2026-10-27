const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2025-09" → "Sep 2025"; "2026-10-26" → "26 Oct 2026". Pure string work: no Date during prerender. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  const month = m ? MONTHS[Number(m) - 1] : "";
  if (d) return `${Number(d)} ${month} ${y}`;
  return month ? `${month} ${y}` : y;
}

export function formatRange(start: string, end?: string) {
  return `${formatDate(start)} – ${end ? formatDate(end) : "Present"}`;
}

/** RFC 822 date for RSS, from an ISO yyyy-mm-dd string (Sakamoto's weekday; no Date object). */
export function rfc822(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const yy = m < 3 ? y - 1 : y;
  const dow = (yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) + t[m - 1] + d) % 7;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[dow]}, ${String(d).padStart(2, "0")} ${MONTHS[m - 1]} ${y} 00:00:00 +0545`;
}
