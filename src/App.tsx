import { useState, useEffect } from 'react';
import { SubdomainType, LabLog } from './types';
import { CORE_PROFILE, SUBDOMAINS, LAB_LOGS } from './data';
import GameSubdomain from './components/GameSubdomain';
import WorkSubdomain from './components/WorkSubdomain';
import VelkoraSubdomain from './components/VelkoraSubdomain';

import { 
  Dna, 
  Gamepad2, 
  Laptop, 
  Folder, 
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Palette,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type FontPresetType = 'impressionist' | 'gallery' | 'alchemist';

// Simplified non-localized properties
const LAB_STRINGS = {
  quote: '"It\'s dangerous to go alone! Take this." — The Legend of Zelda （1986）',
  theme: 'STYLE',
  statusChecking: 'Checking...',
  statusOnline: 'Status: Online',
  statusOffline: 'Status: Offline',
  enterSubdomain: 'ENTER SUBDOMAIN',
};

const THEME_STYLES = {
  dark: {
    bgClass: 'bg-[#081215]',
    gridClass: 'art-monet-grid opacity-100',
    decorBlob1: 'bg-purple-900/10',
    decorBlob2: 'bg-teal-900/10',
    panelBg: 'bg-zinc-950/75 border-teal-900/25 text-zinc-300',
    portalBorder: 'border-teal-500/15 bg-zinc-950/40 hover:bg-zinc-950/60',
    portalGlow: 'from-teal-600/5 via-purple-950/2 to-teal-950/2',
    accentBorder: 'border-teal-500/20 group-hover:border-purple-400/45',
    textColor: 'text-teal-300',
    textWhite: 'text-white',
    textBody: 'text-zinc-400',
    textMuted: 'text-zinc-500',
    btnActive: 'bg-teal-500/10 text-teal-300 border-teal-500/20',
    settingsBg: 'bg-zinc-950/90 border-zinc-900/80 text-zinc-300',
    subportBorder: 'border-zinc-800',
    themeText: 'text-zinc-100',
  },
  light: {
    bgClass: 'bg-[#f4f7f6]',
    gridClass: 'art-monet-grid opacity-50',
    decorBlob1: 'bg-purple-300/20',
    decorBlob2: 'bg-teal-300/15',
    panelBg: 'bg-white/85 border-teal-200/80 text-zinc-800 shadow-md shadow-zinc-200/50',
    portalBorder: 'border-teal-200/80 bg-white/70 hover:bg-white/90 shadow-sm',
    portalGlow: 'from-teal-105/10 via-purple-50/5 to-teal-50/5',
    accentBorder: 'border-teal-200 group-hover:border-purple-300',
    textColor: 'text-teal-700',
    textWhite: 'text-zinc-900 font-bold',
    textBody: 'text-zinc-650',
    textMuted: 'text-zinc-400',
    btnActive: 'bg-teal-600/10 text-teal-850 border border-teal-500/30',
    settingsBg: 'bg-white/95 border-zinc-200/80 text-zinc-800 shadow-lg',
    subportBorder: 'border-zinc-200',
    themeText: 'text-zinc-800',
  }
};

function TypewriterTagline({ theme }: { theme: 'dark' | 'light' }) {
  const phrases = [
    "嗨，我是 RaMu。恭喜你找到了隱藏關卡。",
    "Hi, I'm RaMu. Congratulations on finding the secret level.",
    "こんにちは、RaMuです。秘密のステージを見つけておめでとうございます。",
    "Bonjour, je suis RaMu. Félicitations pour avoir trouvé le niveau secret.",
    "Hallo, ich bin RaMu. Glückwunsch zum Finden des geheimen Levels.",
    "Ciao, sono RaMu. Congratulazioni per aver trovato il livello segreto.",
    "안녕하세요, RaMu입니다. 비밀 레벨을 찾으신 것을 축하드립니다.",
    "Hola, soy RaMu. Felicidades por encontrar el nivel secreto.",
    "Olá, eu sou RaMu. Parabéns por encontrar o nível secreto.",
    "Привет, я RaMu. Поздравляю с нахождением секретного уровня."
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    let timer: any;
    const fullText = phrases[phraseIndex];

    if (!isDeleting) {
      if (currentText !== fullText) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
          setTypingSpeed(60 + Math.random() * 40);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
          setTypingSpeed(30);
        }, 5000);
      }
    } else {
      if (currentText !== "") {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, typingSpeed);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setTypingSpeed(80);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <p className={`text-center max-w-xl mx-auto font-space-grotesk font-extrabold text-[11px] sm:text-xs md:text-sm tracking-widest uppercase h-12 flex items-center justify-center select-none ${
      theme === 'dark' ? 'text-teal-300' : 'text-teal-700'
    }`}>
      <span className="inline-block relative">
        {currentText}
        <span className="typewriter-cursor w-[2px] h-[1em] ml-1 bg-teal-400 dark:bg-teal-300 inline-block align-middle" />
      </span>
    </p>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState<SubdomainType>('portal');
  const [logs, setLogs] = useState<LabLog[]>(LAB_LOGS);
  
  // Subdomain Online checker status state with LocalStorage caching & TTL check (5 mins)
  const [subdomainStatuses, setSubdomainStatuses] = useState<Record<string, 'checking' | 'online' | 'offline'>>(() => {
    try {
      const cached = localStorage.getItem('ramulab_subdomain_statuses_cache');
      const timeStr = localStorage.getItem('ramulab_subdomain_statuses_time');
      if (cached && timeStr) {
        const timestamp = parseInt(timeStr, 10);
        // Reuse cache if valid (5 minutes TTL = 300000ms) to prevent slamming servers on page loads
        if (Date.now() - timestamp < 300000) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === 'object' && parsed.game && parsed.work && parsed.velkora) {
            return parsed;
          }
        }
      }
    } catch (e) {
      // Ignored: Fall back to default checking state
    }
    return {
      game: 'checking',
      work: 'checking',
      velkora: 'checking'
    };
  });

  // Track auto-poll count in current session to prevent infinite background load
  const [totalPollCount, setTotalPollCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Light / Dark preference state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Easter egg timer logic for style selector hover
  const [hoverTimerId, setHoverTimerId] = useState<any>(null);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  // Core status checking function with protection parameters
  const runSecureProbes = async (force: boolean = false) => {
    const urls: Record<string, string> = {
      game: 'https://game.ramulab.com',
      work: 'https://work.ramulab.com',
      velkora: 'https://project.ramulab.com'
    };

    // Cache verification
    if (!force) {
      try {
        const timeStr = localStorage.getItem('ramulab_subdomain_statuses_time');
        const cached = localStorage.getItem('ramulab_subdomain_statuses_cache');
        if (timeStr && cached) {
          const timestamp = parseInt(timeStr, 10);
          if (Date.now() - timestamp < 300000) {
            // Cache is still fresh, do not fetch
            return;
          }
        }
      } catch (e) { /* ignored */ }
    }

    setIsRefreshing(true);
    
    // Set status to checking if force or cache expired
    setSubdomainStatuses(prev => {
      const updated = { ...prev };
      Object.keys(urls).forEach(id => {
        updated[id] = 'checking';
      });
      return updated;
    });

    const results: Record<string, 'checking' | 'online' | 'offline'> = {};

    // Check each subdomain sequentially with 500ms delay to spread load (Anti-burst protection)
    const keys = Object.keys(urls);
    for (let i = 0; i < keys.length; i++) {
      const id = keys[i];
      const url = urls[id];

      // Wait 500ms before each subsequent probe to prevent concurrent spikes
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500); // Fail fast (3.5s timeout)
        
        await fetch(url, { mode: 'no-cors', cache: 'no-cache', signal: controller.signal });
        clearTimeout(timeoutId);
        results[id] = 'online';
      } catch (err) {
        results[id] = 'offline';
      }
    }

    // Update state and persistent cache
    setSubdomainStatuses(results);
    setIsRefreshing(false);

    try {
      localStorage.setItem('ramulab_subdomain_statuses_cache', JSON.stringify(results));
      localStorage.setItem('ramulab_subdomain_statuses_time', Date.now().toString());
    } catch (e) { /* ignored */ }
  };

  // Safe orchestrator for status checks
  useEffect(() => {
    // Initial load: probe subdomains (if cache is absent or expired)
    runSecureProbes(false);

    let intervalId: any = null;

    const setupPolling = () => {
      // Setup dynamic poll with Jitter: base 180 seconds (3 mins) + random 0-15s
      const baseInterval = 180000;
      const jitter = Math.floor(Math.random() * 15000);
      const delay = baseInterval + jitter;

      intervalId = setInterval(() => {
        // Session Cap: Prevent background loops from going forever. Cap at 6 checks (~18 mins).
        setTotalPollCount(prevCount => {
          const nextCount = prevCount + 1;
          if (nextCount > 6) {
            if (intervalId) clearInterval(intervalId);
            return prevCount;
          }
          // Perform probe if page is active/visible
          if (!document.hidden) {
            runSecureProbes(false);
          }
          return nextCount;
        });
      }, delay);
    };

    // Watch visibility to pause background activities completely
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab hidden: cancel any scheduled runs immediately to save CPU/Network loads
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      } else {
        // Tab returned to active view: check instantly if cache expired, and resume polling
        runSecureProbes(false);
        if (!intervalId) {
          setupPolling();
        }
      }
    };

    // Initialize regular polling on launch
    setupPolling();

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleStyleMouseEnter = () => {
    const timer = setTimeout(() => {
      setShowEasterEgg(true);
    }, 5000);
    setHoverTimerId(timer);
  };

  const handleStyleMouseLeave = () => {
    if (hoverTimerId) {
      clearTimeout(hoverTimerId);
      setHoverTimerId(null);
    }
    setShowEasterEgg(false);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerId) clearTimeout(hoverTimerId);
    };
  }, [hoverTimerId]);

  const handleAddLog = (newLog: LabLog) => {
    setLogs((prev) => [...prev, newLog]);
  };

  const setView = (view: SubdomainType) => {
    setActiveView(view);
  };

  const tStyle = THEME_STYLES[theme];

  return (
    <div 
      id="ramulab-app-viewport" 
      className={`min-h-screen ${tStyle.bgClass} ${tStyle.themeText} font-sans relative overflow-x-hidden transition-all duration-1000 flex flex-col justify-between`}
    >
      
      {/* Immersive background grids based on Monet Style */}
      <div className={`absolute inset-0 ${tStyle.gridClass} transition-all duration-1000 pointer-events-none`} />
      <div className="absolute inset-0 lab-scanline opacity-[0.015] pointer-events-none" />
      
      {/* Monet's Deep Lily Pond Soft Glow shapes */}
      <div className={`absolute top-[20%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[35rem] ${tStyle.decorBlob1} rounded-full blur-[10rem] pointer-events-none transition-all duration-1000`} />
      <div className={`absolute bottom-[10%] left-[50%] -translate-x-1/2 w-[35rem] h-[35rem] ${tStyle.decorBlob2} rounded-full blur-[9rem] pointer-events-none transition-all duration-1000`} />

      {/* TOP HEADER WITH SETTINGS CONFIGURATOR */}
      <header className="absolute top-6 left-6 right-6 z-50 flex flex-col sm:flex-row items-center justify-end gap-5 pointer-events-auto">

        {/* Dynamic Multi-Version Preferences Panel (themes setting) */}
        <div className={`flex items-center gap-2 p-1.5 rounded-xl border backdrop-blur-md transition-all duration-500 ${tStyle.settingsBg}`}>
          
          {/* Theme/Mode selection Setting with Easter Egg hover detect */}
          <div 
            className="flex items-center gap-1 relative animate-none"
            onMouseEnter={handleStyleMouseEnter}
            onMouseLeave={handleStyleMouseLeave}
          >
            <span className="font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider mr-2 select-none">
              {LAB_STRINGS.theme}:
            </span>
            <button
              onClick={() => setTheme('dark')}
              className={`px-2.5 py-1 rounded-md font-sans text-[9.5px] font-bold transition-all cursor-pointer ${
                theme === 'dark'
                  ? tStyle.btnActive
                  : 'text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-350'
              }`}
            >
              DARK
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`px-2.5 py-1 rounded-md font-sans text-[9.5px] font-bold transition-all cursor-pointer ${
                theme === 'light'
                  ? tStyle.btnActive
                  : 'text-zinc-500 hover:text-zinc-400 dark:hover:text-zinc-350'
              }`}
            >
              LIGHT
            </button>

            {/* Elegant Dickinson Quote Easter Egg */}
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 12, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute right-0 top-full p-3 px-4 rounded-xl border w-64 text-right backdrop-blur-xl z-50 ${
                    theme === 'dark' 
                      ? 'bg-zinc-950/95 border-teal-500/30 text-teal-300 shadow-[0_4px_24px_rgba(20,184,166,0.2)]' 
                      : 'bg-white/95 border-teal-200/90 text-teal-700 shadow-[0_4px_24px_rgba(13,148,136,0.15)]'
                  }`}
                >
                  <p className="font-serif italic text-xs tracking-wide leading-relaxed text-left">
                    "Had I not seen the Sun, I could have borne the shade."
                  </p>
                  <p className="font-mono text-[8px] text-zinc-500 mt-1.5 uppercase tracking-widest text-right">
                    — Emily Dickinson
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </header>
      
      {/* Main center workspace portals */}
      <div className="flex-1 flex flex-col justify-center items-center pt-28 pb-12 px-4 md:px-6 relative z-10 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* THE PORTAL (HOME) VIEW - Center-staged, elegant list of subdomains */}
          {activeView === 'portal' && (
            <motion.div
              key="portal-home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full flex flex-col items-center justify-center gap-10 max-w-2xl py-12"
            >
              {/* Center Modernist Gallery Headline */}
              <div className="text-center space-y-4 select-none mt-4">
                <div className="flex justify-center mb-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-md animate-pulse" />
                    <div className={`p-4 rounded-full melting-shroud w-14 h-14 flex items-center justify-center border transition-all ${
                      theme === 'dark' ? 'bg-zinc-950/60 border-teal-950/30' : 'bg-white border-teal-100'
                    }`}>
                      <Dna className="w-6 h-6 text-teal-400 animate-pulse" />
                    </div>
                  </div>
                </div>
                
                {/* Modernist Display Header */}
                <h1 className={`text-4xl md:text-5xl font-black tracking-widest uppercase text-center transition-all duration-500 font-space-grotesk ${
                  theme === 'dark' ? 'text-white' : 'text-zinc-900'
                }`}>
                  {CORE_PROFILE.name}
                </h1>
                
                {/* Specific required customized tagline with typewriter animation */}
                <TypewriterTagline theme={theme} />
              </div>

              {/* DDoS Protection & Manual Refresh Dashboard */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 px-2 text-[10px] sm:text-xs border-y border-teal-500/10 py-3 bg-teal-500/[0.01]">
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    totalPollCount > 6 ? 'bg-amber-500' : 'bg-emerald-500 animate-ping'
                  }`} />
                  <span className={`font-mono uppercase tracking-wider font-semibold select-none ${
                    theme === 'dark' ? 'text-zinc-500' : 'text-zinc-600'
                  }`}>
                    {totalPollCount > 6 ? '🛡️ Protection Active (Idle Saving Mode)' : '🛡️ Live DNS Probes Protected'}
                  </span>
                </div>
                
                <button
                  onClick={() => runSecureProbes(true)}
                  disabled={isRefreshing}
                  className={`flex items-center gap-1.5 font-mono uppercase tracking-widest font-bold transition-all disabled:opacity-50 select-none bg-teal-500/5 hover:bg-teal-500/10 px-3 py-1.5 rounded-lg border border-teal-500/15 cursor-pointer text-teal-400`}
                >
                  <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                  {isRefreshing ? 'PROBING...' : 'FORCE REFRESH'}
                </button>
              </div>

              {/* The Three Center-Staged Glowing Portals (Pointing to public subdomains) */}
              <div className="w-full flex flex-col gap-4">
                {SUBDOMAINS.map((sub) => {
                  let IconComponent = Gamepad2;
                  if (sub.id === 'work') IconComponent = Laptop;
                  if (sub.id === 'velkora') IconComponent = Folder;

                  const statusVal = subdomainStatuses[sub.id];
                  let statusLabel = LAB_STRINGS.statusChecking;
                  let statusBadgeClass = '';

                  if (statusVal === 'online') {
                    statusLabel = LAB_STRINGS.statusOnline;
                    statusBadgeClass = theme === 'dark' 
                      ? 'text-emerald-400 bg-emerald-950/30 border border-emerald-900/40' 
                      : 'text-emerald-700 bg-emerald-50 border border-emerald-200/50';
                  } else if (statusVal === 'offline') {
                    statusLabel = LAB_STRINGS.statusOffline;
                    statusBadgeClass = theme === 'dark' 
                      ? 'text-red-400 bg-red-950/20 border border-red-900/30' 
                      : 'text-red-700 bg-red-50 border border-red-200/40';
                  } else {
                    statusLabel = LAB_STRINGS.statusChecking;
                    statusBadgeClass = theme === 'dark' 
                      ? 'text-amber-400 bg-amber-950/20 border border-amber-900/30 animate-pulse' 
                      : 'text-amber-700 bg-amber-50 border border-amber-200/40';
                  }

                  const urls: Record<string, string> = {
                    game: 'https://game.ramulab.com',
                    work: 'https://work.ramulab.com',
                    velkora: 'https://project.ramulab.com'
                  };

                  return (
                    <a
                      key={sub.id}
                      href={urls[sub.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full border p-5 px-6 rounded-2xl text-left transition-all duration-500 relative group overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer no-underline ${tStyle.portalBorder}`}
                    >
                      {/* Artistic gradient portal hover shine */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${tStyle.portalGlow} opacity-30 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <div className="flex items-start gap-4 z-10 w-full flex-1 md:pr-4">
                        {/* Painted Icon Framer */}
                        <div className={`p-3.5 rounded-xl border transition-colors duration-500 ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-850/70 text-teal-300' : 'bg-white border-teal-100/80 text-teal-700'
                        } group-hover:text-purple-400`}>
                          <IconComponent className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-350" />
                        </div>
                        
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap text-left">
                            <h3 className={`font-space-grotesk font-extrabold text-sm tracking-widest uppercase transition-all duration-500 ${
                              theme === 'dark' ? 'text-white' : 'text-zinc-900'
                            } group-hover:text-teal-400`}>
                              {sub.title}
                            </h3>
                            <span className={`font-mono text-[8.5px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${statusBadgeClass}`}>
                              {statusLabel}
                            </span>
                          </div>
                          
                          <p className={`text-xs font-light leading-relaxed max-w-lg text-left ${tStyle.textBody}`}>
                            {sub.description}
                          </p>
                        </div>
                      </div>

                      {/* Right Indicator Link */}
                      <div className="flex items-center justify-end w-full md:w-auto font-mono text-[9px] text-zinc-500 group-hover:text-teal-400 transition-colors pt-3.5 md:pt-0 border-t md:border-t-0 border-zinc-900/10 dark:border-zinc-800/20 font-bold uppercase tracking-wider z-10 whitespace-nowrap">
                        <span className={`flex items-center gap-1.5 ${theme === 'dark' ? 'group-hover:text-teal-300' : 'group-hover:text-teal-650'}`}>
                          {LAB_STRINGS.enterSubdomain} <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Elegant design footer quote */}
              <div className="text-center space-y-1">
                <p className="font-sans text-[11px] md:text-xs select-none tracking-wider font-medium text-zinc-500 dark:text-zinc-650">
                  {LAB_STRINGS.quote}
                </p>
                <div className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase">
                  &copy; MXXVI RAMULAB LABS // CENTRAL SECURE CHANNELS
                </div>
              </div>
            </motion.div>
          )}

          {/* ACTIVE PORTAL SUBDOMAIN CANVAS */}
          {activeView !== 'portal' && (
            <motion.div
              key="subdomain-canvas"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full space-y-6 py-6"
            >
              {/* Return control block */}
              <div className={`flex justify-between items-center border p-3.5 px-4 rounded-xl backdrop-blur-md ${tStyle.panelBg}`}>
                <button
                  onClick={() => setView('portal')}
                  className="flex items-center gap-2 font-mono text-xs hover:text-teal-600 dark:hover:text-white transition-colors cursor-pointer group uppercase tracking-widest font-bold"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  RETURN TO HOME
                </button>
                <div className={`font-mono text-[9px] px-3 py-1 rounded border font-semibold tracking-wider uppercase ${
                  theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-500'
                }`}>
                  SUBPORT: {activeView === 'velkora' ? 'project' : activeView}.ramulab
                </div>
              </div>

              {/* Subdomain View Component Framework */}
              <div className={`border p-6 rounded-2xl relative overflow-hidden ${tStyle.panelBg} bg-zinc-950/20`}>
                {activeView === 'game' && <GameSubdomain onAddLog={handleAddLog} />}
                {activeView === 'work' && <WorkSubdomain onAddLog={handleAddLog} />}
                {activeView === 'velkora' && <VelkoraSubdomain onAddLog={handleAddLog} />}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
