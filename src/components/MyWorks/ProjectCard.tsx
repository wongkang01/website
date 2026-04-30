import React from "react";
import { cn } from "../../lib/utils";

type ProjectCardProps = {
  type: string;
  initials: string;
  name: string;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: () => void;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  type,
  initials,
  name,
  active = false,
  className,
  style,
  onMouseEnter,
}) => {
  return (
    <div
      className={cn(
        "group bg-[#111] border p-6 flex flex-col justify-between cursor-pointer transition-colors",
        active
          ? "border-[#0e5a54]/90 shadow-[0_0_0_1px_rgba(17,126,116,0.18)]"
          : "border-white/10 hover:border-white/30",
        className,
      )}
      style={style}
      onMouseEnter={onMouseEnter}
    >
      <div className="text-[10px] uppercase font-black tracking-[0.25em] text-white/30 transition-colors group-hover:text-white/70">
        {type}
      </div>
      <div>
        <h3 className="font-display text-[2.5rem] font-black mb-1 text-white/40 transition-colors group-hover:text-white">
          {initials}
        </h3>
        <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/30 transition-colors group-hover:text-white/80">
          {name}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
