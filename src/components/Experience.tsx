import React from 'react';
import { motion } from 'motion/react';

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
    stack: ["Next.js", "FastAPI", "Pydantic AI", "Azure", "PostgreSQL"]
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
    stack: ["LangGraph", "Gemini", "ChromaDB", "LangFuse", "Python"]
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
    stack: ["GPT-3.5", "OpenAI", "Python", "Selenium", "AWS"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-8 md:px-24 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-24"
        >
          <span className="text-xs font-black uppercase tracking-[0.4em] text-black/40 mb-4 block">Work Experience</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Where I've <span className="text-brand italic bg-black px-4 text-white">shipped</span></h2>
          <p className="mt-8 text-xl text-black/60 max-w-2xl font-medium">
            From building AI agents for defence to deploying LLM tools 3 months after GPT-3.5's release.
          </p>
        </motion.div>

        <div className="space-y-32">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="grid md:grid-cols-[1fr_2fr] gap-12 border-t border-black/10 pt-12"
            >
              <div>
                <h3 className="text-4xl font-bold mb-2">{exp.company}</h3>
                <p className="text-lg font-bold text-black/40 uppercase tracking-widest">{exp.role}</p>
                <p className="text-sm font-mono text-black/30 mt-4">{exp.date}</p>
                
                <div className="flex flex-wrap gap-2 mt-8">
                  {exp.stack.map(s => (
                    <span key={s} className="px-3 py-1 bg-black/5 text-[10px] font-bold uppercase tracking-widest border border-black/5">{s}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-2xl font-medium leading-tight">
                  {exp.description}
                </p>
                <ul className="space-y-4">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-4 items-start text-black/60 leading-relaxed italic">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
