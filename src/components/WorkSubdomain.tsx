import { useState } from 'react';
import { ProjectType, LabLog } from '../types';
import { WORK_PROJECTS } from '../data';
import { FolderGit, ExternalLink, Cpu, Code2, Sparkles, Filter, ChevronRight, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkSubdomainProps {
  onAddLog: (log: LabLog) => void;
}

export default function WorkSubdomain({ onAddLog }: WorkSubdomainProps) {
  const [filter, setFilter] = useState<string>('all');
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  const categories = ['all', 'System', 'UI / Library', 'DevOps', 'Audio Framework'];

  const getCategoryFromProject = (project: ProjectType) => {
    if (project.category.includes('Database') || project.category.includes('System')) return 'System';
    if (project.category.includes('UI')) return 'UI / Library';
    if (project.category.includes('DevOps') || project.category.includes('Cloud')) return 'DevOps';
    if (project.category.includes('Audio')) return 'Audio Framework';
    return 'all';
  };

  const filteredProjects = WORK_PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    return getCategoryFromProject(proj) === filter;
  });

  const selectProjectCallback = (title: string) => {
    onAddLog({
      id: `work-select-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'info',
      module: 'WORK',
      message: `Inspecting system payload specs for component: "${title}".`,
    });
  };

  return (
    <div id="work-subdomain-container" className="space-y-6">
      
      {/* Filters Bar & Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-zinc-900">
        <div className="flex items-center gap-2 text-cyan-400">
          <FolderGit className="w-5 h-5 animate-pulse" />
          <h2 className="font-sans text-sm font-bold uppercase tracking-wider">
            Technical Archives
          </h2>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap items-center gap-1.5 bg-zinc-950 p-1 rounded-lg border border-zinc-900">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                onAddLog({
                  id: `filter-${Date.now()}`,
                  timestamp: new Date().toLocaleTimeString(),
                  type: 'info',
                  module: 'WORK',
                  message: `Filtering software database for: ${cat.toUpperCase()}`,
                });
              }}
              className={`px-3 py-1.5 rounded-md font-mono text-[10px] font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                filter === cat
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                  : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid display of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <button
              key={proj.id}
              onClick={() => selectProjectCallback(proj.title)}
              className="text-left bg-zinc-900/10 border border-zinc-900 rounded-lg p-5 hover:border-cyan-500/30 transition-all duration-300 relative group overflow-hidden block w-full outline-hidden"
            >
              {/* Decorative side accent lines */}
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-transparent group-hover:bg-cyan-400 transition-colors" />
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex justify-between items-start mb-2.5">
                <div>
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mb-1">
                    {proj.category}
                  </span>
                  <h3 className="font-sans text-base font-bold text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                    {proj.title}
                  </h3>
                </div>
                {proj.metric && (
                  <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/20 border border-cyan-500/10 px-2 py-0.5 rounded-full">
                    {proj.metric}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {proj.description}
              </p>

              {/* Technologies list */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {proj.techStack.map((tech) => (
                  <span
                    key={tech}
                    onMouseEnter={() => setHoveredTag(tech)}
                    onMouseLeave={() => setHoveredTag(null)}
                    className={`font-mono text-[9px] px-2 py-1 rounded bg-zinc-950 border transition-colors ${
                      hoveredTag === tech
                        ? 'border-cyan-400 text-cyan-300 glow-cyan'
                        : 'border-zinc-900 text-zinc-500'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action indicator */}
              <div className="mt-4 pt-3 border-t border-zinc-900/50 flex items-center justify-between font-mono text-[9px] text-zinc-500 group-hover:text-cyan-400 transition-colors">
                <span className="uppercase tracking-wider">STATUS: {proj.status}</span>
                <span className="flex items-center gap-0.5">
                  DECODE SPEC <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          ))}
        </AnimatePresence>
      </div>

      {/* Experimental Git / Commit Style Grid Telemetry Widget */}
      <div className="bg-zinc-950 border border-zinc-900 p-5 rounded-lg overflow-hidden relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <BarChart className="w-4 h-4 text-cyan-400" />
            <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Synthetic Sandbox Telemetry Grid
            </h4>
          </div>
          <span className="font-mono text-[10px] text-zinc-600">QUADRANT-G7 SYSTEM UPDATES</span>
        </div>

        {/* Matrix boxes mock telemetry */}
        <div className="flex flex-wrap gap-1 items-center justify-between">
          {Array.from({ length: 52 }).map((_, i) => {
            // Compute arbitrary pseudo colors to simulate contribution heat map
            let bgClass = 'bg-zinc-900/40 border border-zinc-900/60';
            if (i % 7 === 0) bgClass = 'bg-cyan-950 border border-cyan-900';
            else if (i % 5 === 0) bgClass = 'bg-cyan-800 border border-cyan-700';
            else if (i % 11 === 0) bgClass = 'bg-cyan-500 border border-cyan-400 shadow-sm';

            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-xs transition-transform duration-200 hover:scale-125 cursor-pointer ${bgClass}`}
                title={`Telemetry node timestamp - status logged`}
              />
            );
          })}
        </div>
        
        <div className="flex justify-between items-center mt-3 text-[9px] font-mono text-zinc-600">
          <span>// TOTAL COMPILED CYCLES: 1,489,012</span>
          <span>LIVE METRICS SYSTEM LOAD: 1.04%</span>
        </div>
      </div>
    </div>
  );
}
