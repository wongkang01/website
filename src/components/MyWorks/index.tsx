import React, { useRef } from 'react';
import MasonryGrid from './MasonryGrid';
import FeaturedProjectCard from './FeaturedProjectCard';
import { motion, useScroll, useTransform } from 'motion/react';

const featuredProjects = [
  {
    id: "retake",
    name: "Retake",
    tagline: "Video snippets, Tactical Intelligence",
    type: "PROJECT",
    description: "AI-powered tactical search platform for professional VALORANT coaches. Currently being evaluated by the head coach of Paper Rex (VCT 2025 champions).",
    stack: ["React 19", "TanStack Start", "t-vector", "Gemini Flash", "Supabase"],
    highlight: "PAPER REX EVALUATION"
  },
  {
    id: "affine-cli",
    name: "AFFINE CLI",
    tagline: "Open Source Knowledge Workspace",
    type: "OPEN SOURCE",
    description: "Designed and built a CLI tool (5,000 lines TypeScript) for AFFINE, adopting a CLI-over-MCP architecture. Enables AI agents to programmatically read/write documents.",
    stack: ["TypeScript", "Fly.io", "SQLite", "Node.js", "GraphQL"],
    highlight: "35K+ STARS"
  },
  {
    id: "agora",
    name: "Agora",
    tagline: "Autonomous AI Shopping Agent",
    type: "HACKATHON",
    description: "Designed the agentic architecture integrating ERC-6004 agent discovery and xMTp protocol on Hedera's testnet. Shortlisted Finalist.",
    stack: ["ERC-6004", "xMTp", "Hedera", "LangGraph", "React"],
    highlight: "SHORTLISTED FINALIST"
  }
];

export default function MyWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section id="projects" className="py-32 px-4 md:px-12 bg-black text-white relative">
      <div className="max-w-[1400px] mx-auto min-h-screen relative" ref={containerRef}>
        
        {/* Fading text that cards slide over */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale }}
          className="sticky top-64 flex flex-col items-center text-center z-0 pt-32"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4 block">Projects • Hackathons • Open Source</span>
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter">My <span className="italic">Works</span></h2>
          <p className="mt-8 text-white/40 text-lg uppercase tracking-widest font-medium max-w-2xl">
            From esports AI to hackathon finalists to 35k+ star open source
          </p>
        </motion.div>

        {/* Masonry that slides up over the text */}
        <div className="relative z-10 pt-[50vh]">
          <MasonryGrid />
        </div>

        {/* Expanding Featured Projects */}
        <div className="space-y-4 relative z-20 mt-32">
          {featuredProjects.map((proj) => (
            <FeaturedProjectCard key={proj.id} project={proj} />
          ))}
        </div>

        <div className="mt-32 text-center pb-24 relative z-20">
            <button className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-brand transition-colors">
                View All Projects
            </button>
        </div>
      </div>
    </section>
  );
}
