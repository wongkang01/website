import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "../lib/utils";

function relativeLuminance(r: number, g: number, b: number) {
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function parseRgb(value: string): [number, number, number, number] | null {
  const match = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i);
  if (!match) return null;
  const r = parseFloat(match[1]);
  const g = parseFloat(match[2]);
  const b = parseFloat(match[3]);
  const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
  return [r, g, b, a];
}

function detectLightBackground(x: number, y: number): boolean {
  if (typeof document === "undefined") return false;
  const elements = document.elementsFromPoint(x, y);
  for (const el of elements) {
    if (el instanceof HTMLElement && el.dataset.headerIgnore === "true") {
      continue;
    }
    const bg = window.getComputedStyle(el).backgroundColor;
    const rgba = parseRgb(bg);
    if (!rgba) continue;
    const [r, g, b, a] = rgba;
    if (a < 0.4) continue;
    return relativeLuminance(r, g, b) > 0.5;
  }
  return false;
}

export default function Header() {
  const { scrollY } = useScroll();
  const [isLight, setIsLight] = useState(false);

  useMotionValueEvent(scrollY, "change", () => {
    const next = detectLightBackground(window.innerWidth / 2, 40);
    setIsLight((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsLight(detectLightBackground(window.innerWidth / 2, 40));
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.header
      data-header-ignore="true"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl",
        "flex justify-between items-center px-8 py-4 pointer-events-none rounded-xl",
        "backdrop-blur-xl backdrop-saturate-150",
        "transition-[background-color,border-color,color,box-shadow] duration-500 ease-out",
        isLight
          ? "bg-white/55 border border-black/10 text-black shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)]"
          : "bg-black/35 border border-white/15 text-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-500",
          isLight
            ? "opacity-100 bg-gradient-to-b from-white/40 to-transparent"
            : "opacity-100 bg-gradient-to-b from-white/10 to-transparent",
        )}
      />

      <div className="relative flex items-center gap-2 pointer-events-auto">
        <Link to="/" className="font-display text-xl font-bold tracking-tighter">
          WK
        </Link>
      </div>

      <nav className="relative hidden md:flex items-center gap-8 pointer-events-auto">
        {["Experience", "Skills", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] font-medium uppercase tracking-[0.25em] opacity-60 hover:opacity-100 transition-opacity"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="relative pointer-events-auto">
        <button
          className={cn(
            "px-6 py-2 border rounded-md text-[10px] uppercase tracking-[0.25em] font-bold",
            "transition-colors duration-300",
            isLight
              ? "border-black/20 hover:border-black hover:bg-black hover:text-white"
              : "border-white/20 hover:border-white hover:bg-white hover:text-black",
          )}
        >
          REQUIRE
        </button>
      </div>
    </motion.header>
  );
}
