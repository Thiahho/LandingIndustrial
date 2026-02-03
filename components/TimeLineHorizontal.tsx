"use client";

import { useId, useState, useRef, useEffect } from "react";

export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export function TimelineHorizontal({ timeline }: { timeline: TimelineItem[] }) {
  const uid = useId();
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === "left" ? -200 : 200;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e1716]/90 p-4 sm:p-8">
      {/* línea horizontal */}
      <div className="pointer-events-none absolute left-6 right-6 top-[72px] hidden h-px bg-gradient-to-r from-transparent via-am-primaryStrong/70 to-transparent sm:block" />

      {/* Años (scroll horizontal en mobile) */}
      <div className="relative">
        {/* Botón izquierdo */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute -left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-[#0e1716] p-2 text-white/70 shadow-lg transition hover:bg-am-primaryStrong/20 hover:text-white sm:hidden"
            aria-label="Anterior"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Fade izquierdo */}
        {canScrollLeft && (
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-[#0e1716] to-transparent sm:hidden" />
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="
            flex items-center gap-2 overflow-x-auto px-1 pb-3
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:justify-between sm:gap-4 sm:px-0
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
                  "group relative flex shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 transition sm:gap-3 sm:px-4 sm:py-3",
                  "border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent",
                  "hover:border-am-primaryStrong/60 hover:shadow-[0_0_25px_rgba(48,206,186,0.16)]",
                  isActive
                    ? "border-am-primaryStrong/70 shadow-[0_0_28px_rgba(48,206,186,0.20)]"
                    : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2.5 w-2.5 rounded-full border shadow-[0_0_12px_rgba(48,206,186,0.35)] sm:h-3 sm:w-3",
                    isActive
                      ? "border-am-primaryStrong bg-am-primaryStrong/80"
                      : "border-am-primaryStrong/40 bg-[#0b1110]",
                  ].join(" ")}
                  aria-hidden="true"
                />
                <span
                  className={[
                    "text-[10px] font-bold uppercase tracking-[0.2em] transition sm:text-xs sm:tracking-[0.32em]",
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

        {/* Fade derecho */}
        {canScrollRight && (
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-[#0e1716] to-transparent sm:hidden" />
        )}

        {/* Botón derecho */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute -right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-[#0e1716] p-2 text-white/70 shadow-lg transition hover:bg-am-primaryStrong/20 hover:text-white sm:hidden"
            aria-label="Siguiente"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
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
