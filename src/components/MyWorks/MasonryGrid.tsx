import React from "react";
import { motion, MotionValue } from "motion/react";
import { cn } from "../../lib/utils";

export default function MasonryGrid({
  isExpandedPhase,
  gridY,
  colTransforms,
  featuredProjects,
  otherProjects,
}: {
  isExpandedPhase: boolean;
  gridY: MotionValue<string>;
  colTransforms: any;
  featuredProjects: any[];
  otherProjects: any[];
}) {
  const { col1Y, col2OtherY, col3OtherY, col4OtherY, col5Y } = colTransforms;

  // Map the projects to columns
  // col 1: other, other
  const col1 = [otherProjects[0], otherProjects[1]];
  // col 2: other, featured[0], other
  const col2OtherTop = [otherProjects[2]];
  const col2Feat = featuredProjects[0];
  const col2OtherBottom = [otherProjects[3]];
  // col 3: other, featured[1], other
  const col3OtherTop = [otherProjects[4]];
  const col3Feat = featuredProjects[1];
  const col3OtherBottom = [otherProjects[5]];
  // col 4: other, featured[2], other
  const col4OtherTop = [otherProjects[6]];
  const col4Feat = featuredProjects[2];
  const col4OtherBottom = [otherProjects[7]];
  // col 5: other, other
  const col5 = [otherProjects[8], otherProjects[9]];

  const renderOther = (p: any) => (
    <div
      key={p.id}
      className={cn(
        "bg-[#111] border border-white/10 p-6 flex flex-col justify-between aspect-square w-full opacity-60 hover:opacity-100 transition-opacity cursor-pointer",
      )}
    >
      <div className="text-[10px] uppercase font-black text-white/20">
        Project
      </div>
      <div>
        <h3 className="text-3xl font-black mb-1">{p.id.toUpperCase()}</h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">
          {p.title}
        </p>
      </div>
    </div>
  );

  const renderFeatBase = (p: any, i: number) => {
    // This is the placeholder that morphs into the expanded version
    // If it's expanded phase, we hide this block using layoutId magic or just opacity
    return (
      <motion.div
        layoutId={`feat-${i}`}
        key={p.id}
        className={cn(
          "bg-[#111] border border-white/10 p-6 flex flex-col justify-between aspect-square w-full cursor-pointer relative z-10",
          isExpandedPhase ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <div className="text-[10px] uppercase font-black text-white/20">
          Project
        </div>
        <div>
          <h3 className="text-3xl font-black mb-1">{p.id.toUpperCase()}</h3>
          <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">
            Featured
          </p>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      style={{ y: gridY }}
      className={cn(
        "absolute inset-0 z-10 grid grid-cols-2 lg:grid-cols-5 gap-4 px-4 pointer-events-none",
        isExpandedPhase ? "" : "pointer-events-auto",
      )}
    >
      {/* Col 1 */}
      <motion.div
        style={{ y: col1Y }}
        className="hidden lg:flex flex-col gap-4 mt-[30vh]"
      >
        {col1.map(renderOther)}
      </motion.div>

      {/* Col 2 */}
      <div className="flex flex-col gap-4 mt-[10vh]">
        <motion.div style={{ y: col2OtherY }} className="flex flex-col gap-4">
          {col2OtherTop.map(renderOther)}
        </motion.div>
        {renderFeatBase(col2Feat, 0)}
        <motion.div style={{ y: col2OtherY }} className="flex flex-col gap-4">
          {col2OtherBottom.map(renderOther)}
        </motion.div>
      </div>

      {/* Col 3 */}
      <div className="hidden lg:flex flex-col gap-4 mt-[25vh]">
        <motion.div style={{ y: col3OtherY }} className="flex flex-col gap-4">
          {col3OtherTop.map(renderOther)}
        </motion.div>
        {renderFeatBase(col3Feat, 1)}
        <motion.div style={{ y: col3OtherY }} className="flex flex-col gap-4">
          {col3OtherBottom.map(renderOther)}
        </motion.div>
      </div>

      {/* Col 4 */}
      <div className="flex flex-col gap-4 mt-[15vh]">
        <motion.div style={{ y: col4OtherY }} className="flex flex-col gap-4">
          {col4OtherTop.map(renderOther)}
        </motion.div>
        {renderFeatBase(col4Feat, 2)}
        <motion.div style={{ y: col4OtherY }} className="flex flex-col gap-4">
          {col4OtherBottom.map(renderOther)}
        </motion.div>
      </div>

      {/* Col 5 */}
      <motion.div
        style={{ y: col5Y }}
        className="hidden lg:flex flex-col gap-4 mt-[40vh]"
      >
        {col5.map(renderOther)}
      </motion.div>
    </motion.div>
  );
}
