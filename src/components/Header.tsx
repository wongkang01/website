import React from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference pointer-events-none"
    >
      <div className="flex items-center gap-2 pointer-events-auto text-white">
        <Link to="/" className="text-xl font-bold tracking-tighter">
          WK
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-8 pointer-events-auto text-white">
        {['Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-xs font-medium uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="pointer-events-auto text-white">
        <button className="px-6 py-2 border border-white/20 hover:border-white transition-colors text-[10px] uppercase tracking-widest font-bold">
          REQUIRE
        </button>
      </div>
    </motion.header>
  );
}
