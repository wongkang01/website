import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

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
    description: "Designed and built a CLI tool (5,000 lines TypeScript) for AFFINE, adopting a CLI-over-MCP architecture. Enables AI agents to read/write documents.",
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

const otherProjects = [
  { id: "fs", name: "FS", title: "Financial Sentiment" },
  { id: "dr", name: "DR", title: "Deep Research" },
  { id: "wd", name: "WD", title: "Wandr" },
  { id: "rc", name: "RC", title: "RegCheck" },
  { id: "sf", name: "SF", title: "SeaFeed" },
  { id: "rp", name: "RP", title: "Report Creator" },
  { id: "os", name: "OS", title: "OptiStaff" },
  { id: "cy", name: "CY", title: "Crop Yield" },
  { id: "ae", name: "AE", title: "Alder Explorer" },
  { id: "ds", name: "DS", title: "DeepSeekers" },
];

export default function MyWorks() {
  return (
    <section id="projects" className="py-32 px-8 md:px-24 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-32">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4 block">Projects • Hackathons • Open Source</span>
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter">My <span className="italic">Works</span></h2>
          <p className="mt-8 text-white/40 text-lg uppercase tracking-widest font-medium">
            From esports AI to hackathon finalists to 35k+ star open source
          </p>
        </div>

        {/* Masonry-ish grid for other projects */}
        <div className="columns-2 md:columns-4 gap-4 space-y-4 mb-24">
          {otherProjects.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ scale: 1.02 }}
              className="relative p-8 bg-white/5 border border-white/10 group overflow-hidden cursor-pointer aspect-square flex flex-col justify-between"
            >
              <div className="text-[10px] uppercase font-black text-white/20 group-hover:text-brand transition-colors">Project</div>
              <div>
                <h3 className="text-4xl font-black mb-1">{proj.id.toUpperCase()}</h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">{proj.title}</p>
              </div>
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Expanding Featured Projects */}
        <div className="space-y-8">
          {featuredProjects.map((proj, i) => (
            <ExpandingCard key={proj.id} project={proj} />
          ))}
        </div>

        <div className="mt-24 text-center">
            <button className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-brand transition-colors">
                View All Projects
            </button>
        </div>
      </div>
    </section>
  );
}

function ExpandingCard({ project }: { project: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const width = useTransform(scrollYProgress, [0, 1], ["80%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <div ref={containerRef} className="flex justify-center items-center py-12">
      <motion.div
        style={{ width, opacity, y }}
        className="relative bg-white/5 border border-white/10 p-12 overflow-hidden group"
      >
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-8">
              <span className="px-3 py-1 bg-brand/20 text-brand text-[10px] font-black uppercase tracking-widest">{project.type}</span>
              {project.highlight && (
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{project.highlight}</span>
              )}
            </div>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">{project.id === 'retake' ? <span className="text-white">RE</span> : null}{project.name}</h3>
            <p className="text-2xl font-medium text-white/60 mb-8">{project.tagline}</p>
            <p className="text-white/40 max-w-2xl leading-relaxed italic mb-12">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s: string) => (
                <span key={s} className="px-3 py-1 border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40">{s}</span>
              ))}
            </div>
          </div>
          
          <div className="shrink-0 w-full md:w-auto">
             <button className="w-full md:w-auto px-8 py-4 border border-white/20 group-hover:border-white transition-colors uppercase tracking-[0.2em] font-bold text-[10px] flex items-center justify-center gap-3">
                Screenshot
                <ArrowUpRight className="w-4 h-4" />
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
