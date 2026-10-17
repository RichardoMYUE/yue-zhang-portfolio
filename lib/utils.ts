import type { Period } from "@/data/types";

/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** "09/2023 – 12/2024", "2025 – 2026", "07/2025", "10/2026 – Present". */
export function formatPeriod(period: Period): string {
  if (period.start === period.end) return period.start;
  return `${period.start} – ${period.end}`;
}

/** "2022–2026" from a month-based period. */
export function yearRange(period: Period): string {
  const start = period.start.slice(-4);
  const end = period.end === "Present" ? "Present" : period.end.slice(-4);
  return start === end ? start : `${start}–${end}`;
}

/** "17 October 2026" from an ISO date, formatted identically on server and client. */
export function formatDate(iso: string): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${months[month - 1]} ${year}`;
}
