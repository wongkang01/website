import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

const ACTIVE_FLEX = 6;
const INACTIVE_FLEX = 1;
const REVEAL_THRESHOLD = 0.8;
const ROW_GAP_PX = 12;
const TRANSITION_MS = 700;

const experiences = [
  {
    company: "AdminLess.AI",
    initial: "A",
    accent: "#C79E48",
    role: "AI Solutions Developer",
    date: "Jan — Apr 2024",
    description:
      "Sole developer on a full-stack LLM data analysis platform serving a social service agency with 40,000 beneficiaries.",
    bullets: [
      "5-stage data pipeline with fuzzy schema matching, AI validation, and snapshot versioning.",
      "Pydantic AI agent with Azure Dynamic Sessions for sandboxed code execution.",
      "97% token reduction (3,400 → 100) after systematic 4-model LLM evaluation.",
    ],
    stack: ["Next.js", "FastAPI", "Pydantic AI", "Azure", "PostgreSQL"],
  },
  {
    company: "AI Singapore",
    initial: "AI",
    accent: "#AE2514",
    role: "AI Engineer Intern",
    date: "Jan 2022 — Jan 2024",
    description:
      "Designed the full backend architecture for a multi-agent strategic analysis system built for C5IT (Ministry of Defence).",
    bullets: [
      "~90% of backend codebase: agent orchestration, RAG, observability, context engineering.",
      "LangGraph Supervisor-Worker pipeline with 7-phase research workflow and HITL approval.",
      "Three-tier memory architecture achieving ~95% token reduction per source.",
    ],
    stack: ["LangGraph", "Gemini", "ChromaDB", "LangFuse", "Python"],
  },
  {
    company: "NCS Group",
    initial: "N",
    accent: "#2678C4",
    role: "IT Operations Project Intern",
    date: "Jun — Sep 2021",
    description:
      "Built an LLM-powered IT asset lifecycle tool — 3 months after GPT-3.5-turbo's public API release.",
    bullets: [
      "Automated EOL/EOS extraction across 1,458 assets from 93 hardware + 26 software vendors.",
      "4 data retrieval strategies: LLM scraping, Selenium automation, Excel lookup, REST APIs.",
      "$0.02 per batch run cost, completing in under 8 minutes.",
    ],
    stack: ["GPT-3.5", "OpenAI", "Python", "Selenium", "AWS"],
  },
];

function withAlpha(hex: string, percent: number) {
  return `color-mix(in srgb, ${hex} ${percent}%, transparent)`;
}

