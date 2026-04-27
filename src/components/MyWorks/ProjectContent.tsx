import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectContent({ project, isExpanded }: { project: any; isExpanded: boolean }) {
  if (!isExpanded) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col md:flex-row justify-between items-start gap-12 w-full h-full"
    >
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-8">
          <span className="px-3 py-1 bg-brand/20 text-brand text-[10px] font-black uppercase tracking-widest">{project.type}</span>
          {project.highlight && (
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{project.highlight}</span>
          )}
        </div>
        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          {project.id === 'retake' ? <span className="text-white">RE</span> : null}{project.name}
        </h3>
        <p className="text-2xl font-medium text-white/60 mb-8">{project.tagline}</p>
        <p className="text-white/40 max-w-2xl leading-relaxed italic mb-12">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s: string) => (
            <span key={s} className="px-3 py-1 border border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/40">{s}</span>
          ))}
        </div>
      </div>
      
      <div className="shrink-0 w-full md:w-auto">
         <button className="w-full md:w-auto px-8 py-4 border border-white/20 hover:border-white transition-colors uppercase tracking-[0.2em] font-bold text-[10px] flex items-center justify-center gap-3">
            Screenshot
            <ArrowUpRight className="w-4 h-4" />
         </button>
      </div>
    </motion.div>
  );
}
