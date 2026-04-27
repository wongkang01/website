import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import MasonryGrid from "./MasonryGrid";
import ExpandedRow from "./ExpandedRow";
import { featuredProjects, otherProjects } from "./data";

export default function MyWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpandedPhase, setIsExpandedPhase] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  // Overall grid slides up from the bottom early in the scroll
  const gridY = useTransform(scrollYProgress, [0, 0.3], ["100vh", "0vh"]);

  // Parallax upwards for individual columns
  const col1Y = useTransform(scrollYProgress, [0.35, 0.8], ["0vh", "-150vh"]);
  const col5Y = useTransform(scrollYProgress, [0.35, 0.8], ["0vh", "-150vh"]);

  // Outer columns slide up entirely, while top of 2,3,4 slide out, leaving featured behind.
  const col2OtherY = useTransform(
    scrollYProgress,
    [0.35, 0.8],
    ["0vh", "-100vh"],
  );
  const col3OtherY = useTransform(
    scrollYProgress,
    [0.35, 0.8],
    ["0vh", "-80vh"],
  );
  const col4OtherY = useTransform(
    scrollYProgress,
    [0.35, 0.8],
    ["0vh", "-100vh"],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.45 && !isExpandedPhase) {
      setIsExpandedPhase(true);
      if (hoveredIndex === null) setHoveredIndex(1);
    } else if (latest <= 0.45 && isExpandedPhase) {
      setIsExpandedPhase(false);
      setHoveredIndex(null);
    }
  });

  return (
    <section id="projects" className="bg-black text-white relative">
      <div className="h-[350vh] relative w-full" ref={containerRef}>
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div
            style={{ opacity: textOpacity, scale: textScale }}
            className="absolute flex flex-col items-center text-center z-0 px-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-4 block">
              Projects • Hackathons • Open Source
            </span>
            <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter">
              My <span className="italic">Works</span>
            </h2>
            <p className="mt-8 text-white/40 text-sm md:text-lg uppercase tracking-widest font-medium max-w-2xl px-4">
              From esports AI to hackathon finalists to 35k+ star open source
            </p>
          </motion.div>

          <MasonryGrid
            isExpandedPhase={isExpandedPhase}
            gridY={gridY}
            colTransforms={{ col1Y, col2OtherY, col3OtherY, col4OtherY, col5Y }}
            featuredProjects={featuredProjects}
            otherProjects={otherProjects}
          />

          {isExpandedPhase && (
            <ExpandedRow
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              featuredProjects={featuredProjects}
            />
          )}
        </div>
      </div>

      <div className="pb-32 text-center relative z-20 bg-black">
        <button className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-xs hover:bg-brand transition-colors">
          View All Projects
        </button>
      </div>
    </section>
  );
}
