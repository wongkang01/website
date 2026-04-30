import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MasonryGrid from "./MasonryGrid";
import ExpandedRow from "./ExpandedRow";
import { featuredProjects, otherProjects } from "./data";

gsap.registerPlugin(ScrollTrigger);

export default function MyWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [featuredProgress, setFeaturedProgress] = useState(0);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = stageRef.current;

    if (!element) return;

    const updateSize = () => {
      setStageSize({
        width: element.clientWidth,
        height: element.clientHeight,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Pad timeline to length 1 so absolute positions map directly to scroll progress
      tl.to({ _: 0 }, { _: 1, duration: 1 }, 0);

      // Phase 1 — Entry (0 -> 0.20):
      // Title fades while grid + featured cards slide up from below. By the
      // end of this phase the full masonry is settled, including the three
      // collapsed featured cards landing as the bottom row of cols 2/3/4.
      tl.to(
        ".myworks-title",
        { opacity: 0, scale: 0.9, duration: 0.20 },
        0,
      );
      tl.fromTo(
        [".myworks-grid", ".myworks-expanded"],
        { yPercent: 100 },
        { yPercent: 0, duration: 0.20 },
        0,
      );

      // Phase 2 — Settled hold (0.20 -> 0.45):
      // No animation. The user sees the full masonry with all "other" cards
      // and the three collapsed featured cards visible at the bottom.

      // Phase 3 — Top "other" rows slide away (0.45 -> 0.60):
      // Outer columns (1, 5) and the top-of-column "other" cards in cols 2/3/4
      // exit upward, leaving only the collapsed featured row.
      tl.to(".myworks-col-1", { yPercent: -160, duration: 0.15 }, 0.45);
      tl.to(".myworks-col-5", { yPercent: -160, duration: 0.15 }, 0.45);
      tl.to(".myworks-col-2-other", { yPercent: -180, duration: 0.15 }, 0.45);
      tl.to(".myworks-col-3-other", { yPercent: -180, duration: 0.15 }, 0.45);
      tl.to(".myworks-col-4-other", { yPercent: -180, duration: 0.15 }, 0.45);

      // Phase 4 — Featured-card expansion (0.60 -> 0.85):
      // The active featured card expands; the others stay collapsed beside it.
      tl.to(
        proxy,
        {
          value: 1,
          duration: 0.25,
          onUpdate: () => setFeaturedProgress(proxy.value),
        },
        0.60,
      );
    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="bg-black text-white relative">
      <div className="h-[350vh] relative w-full" ref={containerRef}>
        <div
          ref={stageRef}
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="myworks-title absolute flex flex-col items-center text-center z-0 px-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 mb-4 block">
              Projects • Hackathons • Open Source
            </span>
            <h2 className="font-display text-[3rem] font-bold tracking-tighter">
              My <span className="italic">Works</span>
            </h2>
            <p className="mt-8 text-white/40 text-base font-medium max-w-2xl px-4">
              From esports AI to hackathon finalists to 35k+ star open source
            </p>
          </div>

          <MasonryGrid
            featuredProgress={featuredProgress}
            otherProjects={otherProjects}
          />

          <ExpandedRow
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            featuredProjects={featuredProjects}
            featuredProgress={featuredProgress}
            stageSize={stageSize}
          />
        </div>
      </div>

      <div className="pb-32 text-center relative z-20 bg-black">
        <button className="px-12 py-6 bg-white text-black font-black uppercase tracking-[0.25em] text-[10px] hover:bg-brand transition-colors">
          View All Projects
        </button>
      </div>
    </section>
  );
}
