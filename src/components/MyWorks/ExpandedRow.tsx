import React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";
import ProjectContent from "./ProjectContent";

export default function ExpandedRow({
  hoveredIndex,
  setHoveredIndex,
  featuredProjects,
}: any) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 pointer-events-auto mt-[10vh]">
      <div className="w-full max-w-[1400px] h-[75vh] min-h-[500px] flex flex-col lg:flex-row gap-4">
        {featuredProjects.map((p: any, i: number) => {
          const isExpanded = hoveredIndex === i;
          return (
            <motion.div
              layoutId={`feat-${i}`}
              key={p.id}
              onMouseEnter={() => setHoveredIndex(i)}
              className={cn(
                "bg-[#111] border border-white/10 overflow-hidden relative cursor-pointer flex items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1]",
                !isExpanded && "brightness-50 grayscale hover:brightness-75",
              )}
              style={{ flex: isExpanded ? 3 : hoveredIndex !== null ? 0.5 : 1 }}
            >
              {!isExpanded ? (
                <div className="absolute inset-0 flex items-center justify-center font-black uppercase tracking-widest origin-center lg:rotate-[-90deg] text-2xl text-white/40 whitespace-nowrap">
                  {p.id}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="w-full h-full p-8 hidden md:block"
                >
                  <ProjectContent project={p} isExpanded={isExpanded} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
