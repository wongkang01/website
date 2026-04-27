import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import ProjectContent from './ProjectContent';

export default function FeaturedProjectCard({ project }: { project: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const width = useTransform(scrollYProgress, [0, 1], ["50%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const minHeight = useTransform(scrollYProgress, [0, 1], ["200px", "500px"]);

  // We set text threshold so content fades in after the card is mostly expanded
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.8 && !isExpanded) {
      setIsExpanded(true);
    } else if (latest <= 0.8 && isExpanded) {
      setIsExpanded(false);
    }
  });

  return (
    <div ref={containerRef} className="flex justify-center items-center py-24 min-h-[80vh]">
      <motion.div
        style={{ width, opacity, minHeight }}
        className="relative bg-white/5 border border-white/10 p-12 flex items-center justify-center overflow-hidden"
      >
        {!isExpanded && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center text-white/10 text-9xl font-black uppercase tracking-tighter"
          >
            {project.id}
          </motion.div>
        )}
        
        <ProjectContent project={project} isExpanded={isExpanded} />
      </motion.div>
    </div>
  );
}
