import React from "react";
import { cn } from "../../lib/utils";
import ProjectCard from "./ProjectCard";

export default function MasonryGrid({
  featuredProgress,
  otherProjects,
}: {
  featuredProgress: number;
  otherProjects: any[];
}) {
  // 13-card layout (5,5,3 row-wise; 2,3,3,3,2 col-wise).
  // Cols 1 & 5: 2 tall rectangles (aspect-[2/3]).
  // Cols 2, 3, 4: 2 squares + featured row from ExpandedRow.
  const col1 = [otherProjects[0], otherProjects[5]]; // FS, RP
  const col2OtherTop = [otherProjects[1], otherProjects[6]]; // DR, OS
  const col3OtherTop = [otherProjects[2], otherProjects[7]]; // WD, CY
  const col4OtherTop = [otherProjects[3], otherProjects[8]]; // RC, AE
  const col5 = [otherProjects[4], otherProjects[9]]; // SF, DS

  const renderOther = (p: any, aspectClass: string) => (
    <ProjectCard
      key={p.id}
      type="Project"
      initials={p.id.toUpperCase()}
      name={p.title}
      className={`${aspectClass} w-full`}
    />
  );

  return (
    <div
      className={cn(
        "myworks-grid absolute inset-0 z-10 grid grid-cols-2 lg:grid-cols-5 gap-4 px-[6vw] pointer-events-none",
        featuredProgress < 0.12 ? "pointer-events-auto" : "",
      )}
    >
      <div className="myworks-col-1 hidden lg:flex flex-col gap-4 mt-[2vh]">
        {col1.map((p) => renderOther(p, "aspect-[2/3]"))}
      </div>

      <div className="flex flex-col gap-4 mt-[6vh]">
        <div className="myworks-col-2-other flex flex-col gap-4">
          {col2OtherTop.map((p) => renderOther(p, "aspect-square"))}
        </div>
      </div>

      <div className="hidden lg:flex flex-col gap-4 mt-[10vh]">
        <div className="myworks-col-3-other flex flex-col gap-4">
          {col3OtherTop.map((p) => renderOther(p, "aspect-square"))}
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-[6vh]">
        <div className="myworks-col-4-other flex flex-col gap-4">
          {col4OtherTop.map((p) => renderOther(p, "aspect-square"))}
        </div>
      </div>

      <div className="myworks-col-5 hidden lg:flex flex-col gap-4 mt-[2vh]">
        {col5.map((p) => renderOther(p, "aspect-[2/3]"))}
      </div>
    </div>
  );
}
