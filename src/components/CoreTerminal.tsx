import React, { useState, useEffect, useRef } from 'react';
import { LabLog } from '../types';
import { LAB_LOGS } from '../data';
import { Terminal, Shield, Play, Send, Check } from 'lucide-react';

interface CoreTerminalProps {
  onNavigate: (view: 'portal' | 'game' | 'work' | 'velkora') => void;
  onAddLog: (log: LabLog) => void;
  logs: LabLog[];
}

export default function CoreTerminal({ onNavigate, onAddLog, logs }: CoreTerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    // Create prompt log
    const timestamp = new Date().toLocaleTimeString();
    const userLog: LabLog = {
      id: `cmd-${Date.now()}`,
      timestamp,
      type: 'info',
      module: 'CORE',
      message: `guest@ramulab:~$ ${inputVal}`,
    };
    onAddLog(userLog);

    // Parse the command
    let responseText = '';
    let responseType: 'info' | 'success' | 'warn' | 'error' = 'info';

    switch (command) {
      case 'help':
        responseText = 'Available commands: [show ramulab] [show game] [show work] [show velkora] [diagnostics] [clear]';
        break;
      case 'show ramulab':
        onNavigate('portal');
        responseText = 'Navigating to CORE/portal module...';
        responseType = 'success';
        break;
      case 'show game':
        onNavigate('game');
        responseText = 'Initializing game.ramulab sub-gateway...';
        responseType = 'success';
        break;
      case 'show work':
        onNavigate('work');
        responseText = 'Loading technical archives at work.ramulab...';
        responseType = 'success';
        break;
      case 'show velkora':
        onNavigate('velkora');
        responseText = 'Connecting to long-range scanner velkora.ramulab...';
        responseType = 'success';
        break;
      case 'diagnostics':
        responseText = 'Diagnostics system report: 12 systems operational. Active telemetry online. Subdomain protocols verified.';
        responseType = 'success';
        break;
      case 'clear':
        // We will just print a system reset message
        responseText = 'Telemetry logs reset.';
        break;
      default:
        responseText = `Unknown command: "${command}". Type "help" for core list.`;
        responseType = 'error';
    }

    setTimeout(() => {
      onAddLog({
        id: `cmd-resp-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: responseType,
        module: 'CORE',
        message: responseText,
      });
    }, 200);

    setInputVal('');
  };

  return (
    <div id="core-terminal-panel" className="bg-lab-dark-obsidian border border-zinc-800 rounded-lg overflow-hidden glow-border-green/20">
      {/* Terminal Title Bar */}
      <div className="bg-zinc-950 border-b border-zinc-900 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="font-mono text-xs font-semibold tracking-wider text-zinc-400">
            RAMULAB CENTRAL CONTROL SYSTEMS // V1.04
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">
            LIVE TELEMETRY
          </span>
        </div>
      </div>

      {/* Terminal Main Stream Area */}
      <div className="p-4 h-40 overflow-y-auto font-mono text-[11px] leading-relaxed select-text space-y-1 bg-lab-dark-obsidian/85 backdrop-blur-md">
        <div className="text-zinc-500 pb-1.5 border-b border-zinc-900/50 mb-1.5">
          ** RaMulab Labs Sandbox Terminal. Input "help" or select gateways above. **
        </div>
        
        {logs.map((log) => {
          let typeColor = 'text-zinc-400';
          if (log.type === 'success') typeColor = 'text-emerald-400';
          if (log.type === 'warn') typeColor = 'text-amber-400';
          if (log.type === 'error') typeColor = 'text-rose-400';

          return (
            <div key={log.id} className="flex gap-2">
              <span className="text-zinc-600">[{log.timestamp}]</span>
              <span className={`px-1 py-0.2 text-[9px] rounded font-semibold bg-zinc-900 ${
                log.module === 'CORE' ? 'text-zinc-400 border border-zinc-800' :
                log.module === 'GAME' ? 'text-emerald-400 border border-emerald-950' :
                log.module === 'WORK' ? 'text-cyan-400 border border-cyan-950' :
                'text-purple-400 border border-purple-950'
              }`}>
                {log.module}
              </span>
              <span className={typeColor}>{log.message}</span>
            </div>
          );
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Actions */}
      <form onSubmit={handleCommandSubmit} className="bg-zinc-950 border-t border-zinc-900 flex items-center">
        <div className="pl-4 text-emerald-500/80 font-mono text-xs select-none">
          guest@ramulab:~$
        </div>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type command (e.g. show game, diagnostics)..."
          className="flex-1 bg-transparent border-0 ring-0 focus:outline-none focus:ring-0 text-zinc-300 font-mono text-xs px-3 py-2.5 placeholder-zinc-600"
        />
        <button
          type="submit"
          className="bg-zinc-900 hover:bg-zinc-800 border-l border-zinc-800 px-4 py-2.5 text-zinc-400 hover:text-emerald-400 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
