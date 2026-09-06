export function trackTool(event: 'tool_select' | 'tool_complete' | 'tool_copy' | 'tool_audit', toolId: string) {
  if (typeof window === 'undefined' || !/^[a-z0-9-]{1,40}$/.test(toolId)) return;
  try {
    if (localStorage.getItem('cookie-consent') !== 'accepted') return;
    const browser = window as unknown as { gtag?: (...args: unknown[]) => void };
    browser.gtag?.('event', event, { tool_id: toolId, tool_location: 'resources_fr' });
  } catch { /* Tools remain usable when storage or analytics are unavailable. */ }
}