function TrianglePoint({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={cn("shrink-0 fill-current", className)}
      style={style}
    >
      <path d="M3 1.5 L9.5 6 L3 10.5 Z" />
    </svg>
  );
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [contentVisible, setContentVisible] = useState<boolean[]>(() =>
    experiences.map(() => false),
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const updateRef = useRef<() => void>(() => {});

  useEffect(() => {
    const totalFlex =
      ACTIVE_FLEX + INACTIVE_FLEX * (experiences.length - 1);
    const fullRatio = ACTIVE_FLEX / totalFlex;

    const update = () => {
      const firstCard = cardRefs.current[0];
      const container = firstCard?.parentElement;
      if (!container) return;
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const containerSize = isDesktop
        ? container.offsetWidth
        : container.offsetHeight;
      if (containerSize === 0) return;

      const gap = ROW_GAP_PX * (experiences.length - 1);
      const fullCardSize = (containerSize - gap) * fullRatio;
      const threshold = fullCardSize * REVEAL_THRESHOLD;

      if (isDesktop) {
        container.style.setProperty(
          "--active-card-width",
          `${Math.round(fullCardSize)}px`,
        );
      } else {
        container.style.removeProperty("--active-card-width");
      }

      const next = cardRefs.current.map((el) => {
        if (!el) return false;
        const size = isDesktop ? el.offsetWidth : el.offsetHeight;
        return size >= threshold;
      });

      setContentVisible((prev) =>
        prev.length === next.length &&
        prev.every((v, i) => v === next[i])
          ? prev
          : next,
      );
    };

    updateRef.current = update;

    const observers: ResizeObserver[] = [];
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const ro = new ResizeObserver(update);
      ro.observe(el);
      observers.push(ro);
    });
    update();

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => updateRef.current(), TRANSITION_MS + 50);
    const raf = window.requestAnimationFrame(() => updateRef.current());
    return () => {
      window.clearTimeout(id);
      window.cancelAnimationFrame(raf);
    };
  }, [activeIndex]);

  return (
    <section
      id="experience"
      className="relative py-32 px-4 md:px-12 bg-[#faf8f3] text-black min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
        }}
      />

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24 px-4"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-black/30" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/50">
              Work Experience
            </span>
          </div>
          <h2 className="font-display text-[3rem] font-bold tracking-tighter leading-[0.95]">
            Where I've <span className="italic text-brand">shipped</span>
          </h2>
          <p className="mt-8 text-base text-black/60 max-w-2xl font-medium leading-relaxed">
            From building AI agents for defence to deploying LLM tools 3 months
            after GPT-3.5's release.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:h-[640px] w-full gap-3"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {experiences.map((exp, i) => {
            const isActive = activeIndex === i;
            const showContent = contentVisible[i];
            return (
              <div
                key={exp.company}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onBlur={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(i)}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                aria-label={`${exp.company} — ${exp.role}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveIndex(i);
                  }
                }}
                className={cn(
                  "group relative rounded-2xl overflow-hidden cursor-pointer",
                  "transition-[flex,background,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "min-h-[120px] md:min-h-0",
                  "border",
                  isActive
                    ? "bg-white border-black/[0.08] shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)]"
                    : "bg-white/40 border-black/[0.05] hover:bg-white/70",
                )}
                style={{
                  flex: isActive ? 6 : 1,
                }}
              >
                <div
                  aria-hidden
                  className="absolute top-0 left-0 right-0 h-[3px] origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `scaleX(${isActive ? 1 : 0})`,
                    backgroundColor: exp.accent,
                  }}
                />

                <div
                  className={cn(
                    "absolute inset-0 flex md:flex-col items-center px-4 py-6 md:py-10 gap-6",
                    "transition-opacity duration-200",
                    isActive
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100",
                  )}
                >
                  <div
                    className="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center transition-colors duration-300"
                    style={{ backgroundColor: withAlpha(exp.accent, 12) }}
                  >
                    <span
                      className="font-display text-base font-bold tracking-tight"
                      style={{ color: withAlpha(exp.accent, 70) }}
                    >
                      {exp.initial}
                    </span>
                  </div>

                  <div className="flex-1 flex md:items-center md:justify-center min-h-0 min-w-0">
                    <span
                      className="hidden md:block text-[10px] font-bold uppercase tracking-[0.25em] text-black/45 whitespace-nowrap"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      {exp.company}
                    </span>
                    <div className="md:hidden flex flex-col">
                      <span className="font-display text-xl font-bold tracking-tight">
                        {exp.company}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-black/50 mt-1">
                        {exp.role}
                      </span>
                    </div>
                  </div>

                  <span className="hidden md:block text-[11px] font-mono text-black/30 tracking-tight whitespace-nowrap">
                    {exp.date.split(" — ")[1] ?? exp.date}
                  </span>
                </div>

                <div
                  className={cn(
                    "absolute inset-y-0 left-0 right-0 p-8 md:p-12 flex flex-col items-center text-center",
                    "md:right-auto md:w-[var(--active-card-width,1000px)]",
                    "transition-opacity duration-300",
                    showContent
                      ? "opacity-100"
                      : "opacity-0 pointer-events-none",
                  )}
                >
                  <div className="flex flex-col items-center gap-4 mb-7">
                    <div
                      className="shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: withAlpha(exp.accent, 16) }}
                    >
                      <span
                        className="font-display text-xl font-bold tracking-tight"
                        style={{ color: exp.accent }}
                      >
                        {exp.initial}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-[2.5rem] font-bold tracking-tight leading-tight">
                        {exp.company}
                      </h3>
                      <p className="text-xl text-black/60 mt-0.5">
                        {exp.role}
                      </p>
                      <p className="text-[11px] font-mono text-black/40 mt-1">
                        {exp.date}
                      </p>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed text-black/75 max-w-[55ch] mb-7">
                    {exp.description}
                  </p>

                  <ul className="space-y-4 max-w-[60ch] flex-1 mx-auto text-left">
                    {exp.bullets.map((b, j) => (
                      <li
                        key={j}
                        className={cn(
                          "flex gap-3.5 items-start text-base leading-relaxed text-black/70",
                          "transition-all duration-500",
                          showContent
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2",
                        )}
                        style={{
                          transitionDelay: showContent
                            ? `${j * 80}ms`
                            : "0ms",
                        }}
                      >
                        <TrianglePoint
                          className="w-2.5 h-2.5 mt-[7px]"
                          style={{ color: exp.accent }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {exp.stack.map((s, j) => (
                      <span
                        key={s}
                        className={cn(
                          "px-3.5 py-1.5 rounded-md text-[11px] font-medium tracking-tight",
                          "transition-all duration-500",
                          showContent
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-1",
                        )}
                        style={{
                          backgroundColor: withAlpha(exp.accent, 12),
                          color: exp.accent,
                          transitionDelay: showContent
                            ? `${j * 50}ms`
                            : "0ms",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
