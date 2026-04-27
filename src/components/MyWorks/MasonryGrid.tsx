import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

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

export default function MasonryGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Different speeds for different columns to enhance parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [300, -400]);
  const y4 = useTransform(scrollYProgress, [0, 1], [200, -300]);
  const y5 = useTransform(scrollYProgress, [0, 1], [100, -200]);

  const columns = [
    { items: [otherProjects[0], otherProjects[5]], y: y1 },
    { items: [otherProjects[1], otherProjects[6]], y: y2 },
    { items: [otherProjects[2], otherProjects[7]], y: y3 },
    { items: [otherProjects[3], otherProjects[8]], y: y4 },
    { items: [otherProjects[4], otherProjects[9]], y: y5 },
  ];

  return (
    <div ref={containerRef} className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-4 -mt-24 md:-mt-48 pb-32">
      {columns.map((col, i) => (
        <motion.div 
          key={i} 
          style={{ y: col.y }}
          className="flex flex-col gap-4"
        >
          {col.items.map((proj, j) => (
            <motion.div
              key={proj.id}
              whileHover={{ scale: 1.02 }}
              className={`relative p-6 bg-white/5 border border-white/10 group overflow-hidden cursor-pointer flex flex-col justify-between ${
                (i === 0 || i === 4) ? 'aspect-[4/5]' : 'aspect-square'
              }`}
            >
              <div className="text-[10px] uppercase font-black text-white/20 group-hover:text-brand transition-colors">Project</div>
              <div>
                <h3 className="text-3xl font-black mb-1">{proj.id.toUpperCase()}</h3>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">{proj.title}</p>
              </div>
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
