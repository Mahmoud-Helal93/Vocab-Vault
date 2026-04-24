import './_group.css';
import { WORD as W } from './_word';
import {
  Volume2, Users, BookOpen, Equal, Plus,
  ArrowRightLeft, Lightbulb, ChevronLeft, ChevronRight,
} from 'lucide-react';

export function Refined() {
  return (
    <div className="gre-polished flex items-start justify-center px-6 py-10 min-h-screen">
      <div className="w-full max-w-[1140px]">
        {/* Top stats strip */}
        <div className="mb-5 flex items-stretch gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-[var(--gre-border)] bg-white px-4 py-2.5 shadow-[0_1px_2px_rgba(20,12,40,0.04)]">
            <ChevronLeft size={16} className="text-[var(--gre-muted)]" />
            <span className="text-sm font-semibold text-[var(--gre-violet)]">Mission 1</span>
            <ChevronRight size={12} className="text-[var(--gre-muted)]" />
            <span className="text-sm font-semibold text-[var(--gre-fg)]">Set 1</span>
          </div>
          <div className="flex flex-1 items-center justify-around rounded-2xl border border-[var(--gre-border)] bg-white px-5 py-2.5 shadow-[0_1px_2px_rgba(20,12,40,0.04)]">
            {[
              { v: '0', l: 'Words Learned' },
              { v: '0 / 42', l: 'Missions Done' },
              { v: '0 / 126', l: 'Sets Completed' },
              { v: '0', l: 'XP · Lv 1' },
              { v: '0', l: 'Day Streak' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-start">
                <span className="text-[15px] font-bold leading-none text-[var(--gre-fg)]">{s.v}</span>
                <span className="mt-1 text-[10.5px] font-medium uppercase tracking-wide text-[var(--gre-muted)]">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="mb-5 flex items-center gap-3 rounded-2xl border border-[var(--gre-border)] bg-white px-5 py-3 shadow-[0_1px_2px_rgba(20,12,40,0.04)]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--gre-muted)]">
            Progress
          </span>
          <div className="flex flex-1 items-center gap-1.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-1 items-center gap-1.5">
                <span
                  className={`grid h-6 w-6 flex-none place-items-center rounded-full text-[11px] font-bold ${
                    i === 0
                      ? 'bg-[var(--gre-violet)] text-white shadow-[0_1px_2px_rgba(124,58,237,0.45)]'
                      : 'bg-[var(--gre-violet-soft)] text-[var(--gre-violet-ink)]'
                  }`}
                >
                  {i + 1}
                </span>
                {i < 9 && <span className="h-px flex-1 bg-[var(--gre-divider)]" />}
              </div>
            ))}
          </div>
          <span className="rounded-full bg-[var(--gre-violet-soft)] px-3 py-1 text-xs font-semibold text-[var(--gre-violet-ink)]">
            1 / 10
          </span>
        </div>

        {/* Card */}
        <div className="rounded-[28px] border border-[var(--gre-border)] bg-white p-9 shadow-[0_2px_4px_rgba(20,12,40,0.04),0_24px_60px_-30px_rgba(60,40,160,0.18)]">
          {/* Status */}
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[var(--gre-violet-soft)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--gre-violet-ink)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--gre-violet)]" />
            New
          </div>

          <div className="grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[1.55fr_1fr]">
            {/* LEFT */}
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h2 className="text-[56px] font-extrabold leading-none tracking-tight text-[var(--gre-fg)]">
                  {W.word}
                </h2>
                <button className="grid h-9 w-9 place-items-center rounded-full text-[var(--gre-violet)] transition-colors hover:bg-[var(--gre-violet-soft)]">
                  <Volume2 size={18} />
                </button>
              </div>
              <p className="mt-2 text-[13px] font-medium italic text-[var(--gre-violet)]">{W.pos}</p>

              <p className="mt-6 text-[19px] font-bold leading-snug text-[var(--gre-fg)]">
                {W.definition}
              </p>
              <p className="mt-1.5 text-[14px] text-[var(--gre-muted)]">{W.shortDef}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {W.synonyms.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gre-violet-soft)] bg-[var(--gre-violet-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--gre-violet-ink)]"
                  >
                    <Equal size={11} strokeWidth={2.5} />
                    {s}
                  </span>
                ))}
                {W.antonyms.map((a) => (
                  <span
                    key={a}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--gre-rose-soft)] bg-[var(--gre-rose-soft)] px-3 py-1.5 text-xs font-semibold text-[var(--gre-rose)]"
                  >
                    <ArrowRightLeft size={11} strokeWidth={2.5} />
                    {a}
                  </span>
                ))}
              </div>

              <ul className="mt-7 space-y-3">
                {W.examples.map((ex, i) => {
                  const re = new RegExp(`\\b(abound\\w*)\\b`, 'gi');
                  return (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-[var(--gre-violet-soft)] text-[10.5px] font-bold text-[var(--gre-violet-ink)]">
                        {i + 1}
                      </span>
                      <p className="text-[14.5px] leading-relaxed text-[var(--gre-fg-soft)]">
                        {ex.split(re).map((part, j) =>
                          re.test(part) ? (
                            <em
                              key={j}
                              className="font-semibold not-italic text-[var(--gre-violet)]"
                            >
                              {part}
                            </em>
                          ) : (
                            <span key={j}>{part}</span>
                          )
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-7 rounded-2xl bg-[var(--gre-violet-soft)] p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white shadow-sm">
                    <Lightbulb size={17} className="text-[var(--gre-violet)]" />
                  </span>
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-wider text-[var(--gre-violet-ink)]">
                      Mnemonic
                    </p>
                    <p className="mt-1 text-[14px] leading-snug text-[var(--gre-fg-soft)]">
                      {W.mnemonic}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="min-w-0 lg:border-l lg:border-[var(--gre-divider)] lg:pl-12">
              {/* Arabic + tone */}
              <div className="flex flex-col items-end gap-3">
                <p
                  className="font-['Noto_Naskh_Arabic'] text-[44px] font-semibold leading-none text-[var(--gre-fg)]"
                  dir="rtl"
                >
                  {W.arabic}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gre-amber-soft)] px-3 py-1 text-[11px] font-semibold text-[var(--gre-amber)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gre-amber)]" />
                  {W.tone}
                </span>
              </div>

              <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-[var(--gre-divider)] to-transparent" />

              {/* Word Family */}
              <div>
                <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[var(--gre-violet-ink)]">
                  <Users size={13} />
                  Word Family
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {W.wordFamily.map((wf, i) => (
                    <span
                      key={wf}
                      className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                        i === 0
                          ? 'bg-[var(--gre-violet)] text-white shadow-[0_1px_2px_rgba(124,58,237,0.4)]'
                          : 'border border-[var(--gre-border)] bg-white text-[var(--gre-violet-ink)] hover:bg-[var(--gre-violet-soft)]'
                      }`}
                    >
                      {wf}
                    </span>
                  ))}
                </div>
              </div>

              <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-[var(--gre-divider)] to-transparent" />

              {/* Etymology */}
              <div>
                <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[var(--gre-violet-ink)]">
                  <BookOpen size={13} />
                  Etymology
                </p>
                <div className="mt-3 flex items-stretch gap-2.5">
                  {W.etymology.map((e, i) => (
                    <div key={i} className="flex flex-1 items-stretch gap-2.5">
                      {i > 0 && (
                        <span className="grid w-4 flex-none place-items-center text-[var(--gre-muted)]">
                          <Plus size={14} strokeWidth={2.5} />
                        </span>
                      )}
                      <div className="flex-1 rounded-xl border border-[var(--gre-border)] bg-[var(--gre-bg)] px-3 py-2.5 text-center">
                        <p className="text-[14px] font-extrabold leading-tight text-[var(--gre-fg)]">
                          {e.part}
                        </p>
                        <p className="mt-0.5 text-[10px] font-medium italic text-[var(--gre-muted)]">
                          {e.language}
                        </p>
                        <p className="mt-1 text-[11.5px] leading-tight text-[var(--gre-fg-soft)]">
                          {e.meaning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl bg-[var(--gre-violet-soft)] px-4 py-2.5 text-center">
                  <p className="inline-flex items-center gap-2 text-[13px] font-bold text-[var(--gre-violet-ink)]">
                    <Equal size={13} strokeWidth={2.5} />
                    {W.etymologyMeaning}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          <div className="mt-9 flex items-center justify-between border-t border-[var(--gre-divider)] pt-6">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--gre-border)] bg-white px-4 py-2 text-[13px] font-semibold text-[var(--gre-fg-soft)] opacity-50">
              <ChevronLeft size={15} />
              Previous
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--gre-violet)] px-5 py-2 text-[13px] font-semibold text-white shadow-[0_2px_6px_rgba(124,58,237,0.45)] hover:bg-[#6d28d9]">
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
