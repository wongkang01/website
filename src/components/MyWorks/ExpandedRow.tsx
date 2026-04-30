import React from "react";
import ProjectContent from "./ProjectContent";
import ProjectCard from "./ProjectCard";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (start: number, end: number, progress: number) =>
  start + (end - start) * progress;

type StageSize = {
  width: number;
  height: number;
};

type ExpandedRowProps = {
  hoveredIndex: number;
  setHoveredIndex: (index: number) => void;
  featuredProjects: any[];
  featuredProgress: number;
  stageSize: StageSize;
};

// Mt offsets (as fraction of stage height) for cols 2, 3, 4 in MasonryGrid.
// These MUST match the mt-[Xvh] values in MasonryGrid for the featured cards
// to land as the natural bottom row of each column.
const COL_TOP_FRACTIONS = [0.06, 0.10, 0.06];
const OTHER_CARDS_PER_COL = 2;
// Horizontal padding fraction (matches px-[6vw] in MasonryGrid) so collapsed
// featured cards align with masonry columns.
const HORIZONTAL_PADDING_FRACTION = 0.06;

export default function ExpandedRow({
  hoveredIndex,
  setHoveredIndex,
  featuredProjects,
  featuredProgress,
  stageSize,
}: ExpandedRowProps) {
  const progress = clamp(featuredProgress, 0, 1);
  const contentProgress = clamp((progress - 0.2) / 0.5, 0, 1);
  const canInteract = progress > 0.14;
  // hoveredIndex of -1 = no card highlighted. Default to middle ONLY for layout
  // weighting once expansion is meaningfully underway, so the bottom row stays
  // uniform until the user actually engages.
  const activeIndex =
    hoveredIndex >= 0 ? hoveredIndex : progress > 0.5 ? 1 : -1;
  const showActiveStyling = activeIndex >= 0 && progress > 0.05;
  const stageWidth = stageSize.width;
  const stageHeight = stageSize.height;
  const ready = stageWidth > 0 && stageHeight > 0;

  // Wrapper must always render so GSAP can target `.myworks-expanded` on first effect.
  return (
    <div className="myworks-expanded pointer-events-none absolute inset-0 z-20">
      {ready ? renderCards() : null}
    </div>
  );

  function renderCards() {
    const isDesktop = stageWidth >= 1024;
    const horizontalPadding = isDesktop
      ? stageWidth * HORIZONTAL_PADDING_FRACTION
      : 16;
    const gap = 16;
    const innerWidth = Math.max(stageWidth - horizontalPadding * 2, 320);
    const desktopColumnWidth = (innerWidth - gap * 4) / 5;
    const mobileTrackWidth = Math.min(innerWidth, 960);
    const collapsedCardWidth = isDesktop
      ? desktopColumnWidth
      : (mobileTrackWidth - gap * 2) / 3;
    const collapsedHeight = collapsedCardWidth;
    const bottomInset = Math.max(48, stageHeight * 0.08);

    const expandedTrackWidth = Math.min(innerWidth, 1320);
    const expandedLeft = (stageWidth - expandedTrackWidth) / 2;
    const expandedHeight = Math.min(Math.max(stageHeight - 96, 0), 620);
    const expandedCardTop = stageHeight - bottomInset - expandedHeight;

    // Per-column collapsed top: featured card sits just below the col's "other" stack.
    const otherStackHeight =
      OTHER_CARDS_PER_COL * collapsedCardWidth +
      Math.max(0, OTHER_CARDS_PER_COL - 1) * gap;
    const collapsedTops = featuredProjects.map((_: any, index: number) =>
      isDesktop
        ? COL_TOP_FRACTIONS[index] * stageHeight + otherStackHeight + gap
        : stageHeight - bottomInset - collapsedHeight,
    );

    const weights = featuredProjects.map((_: any, index: number) =>
      lerp(1, index === activeIndex ? 1.9 : 0.78, progress),
    );
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const expandedCardWidths = weights.map(
      (weight) => ((expandedTrackWidth - gap * 2) * weight) / totalWeight,
    );

    const expandedPositions = expandedCardWidths.map((_, index) => {
      const previousWidths = expandedCardWidths
        .slice(0, index)
        .reduce((sum, item) => sum + item, 0);

      return expandedLeft + previousWidths + gap * index;
    });

    const collapsedPositions = featuredProjects.map((_: any, index: number) => {
      if (isDesktop) {
        return horizontalPadding + (index + 1) * (desktopColumnWidth + gap);
      }

      const mobileLeft = (stageWidth - mobileTrackWidth) / 2;
      return mobileLeft + index * (collapsedCardWidth + gap);
    });

    return featuredProjects.map((project: any, index: number) => {
      const isActive = activeIndex === index;
      const showFullContent = isActive && showActiveStyling && contentProgress > 0;
      const cardLeft = lerp(collapsedPositions[index], expandedPositions[index], progress);
      const cardWidth = lerp(collapsedCardWidth, expandedCardWidths[index], progress);
      const cardHeight = lerp(collapsedHeight, expandedHeight, progress);
      const cardTop = lerp(collapsedTops[index], expandedCardTop, progress);
      const positionStyle: React.CSSProperties = {
        left: `${cardLeft}px`,
        top: `${cardTop}px`,
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
      };
      const handleMouseEnter = () => {
        if (canInteract) setHoveredIndex(index);
      };

      if (!showFullContent) {
        return (
          <ProjectCard
            key={project.id}
            type={project.type}
            initials={project.id.slice(0, 2).toUpperCase()}
            name={project.name}
            active={isActive && showActiveStyling}
            className="pointer-events-auto absolute overflow-hidden"
            style={positionStyle}
            onMouseEnter={handleMouseEnter}
          />
        );
      }

      return (
        <div
          key={project.id}
          onMouseEnter={handleMouseEnter}
          className="pointer-events-auto absolute flex min-w-0 cursor-pointer flex-col overflow-hidden border border-[#0e5a54]/90 bg-[#111] p-6 shadow-[0_0_0_1px_rgba(17,126,116,0.18)]"
          style={positionStyle}
        >
          <div className="h-full min-w-0">
            <ProjectContent project={project} progress={contentProgress} />
          </div>
        </div>
      );
    });
  }
}
