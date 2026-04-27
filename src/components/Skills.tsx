import React from "react";
import { motion } from "motion/react";

const skills = [
  {
    category: "Orchestration",
    items: ["LangChain", "LangGraph", "PydanticAI"],
    icons: [
      "/icons/langchain.svg",
      "/icons/langgraph.svg",
      "/icons/pydantic.svg",
    ],
  },
  {
    category: "LLMs",
    items: ["OpenAI (GPT-4o)", "Gemini (Flash 1.5)", "Claude (3.5 Sonnet)"],
    icons: [
      "/icons/openai.svg",
      "/icons/google-gemini.svg",
      "/icons/claude.svg",
    ],
  },
  {
    category: "Cloud",
    items: ["AWS", "GCP", "Docker", "Vercel"],
    icons: [
      "/icons/aws.svg",
      "/icons/gcp.svg",
      "/icons/docker.svg",
      "/icons/vercel.svg",
    ],
  },
  {
    category: "State",
    items: ["Redis", "Supabase"],
    icons: ["/icons/redis.svg", "/icons/supabase.svg"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
    icons: ["/icons/mongodb.svg", "/icons/postgresql.svg"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    icons: [
      "/icons/react.svg",
      "/icons/nextjs.svg",
      "/icons/tailwind.svg",
      "/icons/typescript.svg",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "JS", "Electron", "Go"],
    icons: [
      "/icons/python.svg",
      "/icons/javascript.svg",
      "/icons/electron.svg",
      "/icons/go.svg",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-32 px-8 md:px-24 bg-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40 mb-4 block">
            Technical Arsenal
          </span>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">
            Built with <span className="text-white italic">precision</span>
          </h2>
          <p className="mt-8 text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
            Shipping across the full stack — from LLM agent orchestration to
            cloud infrastructure to pixel-perfect frontends.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 border border-white/5 hover:border-brand/40 transition-colors relative h-full"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-brand transition-colors block mb-6">
                {group.category}
              </span>
              <div className="space-y-4">
                {group.items.map((item, j) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center p-2 group-hover:bg-brand/10 transition-colors">
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.split(" ")[0].toLowerCase()}/${item.split(" ")[0].toLowerCase()}-original.svg`}
                        className="w-full h-full invert opacity-50 group-hover:opacity-100 group-hover:invert-0 transition-all"
                        alt={item}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://api.dicebear.com/7.x/initials/svg?seed=${item}&backgroundColor=transparent&fontFamily=Arial`;
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
