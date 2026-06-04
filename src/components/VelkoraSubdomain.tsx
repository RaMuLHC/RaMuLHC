import { useState } from 'react';
import { VelkoraLogType, LabLog } from '../types';
import { VELKORA_LOGS } from '../data';
import { Compass, Globe, Radio, ShieldAlert, Cpu, Sparkles, TerminalSquare, Eye, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VelkoraSubdomainProps {
  onAddLog: (log: LabLog) => void;
}

export default function VelkoraSubdomain({ onAddLog }: VelkoraSubdomainProps) {
  const [selectedLog, setSelectedLog] = useState<VelkoraLogType>(VELKORA_LOGS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [spectralScore, setSpectralScore] = useState<number | null>(null);

  const initiatePlanetarySurvey = (coord: string) => {
    setIsScanning(true);
    setSpectralScore(null);
    onAddLog({
      id: `velkora-spec-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'warn',
      module: 'VELKORA',
      message: `Directing orbital scanner array to coordinates ${coord}. Pulsing deep wavelength radar...`,
    });

    setTimeout(() => {
      setIsScanning(false);
      const score = Math.floor(Math.random() * 100);
      setSpectralScore(score);
      onAddLog({
        id: `velkora-spec-res-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'success',
        module: 'VELKORA',
        message: `Planetary survey completed. Spectral response signal: ${score}% purity detected. Unexplained crystalline patterns confirmed.`,
      });
    }, 2000);
  };

  return (
    <div id="velkora-subdomain-root" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Sidebar: Lore Files Index list */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <div className="flex items-center justify-between text-purple-400 py-1 border-b border-zinc-950">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 animate-pulse" />
            <h2 className="font-sans text-sm font-bold uppercase tracking-wider">
              Velkora Deep Files
            </h2>
          </div>
          <span className="font-mono text-[9px] text-purple-500/80 uppercase">DECRYPTION ENGINE SECURE</span>
        </div>

        <div className="space-y-3">
          {VELKORA_LOGS.map((log) => (
            <button
              key={log.id}
              onClick={() => {
                setSelectedLog(log);
                onAddLog({
                  id: `lore-read-${Date.now()}`,
                  timestamp: new Date().toLocaleTimeString(),
                  type: 'info',
                  module: 'VELKORA',
                  message: `Decryption payload loaded for terminal sector log: ${log.designation}.`,
                });
              }}
              className={`w-full text-left p-4 border rounded-lg hover:border-purple-500/45 transition-all text-zinc-300 block relative overflow-hidden group cursor-pointer ${
                selectedLog.id === log.id
                  ? 'bg-purple-950/15 border-purple-500/30'
                  : 'bg-zinc-900/40 border-zinc-900'
              }`}
            >
              <div className="flex justify-between items-center mb-1.5 font-mono text-[10px]">
                <span className="text-purple-400 tracking-wider">
                  {log.designation}
                </span>
                <span className="text-zinc-500">{log.timestamp}</span>
              </div>
              <h3 className="font-sans text-xs font-bold text-white group-hover:text-purple-400 transition-colors mb-2">
                {log.title}
              </h3>
              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                {log.summary}
              </p>
              
              <div className="mt-3 flex items-center justify-between text-[9px] font-mono">
                <span className="text-zinc-600">{log.sector}</span>
                <span className={`px-1.5 py-0.5 rounded-full border border-purple-500/10 text-[8px] tracking-widest ${
                  log.classification === 'UNRESTRICTED' ? 'bg-zinc-900 text-zinc-400' :
                  log.classification === 'RESTRICTED' ? 'bg-amber-950/30 text-amber-500' :
                  'bg-rose-950/40 text-rose-400 animate-pulse'
                }`}>
                  {log.classification}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Panel Explorer: Lore reading desk + Scanning simulation */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* Module 1: Decryption console output */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4 font-mono text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="font-semibold text-zinc-300">CORE DECRYPTION TRANSMISSIONS</span>
            </div>
            <span>COORDINATES: {selectedLog.coordinates}</span>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-sans text-lg font-bold text-white tracking-tight glow-purple">
                {selectedLog.title}
              </h3>
              <p className="text-xs text-purple-400 font-mono mt-1">
                // SYSTEM TELEMETRY INDEX: {selectedLog.designation} (SECTOR OVERFLOW)
              </p>
            </div>

            <p className="font-sans text-xs text-zinc-300 leading-relaxed bg-zinc-900/20 border border-zinc-900/60 p-4 rounded-md select-text">
              {selectedLog.content}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-zinc-900/50 flex flex-wrap gap-2 justify-between items-center">
            <span className="font-mono text-[9px] text-zinc-600">// DECRYPT CIPHER PROTOCOL: ENCRYPT_AES_G7</span>
            
            <button
              onClick={() => initiatePlanetarySurvey(selectedLog.coordinates)}
              disabled={isScanning}
              className={`px-4 py-2 bg-purple-500/10 hover:bg-purple-500 text-purple-300 hover:text-black font-semibold border border-purple-500/20 hover:border-purple-400 rounded text-[11px] tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                isScanning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              {isScanning ? 'PINGING ORBITAL ARRAY...' : 'INITIATE ORBITAL SURVEY SCAN'}
            </button>
          </div>
        </div>

        {/* Module 2: Live Scanning results visualizer HUD */}
        {(isScanning || spectralScore !== null) && (
          <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-5 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-purple-400" />
              <h4 className="font-sans text-xs font-bold text-white tracking-wider uppercase">
                Active Telemetric Survey HUD
              </h4>
            </div>

            {isScanning && (
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 border-2 border-dashed border-purple-500 rounded-full animate-spin duration-3000" />
                  <div className="absolute inset-2 border border-dotted border-purple-400 rounded-full animate-ping duration-1500" />
                  <Compass className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-xs text-purple-300 font-mono animate-pulse">
                  SCANNING CRUSTAL RESONANCE AT {selectedLog.coordinates}...
                </div>
              </div>
            )}

            {spectralScore !== null && !isScanning && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-900/30 p-3.5 border border-zinc-900 rounded">
                    <span className="font-mono text-[9px] text-zinc-500 block">SPECTRAL REFLECTANCE INDEX</span>
                    <span className="text-xl font-bold font-sans text-purple-400">{spectralScore}% Purity</span>
                  </div>
                  <div className="bg-zinc-900/30 p-3.5 border border-zinc-900 rounded">
                    <span className="font-mono text-[9px] text-zinc-500 block">IONIC RADIATION GRID</span>
                    <span className="text-xl font-bold font-sans text-amber-500">
                      {Math.floor(spectralScore * 14.5)} Rads
                    </span>
                  </div>
                </div>

                {/* Simulated Wave spectrum */}
                <div className="h-10 bg-zinc-950 border border-zinc-900/40 rounded flex items-end px-3 gap-0.5 overflow-hidden">
                  <div className="text-[9px] font-mono text-zinc-600 mr-2 self-center">// RADAR WAVEFORM:</div>
                  {Array.from({ length: 24 }).map((_, idx) => {
                    // Height is procedurally generated using index
                    const height = Math.abs(Math.sin((idx + spectralScore) * 0.3)) * 24 + 4;
                    return (
                      <div
                        key={idx}
                        className="flex-1 bg-purple-500/40 hover:bg-purple-400 rounded-t transition-all"
                        style={{ height: `${height}px` }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}
