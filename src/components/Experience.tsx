import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const experiences = [
  {
    company: "AdminLess.AI",
    role: "AI Solutions Developer",
    date: "Jan — Apr 2024",
    description: "Sole developer on a full-stack LLM data analysis platform serving a social service agency with 40,000 beneficiaries.",
    bullets: [
      "5-stage data pipeline with fuzzy schema matching, AI validation, and snapshot versioning.",
      "Pydantic AI agent with Azure Dynamic Sessions for sandboxed code execution.",
      "97% token reduction (3,400 -> 100) after systematic 4-model LLM evaluation."
    ],
    stack: ["Next.js", "FastAPI", "Pydantic AI", "Azure", "PostgreSQL"],
    bgColor: "bg-[#f0fdfa]", // light teal
    textColor: "text-teal-900",
    accentColor: "bg-teal-200"
  },
  {
    company: "AI Singapore",
    role: "AI Engineer Intern",
    date: "Jan 2022 — Jan 2024",
    description: "Designed the full backend architecture for a multi-agent strategic analysis system built for C5IT (Ministry of Defence).",
    bullets: [
      "~90% of backend codebase: agent orchestration, RAG, observability, context engineering.",
      "LangGraph Supervisor-Worker pipeline with 7-phase research workflow and HITL approval.",
      "Three-tier memory architecture achieving ~95% token reduction per source."
    ],
    stack: ["LangGraph", "Gemini", "ChromaDB", "LangFuse", "Python"],
    bgColor: "bg-[#f8fafc]", // light slate
    textColor: "text-slate-900",
    accentColor: "bg-slate-200"
  },
  {
    company: "NCS Group",
    role: "IT Operations Project Intern",
    date: "Jun — Sep 2021",
    description: "Built an LLM-powered IT asset lifecycle tool - 3 months after GPT-3.5-turbo's public API release.",
    bullets: [
      "Automated EOL/EOS extraction across 1,458 assets from 93 hardware + 26 software vendors.",
      "4 data retrieval strategies: LLM scraping, Selenium automation, Excel lookup, REST APIs.",
      "$0.02 per batch run cost, completing in under 8 minutes."
    ],
    stack: ["GPT-3.5", "OpenAI", "Python", "Selenium", "AWS"],
    bgColor: "bg-[#ecfdf5]", // light emerald
    textColor: "text-emerald-900",
    accentColor: "bg-emerald-200"
  }
];

export default function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-32 px-4 md:px-12 bg-white text-black min-h-screen flex flex-col justify-center">
      <div className="max-w-[1400px] w-full mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16 md:mb-24 px-4"
        >
          <span className="text-xs font-black uppercase tracking-[0.4em] text-black/40 mb-4 block">Work Experience</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Where I've <span className="italic text-brand">shipped</span>
          </h2>
          <p className="mt-8 text-xl text-black/60 max-w-2xl font-medium">
            From building AI agents for defence to deploying LLM tools 3 months after GPT-3.5's release.
          </p>
        </motion.div>

        <div className="flex flex-col xl:flex-row h-[1200px] xl:h-[700px] w-full gap-4">
          {experiences.map((exp, i) => {
            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;
            
            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative overflow-hidden rounded-3xl p-8 flex flex-col transition-all duration-700 ease-[0.16,1,0.3,1]",
                  exp.bgColor,
                  exp.textColor
                )}
                style={{
                  flex: isHovered ? 1.5 : (isAnyHovered ? 0.8 : 1)
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-3xl font-bold mb-1">{exp.company}</h3>
                      <p className="text-sm font-bold opacity-60 uppercase tracking-widest">{exp.role}</p>
                    </div>
                    <span className="text-xs font-mono opacity-50 whitespace-nowrap">{exp.date}</span>
                  </div>

                  <p className={cn(
                    "text-lg font-medium leading-relaxed mb-8 transition-opacity duration-500 delay-100",
                    isHovered ? "opacity-100" : "opacity-80 xl:opacity-0 xl:hidden"
                  )}>
                    {exp.description}
                  </p>

                  <div className={cn(
                    "flex-1 overflow-hidden transition-all duration-500",
                    isHovered ? "opacity-100" : "opacity-100 xl:opacity-0"
                  )}>
                    <ul className="space-y-4">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 items-start opacity-80 text-sm leading-relaxed">
                          <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", exp.accentColor)} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2 pt-8 border-t border-black/5">
                    {exp.stack.map(s => (
                      <span key={s} className="px-3 py-1 bg-black/5 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
