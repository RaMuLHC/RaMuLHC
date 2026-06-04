import { useState, useRef, FormEvent } from 'react';
import { GameProjectType, LabLog } from '../types';
import { GAME_PROJECTS } from '../data';
import { Play, Sparkles, Cpu, Award, Zap, HelpCircle, Gamepad2, Volume2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GameSubdomainProps {
  onAddLog: (log: LabLog) => void;
}

export default function GameSubdomain({ onAddLog }: GameSubdomainProps) {
  const [selectedGame, setSelectedGame] = useState<GameProjectType>(GAME_PROJECTS[0]);
  const [synthFrequency, setSynthFrequency] = useState<number | null>(null);
  
  // Game state for Mini Hacking Game
  const [hackStage, setHackStage] = useState<'idle' | 'scanning' | 'hacking' | 'success' | 'failed'>('idle');
  const [hackCode, setHackCode] = useState<string>('');
  const [userInputCode, setUserInputCode] = useState<string>('');
  const [hackProgress, setHackProgress] = useState<number>(0);
  const [matrixLog, setMatrixLog] = useState<string[]>([]);
  
  // Web Audio Synthesizer setup
  const audioCtxRef = useRef<AudioContext | null>(null);

  const triggerSynthSound = (freq: number) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'triangle'; // Smooth sci-fi retro wave
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6); // Decay

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);

      setSynthFrequency(freq);
      setTimeout(() => setSynthFrequency(null), 300);

      onAddLog({
        id: `synth-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'success',
        module: 'GAME',
        message: `Audio synthesizer triggered at frequency ${freq}Hz. Signal clean.`,
      });
    } catch (e) {
      console.warn('Audio context was blocked or not supported yet.', e);
    }
  };

  // Mini Hacking Game logic
  const startHackInfiltration = () => {
    setHackStage('scanning');
    setMatrixLog(['SCANNING FIREWALL ADAPTER...', 'BYPASS PROTOCOL LOADED...']);
    
    // Generate a random high-tech target hex sequence
    const possibleChars = 'ABCDEF0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    setHackCode(code);
    setUserInputCode('');

    setTimeout(() => {
      setHackStage('hacking');
      setMatrixLog((prev) => [...prev, `TARGET CHANNELS FOUND: ${code}`, 'ENTER RAW INFILTRATION CHIPS KEY:']);
    }, 1500);
  };

  const submitHackingForm = (e: FormEvent) => {
    e.preventDefault();
    if (userInputCode.toUpperCase() === hackCode) {
      setHackStage('success');
      setMatrixLog((prev) => [...prev, '>> KEY ACCEPTED. COMPILER OVERRIDE COMPLETE. SYSTEM UNLOCKED!']);
      onAddLog({
        id: `hack-win-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'success',
        module: 'GAME',
        message: 'Decryption sandbox complete. Firewall breached successfully.',
      });
    } else {
      setHackStage('failed');
      setMatrixLog((prev) => [...prev, '>> !! WRONG KEY SECURITY BACKLASH ENABLED !! LOCKUP INDUCED.']);
      onAddLog({
        id: `hack-fail-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        type: 'error',
        module: 'GAME',
        message: 'Security intrusion attempt denied by sandbox kernel.',
      });
    }
  };

  return (
    <div id="game-subdomain-wrapper" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar: Indie Games collection */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <Gamepad2 className="w-5 h-5" />
          <h2 className="font-sans text-sm font-bold uppercase tracking-wider">
            Game Projects
          </h2>
        </div>
        
        <div className="space-y-3.5">
          {GAME_PROJECTS.map((game) => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                selectedGame.id === game.id
                  ? 'bg-emerald-500/10 border-emerald-500 glow-border-green/20'
                  : 'bg-zinc-900/40 border-zinc-900 hover:border-zinc-800'
              }`}
            >
              <div className="flex justify-between items-start mb-1.5">
                <h3 className="font-sans text-sm font-semibold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  {game.title}
                </h3>
                <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded font-medium border ${
                  game.status === 'released'
                    ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400'
                    : game.status === 'in-development'
                    ? 'bg-amber-950/40 border-amber-500/20 text-amber-500'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                }`}>
                  {game.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-normal line-clamp-2">
                {game.description}
              </p>
              
              <div className="mt-3.5 flex items-center justify-between font-mono text-[9px] text-zinc-400">
                <span>{game.genre}</span>
                <span className="text-zinc-600">{game.engine}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic game detail panel */}
        <div className="bg-zinc-900/20 border border-zinc-900 p-4 rounded-lg mt-2">
          <div className="flex items-center gap-1.5 mb-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <h4 className="font-mono text-xs font-semibold text-zinc-400 uppercase tracking-widest">
              Engine Highlights
            </h4>
          </div>
          <ul className="text-xs text-zinc-500 space-y-1.5 pl-4 list-disc marker:text-emerald-500/60 font-mono">
            {selectedGame.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Sandbox Showcase Area */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Module 1: Web Audio Synth Deck */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-sans text-sm font-bold text-white tracking-wider uppercase">
                  SYNAP_SOUND // Audio Synth Operator
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Press nodes to generate and inject low-frequency subtractive audio signals directly into the sandbox.
              </p>
            </div>
            {synthFrequency && (
              <div className="font-mono text-xs text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20 animate-pulse">
                {synthFrequency} Hz
              </div>
            )}
          </div>

          {/* Synth Matrix Keys Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-3">
            {[
              { label: 'C4', freq: 261.63 },
              { label: 'D4', freq: 293.66 },
              { label: 'E4', freq: 329.63 },
              { label: 'F4', freq: 349.23 },
              { label: 'G4', freq: 392.00 },
              { label: 'A4', freq: 440.00 },
              { label: 'B4', freq: 493.88 },
              { label: 'C5', freq: 523.25 },
              { label: 'D5', freq: 587.33 },
              { label: 'E5', freq: 659.25 },
              { label: 'F5', freq: 698.46 },
              { label: 'G5', freq: 783.99 },
              { label: 'A5', freq: 880.00 },
              { label: 'B5', freq: 987.77 },
              { label: 'C6', freq: 1046.50 },
              { label: 'D6', freq: 1174.66 },
            ].map((node) => (
              <button
                key={node.label}
                onClick={() => triggerSynthSound(node.freq)}
                className={`py-3.5 px-2 rounded font-mono text-[11px] font-semibold border transition-all duration-200 cursor-pointer ${
                  synthFrequency === node.freq
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-md transform scale-95'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800/80 hover:text-emerald-400 hover:border-emerald-500/40'
                }`}
              >
                {node.label}
              </button>
            ))}
          </div>
          <div className="text-[10px] text-zinc-500 font-mono flex items-center justify-between">
            <span>// AUDIO OSCILLATOR: TRIANGLE CORE WAVEFORM</span>
            <span className="text-zinc-600">POLYPHONIC SINGLE-SESSION FEEDBACK</span>
          </div>
        </div>

        {/* Module 2: High Tech Terminal Hacking Game */}
        <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-5 relative overflow-hidden flex-1 flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-900/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h3 className="font-sans text-sm font-bold text-white tracking-wider uppercase">
                NULL-BYTE // Interactive Decrypt Hack
              </h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Attempt decryption protocols to override RaMulab security firewalls. Bypass quantum key configurations.
            </p>
          </div>

          {/* Interactive Hacking Screen */}
          <div className="bg-zinc-950 border border-zinc-900 rounded p-4 font-mono text-xs flex-1 min-h-[140px] flex flex-col justify-between">
            {hackStage === 'idle' && (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <p className="text-zinc-500 mb-4 font-mono text-[11px] max-w-sm">
                  SECURITY SECURE HANDSHAKE INTERCEPTED. FIREWALL DECRYPTER IS STANDING BY.
                </p>
                <button
                  onClick={startHackInfiltration}
                  className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black font-semibold border border-emerald-500/20 hover:border-emerald-400 rounded text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  INITIATE BRUTE SYSTEM HANDSHAKE
                </button>
              </div>
            )}

            {hackStage === 'scanning' && (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin mb-3" />
                <div className="text-emerald-400 text-xs animate-pulse font-mono">
                  SCANNING SYSTEM SECTORS... Bypassing Node-V12...
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-1 w-full max-w-xs truncate">
                  {matrixLog[matrixLog.length - 1]}
                </div>
              </div>
            )}

            {(hackStage === 'hacking' || hackStage === 'success' || hackStage === 'failed') && (
              <div className="flex flex-col justify-between h-full gap-3">
                <div className="bg-zinc-950/60 p-3.5 border border-zinc-900 rounded max-h-[100px] overflow-y-auto space-y-1 text-[11px] text-zinc-400">
                  {matrixLog.map((log, index) => (
                    <div key={index} className={log.includes('WRONG') ? 'text-rose-400' : log.includes('ACCEPTED') ? 'text-emerald-400' : 'text-zinc-400'}>
                      {log}
                    </div>
                  ))}
                </div>

                {hackStage === 'hacking' && (
                  <form onSubmit={submitHackingForm} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={4}
                      value={userInputCode}
                      onChange={(e) => setUserInputCode(e.target.value)}
                      placeholder="ENTER 4-HEX KEY (e.g. F2B0)"
                      className="bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-white font-mono text-xs w-full placeholder-zinc-700 focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/20 hover:border-emerald-400 rounded transition-all transition-colors cursor-pointer"
                    >
                      SUBMIT
                    </button>
                  </form>
                )}

                {hackStage === 'success' && (
                  <div className="flex items-center justify-between bg-emerald-950/30 border border-emerald-500/20 p-2.5 rounded">
                    <div className="text-emerald-400 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 animate-bounce" />
                      <span>DECRYPTION INTEGRATED. ACCESS UNLOCKED.</span>
                    </div>
                    <button
                      onClick={() => setHackStage('idle')}
                      className="text-[10px] uppercase font-semibold text-zinc-400 hover:text-white"
                    >
                      RESET
                    </button>
                  </div>
                )}

                {hackStage === 'failed' && (
                  <div className="flex items-center justify-between bg-rose-950/30 border border-rose-500/20 p-2.5 rounded">
                    <span className="text-rose-400">ACCESS COMPROMISED. SYSTEMS DRIFT LOCKED.</span>
                    <button
                      onClick={() => setHackStage('idle')}
                      className="text-[10px] font-semibold text-white bg-rose-900/30 border border-rose-700/50 hover:bg-rose-900/50 hover:border-rose-500 px-2 py-1 rounded"
                    >
                      RETRY BYPASS
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
