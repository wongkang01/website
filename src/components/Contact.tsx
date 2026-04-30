import React from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-48 px-8 md:px-24 bg-white text-black relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <h2 className="font-display text-[30rem] font-black tracking-tighter leading-none select-none">
          HELLO
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black/40 mb-8 block">
            Let's Connect
          </span>
          <h2 className="font-display text-[3rem] font-bold tracking-tighter leading-[0.95] mb-16">
            Build something <br />
            <span className="italic text-brand">extraordinary</span> <br />
            together.
          </h2>

          <button className="group relative px-12 py-8 bg-black text-white text-[10px] font-bold uppercase tracking-[0.25em] overflow-hidden flex items-center gap-4 transition-transform hover:scale-[1.02] active:scale-95">
            Get in touch
            <div className="absolute inset-0 bg-brand translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1] mix-blend-difference" />
          </button>
        </motion.div>

        <footer className="mt-48 flex flex-col md:flex-row justify-between items-end gap-12 border-t border-black/10 pt-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.25em] opacity-40">
              <span className="w-2 h-2 rounded-full bg-brand" />
              Wong Kang • 2024
            </div>
          </div>

          <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.25em]">
            {["Github", "Linkedin", "Email"].map((social) => (
              <a
                key={social}
                href="#"
                className="hover:text-brand transition-colors flex items-center gap-2 group"
              >
                {social}
                <div className="w-px h-0 bg-brand group-hover:h-3 transition-all" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
