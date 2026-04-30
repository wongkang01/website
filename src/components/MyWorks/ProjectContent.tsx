import React from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function ProjectContent({
  project,
  progress,
}: {
  project: any;
  progress: number;
}) {
  const reveal = clamp(progress, 0, 1);
  const monogram = project.id.slice(0, 2).toUpperCase();

  return (
    <div
      className="flex h-full flex-col text-white"
      style={{
        opacity: reveal,
        transform: `translateY(${24 * (1 - reveal)}px)`,
      }}
    >
      <div className="max-w-[780px]">
        <div className="flex items-start gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-[#15786f]/60 bg-[#0d2623] font-display text-[2.5rem] font-black text-brand">
            {monogram}
          </div>

          <div className="min-w-0 pt-1">
            <h3 className="font-display text-[3rem] font-bold tracking-tight">
              {project.name}
            </h3>
            <p className="mt-2 text-xl text-white/42">
              {project.tagline}
            </p>
          </div>
        </div>

        {project.highlight && (
          <div className="mt-8 inline-flex items-center bg-[#0d2623] px-4 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-brand">
            {project.highlight}
          </div>
        )}

        <p className="mt-8 max-w-[720px] text-base leading-[1.6] text-white/68">
          {project.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {project.stack.map((item: string) => (
            <span
              key={item}
              className="border border-white/8 bg-white/[0.08] px-5 py-3 text-[11px] font-semibold tracking-[0.06em] text-brand"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto max-w-[740px] pt-10">
        <div className="flex h-[170px] w-full items-center justify-center border border-white/6 bg-white/[0.08] text-[10px] uppercase tracking-[0.25em] text-white/15 md:h-[190px]">
          Screenshot
        </div>
      </div>
    </div>
  );
}
