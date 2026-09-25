import { useEffect, useState } from "react";

interface DropCodeProps {
  code: string;
  /** Short human summary, e.g. "1 gun + 3 knives, Tier 2". */
  summary: string;
}

/**
 * Shows a roll's drop code with a copy button and the in-game command that
 * redeems it. Only the Lead FM Discord account can run the command server-side.
 */
export const DropCode = ({ code, summary }: DropCodeProps): JSX.Element => {
  const [copied, setCopied] = useState<"code" | "command" | null>(null);
  const command = `/factiondrop [playerId] ${code}`;

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async (text: string, what: "code" | "command") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
    } catch {
      // Clipboard can be blocked (no permission, insecure context); the text is still visible to select.
    }
  };

  const btn =
    "rounded-md border border-[#1a1424] bg-[#0d0913] px-3 py-1.5 [font-family:'Inter',Helvetica] text-xs font-bold text-[#f7f4fb] transition-colors hover:border-[#c3b2df]/40";

  return (
    <div className="mt-4 rounded-xl border border-[#c3b2df]/25 bg-[#0b0711] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="[font-family:'Inter',Helvetica] text-[11px] font-bold uppercase tracking-[1.2px] text-[#c3b2df]">
            Drop code
          </p>
          <p className="pt-0.5 [font-family:'Inter',Helvetica] text-xs text-[#a296b6]">
            {summary}. This code is for Lead FM.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" className={btn} onClick={() => copy(code, "code")}>
            {copied === "code" ? "Copied ✓" : "Copy code"}
          </button>
          <button type="button" className={btn} onClick={() => copy(command, "command")}>
            {copied === "command" ? "Copied ✓" : "Copy command"}
          </button>
        </div>
      </div>
      <code className="mt-3 block select-all break-all rounded-md border border-[#1a1424] bg-[#060507] px-3 py-2 font-mono text-[12px] leading-[20px] text-[#e2dbef]">
        {command}
      </code>
    </div>
  );
};
