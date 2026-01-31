"use client";

import { useId, useState } from "react";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export function TimelineHorizontal({ timeline }: { timeline: TimelineItem[] }) {
  const uid = useId();
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e1716]/90 p-6 sm:p-8">
      {/* línea horizontal */}
      <div className="pointer-events-none absolute left-6 right-6 top-[72px] hidden h-px bg-gradient-to-r from-transparent via-am-primaryStrong/70 to-transparent sm:block" />

      {/* Años (scroll horizontal en mobile) */}
      <div className="relative">
        <div
          className="
            flex items-center gap-3 overflow-x-auto pb-3
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:justify-between sm:gap-4
          "
          role="tablist"
          aria-label="Línea de tiempo"
        >
          {timeline.map((item, idx) => {
            const isActive = idx === activeIdx;
            const tabId = `${uid}-tab-${idx}`;
            const panelId = `${uid}-panel-${idx}`;

            return (
              <button
                key={`${item.year}-${item.title}`}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => {
                if (window.matchMedia("(hover: hover)").matches) setActiveIdx(idx);
                }}
                onFocus={() => setActiveIdx(idx)}
                className={[
                    "group relative flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-3 transition",
                    "border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent",
                    "hover:border-am-primaryStrong/60 hover:shadow-[0_0_25px_rgba(48,206,186,0.16)]",
                    isActive
                    ? "border-am-primaryStrong/70 shadow-[0_0_28px_rgba(48,206,186,0.20)]"
                    : "",
                ].join(" ")}
                >
                <span
                    className={[
                    "h-3 w-3 rounded-full border shadow-[0_0_12px_rgba(48,206,186,0.35)]",
                    isActive
                        ? "border-am-primaryStrong bg-am-primaryStrong/80"
                        : "border-am-primaryStrong/40 bg-[#0b1110]",
                    ].join(" ")}
                    aria-hidden="true"
                />
                <span
                    className={[
                    "text-xs font-bold uppercase tracking-[0.32em] transition",
                    isActive
                        ? "text-am-primaryStrong"
                        : "text-am-primaryStrong/70 group-hover:text-am-primaryStrong/90",
                    ].join(" ")}
                >
                    {item.year}
                </span>
                </button>

            );
          })}
        </div>
      </div>

      {/* Panel de detalle */}
      <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-5 sm:p-6">
        {timeline.map((item, idx) => {
          const isActive = idx === activeIdx;
          const panelId = `${uid}-panel-${idx}`;
          const tabId = `${uid}-tab-${idx}`;

          return (
            <article
              key={`${item.year}-${item.title}-panel`}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!isActive}
              className={isActive ? "animate-in fade-in-0 zoom-in-95" : ""}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-[0.32em] text-am-primaryStrong/90">
                  {item.year}
                </span>
                <h3 className="text-base font-semibold text-white">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
