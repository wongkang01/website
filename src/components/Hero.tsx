import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import VoronoiBackground from "./VoronoiBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 overflow-hidden pt-32">
      <VoronoiBackground />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-brand">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
          Available for Internships - 2024
        </span>
      </motion.div>

      <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h1 className="text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.8] mb-8">
            Wong <br /> Kang
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed mb-12">
            AI Engineer building autonomous agents, RAG systems, and full-stack
            LLM applications. Shipping production AI since GPT-3.5's public
            release.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="group relative px-8 py-4 bg-brand text-black font-bold uppercase tracking-widest text-xs flex items-center gap-2 overflow-hidden">
              <span className="relative z-10">View Projects</span>
              <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button className="px-8 py-4 border border-white/10 hover:border-white/40 transition-colors uppercase tracking-widest text-xs font-bold flex items-center gap-2">
              Resume
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <div className="relative pt-12 md:pt-24 pl-12">
          {/* Animated vertical line */}
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
            className="absolute left-0 top-0 w-px bg-white/10 origin-top"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-[10px] uppercase tracking-widest font-black text-white/30 mb-8 absolute -left-4 top-24 -rotate-90 origin-left"
          >
            Education
          </motion.div>

          <div className="space-y-12">
            {[
              {
                school: "SUTD",
                degree: "Computer Science & Design",
                date: "2023 — 2027",
                meta: "Merit Scholarship • 4.8/5.0",
                current: true,
              },
              {
                school: "UofT",
                degree: "Computer Science Program",
                date: "2022 — 2023",
              },
              {
                school: "ACJC",
                degree: "A Levels",
                date: "2018 — 2019",
              },
            ].map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + i * 0.2 }}
                className="group relative"
              >
                <div className="absolute -left-[3.25rem] top-1.5 w-3 h-3 rounded-full bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
                {edu.current && (
                  <span className="text-[10px] font-bold text-brand uppercase tracking-widest mb-1 block">
                    Current
                  </span>
                )}
                <h3 className="text-xl font-bold">{edu.school}</h3>
                <p className="text-white/60 text-sm">{edu.degree}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/40 text-xs font-mono">
                    {edu.date}
                  </span>
                  {edu.meta && (
                    <span className="text-brand/60 text-[10px] font-bold uppercase">
                      {edu.meta}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-black">
          Scroll
        </span>
        <div className="w-px h-12 bg-white" />
      </motion.div>
    </section>
  );
}
