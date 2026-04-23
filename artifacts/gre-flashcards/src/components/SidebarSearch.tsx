import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import type { Word } from "@/data/words";

interface SidebarSearchProps {
  onSelect: (word: Word) => void;
}

export default function SidebarSearch({ onSelect }: SidebarSearchProps) {
  const { words } = useApp();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const exact: Word[] = [];
    const starts: Word[] = [];
    const includes: Word[] = [];
    for (const w of words) {
      const word = w.word.toLowerCase();
      if (word === q) exact.push(w);
      else if (word.startsWith(q)) starts.push(w);
      else if (word.includes(q) || w.definition.toLowerCase().includes(q) || w.arabic.includes(q)) includes.push(w);
      if (exact.length + starts.length + includes.length > 80) break;
    }
    return [...exact, ...starts, ...includes].slice(0, 12);
  }, [query, words]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const choose = (w: Word) => {
    onSelect(w);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div ref={containerRef} className="relative px-3 pt-3">
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setHighlight((h) => Math.min(h + 1, results.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0)); }
            else if (e.key === "Enter" && results[highlight]) { e.preventDefault(); choose(results[highlight]); }
            else if (e.key === "Escape") { setOpen(false); inputRef.current?.blur(); }
          }}
          placeholder="Search words..."
          className="w-full pl-8 pr-7 py-2 text-sm rounded-lg bg-muted/60 border border-transparent focus:bg-background focus:border-border focus:outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-foreground"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-3 right-3 top-full mt-1 z-50 bg-card border border-border rounded-xl shadow-xl overflow-hidden max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-3 py-3 text-xs text-muted-foreground">No words found</div>
          ) : (
            results.map((w, i) => (
              <button
                key={w.id}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => choose(w)}
                className={`w-full text-left px-3 py-2 border-b border-border last:border-b-0 transition-colors ${
                  i === highlight ? "bg-primary/10" : "hover:bg-muted"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold text-sm text-foreground truncate">{w.word}</span>
                  <span className="text-[10px] text-muted-foreground shrink-0">D{w.day}·G{w.group}</span>
                </div>
                <div className="text-[11px] text-muted-foreground truncate">{w.definition}</div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
