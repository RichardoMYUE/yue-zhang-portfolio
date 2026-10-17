/** Small dependency-graph mark used in the wordmark (mirrors app/icon.svg). */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M12 6.5 6.5 16.5M12 6.5l5.5 10M7.5 18h9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="12" cy="5.5" r="2.6" fill="currentColor" />
      <circle cx="5.5" cy="18" r="2.6" fill="var(--paper)" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18.5" cy="18" r="2.6" fill="var(--paper)" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
