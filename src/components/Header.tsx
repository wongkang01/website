import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "../lib/utils";

export default function Header() {
  const { scrollY } = useScroll();
  const [isLight, setIsLight] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Determine which section the header is currently overlapping
    // Header is fixed at top, let's check a point e.g., y = 40
    const pointY = 40;

    // We can use document.elementsFromPoint to see what's underneath
    // or just hardcode some checks. document.elementsFromPoint is robust.
    const elements = document.elementsFromPoint(window.innerWidth / 2, pointY);

    // Check if any element has a background class that signifies light mode
    // E.g., 'bg-white' or 'text-black' (if it's the section itself)
    let foundLight = false;
    for (const el of elements) {
      if (el.tagName.toLowerCase() === "section") {
        if (el.classList.contains("bg-white")) {
          foundLight = true;
        } else if (el.classList.contains("bg-black")) {
          foundLight = false;
        }
        break;
      }
    }
    setIsLight(foundLight);
  });

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl flex justify-between items-center px-8 py-4 pointer-events-none rounded-xl backdrop-blur-md transition-colors duration-500",
        isLight
          ? "bg-white/70 border border-black/10 text-black shadow-sm"
          : "bg-black/50 border border-white/10 text-white",
      )}
    >
      <div className="flex items-center gap-2 pointer-events-auto">
        <Link to="/" className="text-xl font-bold tracking-tighter">
          WK
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8 pointer-events-auto">
        {["Experience", "Skills", "Projects", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-xs font-medium uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="pointer-events-auto">
        <button
          className={cn(
            "px-6 py-2 border transition-colors text-[10px] uppercase tracking-widest font-bold",
            isLight
              ? "border-black/20 hover:border-black"
              : "border-white/20 hover:border-white",
          )}
        >
          REQUIRE
        </button>
      </div>
    </motion.header>
  );
}
