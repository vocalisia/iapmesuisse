export default function ToolIcon({ kind }: { kind: string }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {kind === 'calculator' ? <><rect x="5" y="3" width="14" height="18" rx="3" /><path d="M9 7h6M9 12h.01M15 12h.01M9 16h.01M15 16h.01" /></> : kind === 'diagnostic' ? <><rect x="8" y="8" width="8" height="8" rx="2" /><path d="M12 3v5M12 16v5M3 12h5M16 12h5M5 5l3 3M16 16l3 3M5 19l3-3M16 8l3-3" /></> : kind === 'triage' ? <><path d="M5 4v11a4 4 0 0 0 4 4h10M5 8h14M16 5l3 3-3 3M16 16l3 3-3 3" /></> : <><path d="m15 4 5 5M4 20l5-1L20 8a2 2 0 0 0-4-4L5 15l-1 5Z" /><path d="M13 20h7" /></>}
  </svg>;
}
