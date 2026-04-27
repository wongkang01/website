import React from "react";
import { useParams, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export default function ProjectDetail() {
  const { projectId } = useParams({ from: "/projects/$projectId" });

  return (
    <main className="min-h-screen pt-32 px-8 md:px-24 bg-black text-white">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity mb-24"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="text-[10px] uppercase tracking-[0.5em] text-brand font-black mb-4 block">
          Case Study
        </span>
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-12 uppercase">
          {projectId}
        </h1>

        <div className="grid md:grid-cols-[2fr_1fr] gap-24">
          <div className="space-y-12">
            <p className="text-3xl md:text-4xl font-medium leading-tight">
              A deep dive into how I built {projectId} to solve complex AI
              orchestration challenges.
            </p>

            <div className="aspect-video bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-white/20 uppercase tracking-widest font-black">
                Project Visualization / Demo
              </span>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-xs uppercase tracking-widest font-black text-white/30 mb-4">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Tailwind", "LLMs", "RAG"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold uppercase"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest font-black text-white/30 mb-4">
                Role
              </h3>
              <p className="font-bold">Lead Developer / AI Engineer</p>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
