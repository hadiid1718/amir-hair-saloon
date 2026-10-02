import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for browsers / contexts where the async clipboard API is blocked.
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    document.body.removeChild(area);
    return ok;
  }
}

/** A read-only label/value row with a copy button (account number, IBAN). */
export function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleCopy = async () => {
    if (!(await copyText(value))) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex items-center justify-between gap-3 pt-[11px] text-[12px] max-mobile:flex-wrap">
      <span className="text-muted">{label}</span>
      <div className="flex items-center gap-2">
        <strong className="text-[12px] tracking-[.02em] max-mobile:break-all">{value}</strong>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-1 text-[12px] font-bold hover:bg-[#f5f5f3]"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check size={9} /> : <Copy size={9} />}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  );
}
