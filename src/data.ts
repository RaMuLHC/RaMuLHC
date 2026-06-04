import { ProjectType, GameProjectType, VelkoraLogType, LabLog } from './types';

export const CORE_PROFILE = {
  name: 'RaMulab',
  tagline: 'Experimental Digital Synthesis & Interactive Interstellar Lore',
  alias: 'Lead Alchemist / Core Architect',
  location: 'Grid Quadrant 7, Neo-Taipei',
  bio: 'Designing elite web frameworks, retro-futuristic synth setups, and cyber-spatial interactions. Crafting experimental gateways and digital artifacts.',
  status: 'ONLINE',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
};

export const SUBDOMAINS = [
  {
    id: 'game',
    title: 'game.ramulab',
    badge: 'INTERACTIVE PLAYGROUND',
    description: 'Houses a refined selection of gaming ecosystems, interactive simulations, and private social spaces.',
    status: 'ACTIVE',
    metric: '4 Prototypes',
    color: 'from-emerald-500/10 to-teal-500/10 hover:border-emerald-400',
    borderColor: 'border-emerald-500/20',
    textColor: 'text-emerald-400',
    glowColor: 'glow-green',
  },
  {
    id: 'work',
    title: 'work.ramulab',
    badge: 'TECHNICAL ARTIFACTS',
    description: 'Showcases a deliberate fusion of precise software development, structured technical design, and professional expertise.',
    status: 'OPERATIONAL',
    metric: '12 Repositories',
    color: 'from-cyan-500/10 to-blue-500/10 hover:border-cyan-400',
    borderColor: 'border-cyan-500/20',
    textColor: 'text-cyan-400',
    glowColor: 'glow-cyan',
  },
  {
    id: 'velkora',
    title: 'project.ramulab',
    badge: 'VOID CHRONICLES',
    description: 'Serves as a blank canvas for unrestricted creative concepts, meticulous world architecture, and deep-dive design logic.',
    status: 'STABLE',
    metric: 'Sector Decoded',
    color: 'from-purple-500/10 to-fuchsia-500/10 hover:border-purple-400',
    borderColor: 'border-purple-500/20',
    textColor: 'text-purple-400',
    glowColor: 'glow-purple',
  }
];

export const GAME_PROJECTS: GameProjectType[] = [
  {
    id: 'hack-01',
    title: 'GridRunner: Overdrive',
    genre: 'Cyberpunk Retro Arcade',
    description: 'A neon-soaked grid evasion game with synthetic sound waves and ultra-fast physics loops.',
    engine: 'Canvas2D / Custom Audio Synth',
    status: 'prototype',
    features: ['Retro synthwave audio loops', 'Instant velocity modulation', 'State-saving terminal ranking'],
  },
  {
    id: 'sci-02',
    title: 'Atmosphere Scanner',
    genre: 'Interactive Simulation',
    description: 'Perform orbital spectral scans of extraterrestrial objects in the Velkora galaxy. Discover anomalies.',
    engine: 'WebGL / Tailwind',
    status: 'in-development',
    features: ['Real-time wavelength spectrum charts', 'Procedural planetary generation', 'Lore integration'],
  },
  {
    id: 'card-03',
    title: 'Null-Byte: Hacking Sandbox',
    genre: 'Puzzle Terminal Simulation',
    description: 'Simulated UNIX hacking toolkit where you decrypt firewall nodes to bypass lab security protocols.',
    engine: 'React TS State Machine',
    status: 'released',
    features: ['Terminal command parsing', 'Matrix stream graphics', 'Procedural decrypt nodes'],
  }
];

export const WORK_PROJECTS: ProjectType[] = [
  {
    id: 'sys-01',
    title: 'AetherDB client wrapper',
    category: 'Database / System',
    description: 'A light-weight, highly-optimized abstraction layer for distributed databases featuring zero-latency reactive caches.',
    techStack: ['TypeScript', 'Rust (WASM)', 'gRPC'],
    status: 'operational',
    year: '2025',
    metric: '2.4M npm dl',
  },
  {
    id: 'sys-02',
    title: 'HoloGrid visualizer engine',
    category: 'UI / Library',
    description: 'A ultra-low latency canvas network engine that renders structural dependency trees with high physical interactivity.',
    techStack: ['D3.js', 'Vite', 'HTML5 Canvas'],
    status: 'experimental',
    year: '2026',
    metric: '98 fps render',
  },
  {
    id: 'sys-03',
    title: 'Subdomain Sync Gateway',
    category: 'DevOps / Cloud',
    description: 'Custom proxy layer resolving regional subdomains (`game`, `work`, `velkora`) to dynamic client bundles via intelligent edge routing.',
    techStack: ['Node.js', 'Cloudflare Workers', 'DNSSEC'],
    status: 'operational',
    year: '2026',
    metric: '0.8ms overhead',
  },
  {
    id: 'sys-04',
    title: 'Synthetic Synth Kit',
    category: 'Audio Framework',
    description: 'Subtractive audio synthesizer library built completely on the Web Audio API for responsive low-latency web game sounds.',
    techStack: ['Web Audio API', 'TypeScript'],
    status: 'classified',
    year: '2026',
    metric: '8 Oscillators',
  }
];

export const VELKORA_LOGS: VelkoraLogType[] = [
  {
    id: 'velkora-log-01',
    sector: 'Sector Lambda-9',
    designation: 'L9-OBS-938',
    timestamp: 'STARDATE 3089.12',
    classification: 'RESTRICTED',
    title: 'The Obelisk Signal Decryption',
    summary: 'A sub-harmonic pulse detected from deep within the core of Sector Lambda-9 has been successfully decrypted.',
    content: 'Atmospheric pressure decreased by 12% during interception. Decryption result displays coordinates linking directly to our core gateway. The signature is mathematically identical to a custom-compiled modern React binary format containing binary state arrays. Potential synthetic origin node confirmed.',
    coordinates: '109.82°W / 45.18°N'
  },
  {
    id: 'velkora-log-02',
    sector: 'Aerosol Grid 14',
    designation: 'AG14-TEMP-04',
    timestamp: 'STARDATE 3091.03',
    classification: 'UNRESTRICTED',
    title: 'Crystalline Flora Mutation',
    summary: 'Observations on the silica-based botanical mutations undergoing ambient ionization in grid quadrant 14.',
    content: 'Silica plants are absorbing trace purple amethyst wavelengths. Growth speed rises by 400% under cybernetic frequency stimulation. Highly potential source for advanced organic cooling units required in bio-quantum compute chips at RaMulab.',
    coordinates: '213.04°E / 05.12°S'
  },
  {
    id: 'velkora-log-03',
    sector: 'Unknown Space Void',
    designation: 'USV-NULL-00',
    timestamp: 'STARDATE 3094.01',
    classification: 'CONFIDENTIAL',
    title: 'Gravitational Singularity Drift',
    summary: 'A micro black hole showing cyclical stability drifting near the orbit of Velkora-III.',
    content: 'Radiation scanning reveals harmonic musical tones matching F# Minor scale. No debris is pulled in; instead, the singularity emits encrypted hexadecimal packages containing high-performance system metrics. Initiating deep diagnostic proxy probe.',
    coordinates: '000.00° / NULL.NULL'
  }
];

export const LAB_LOGS: LabLog[] = [
  {
    id: 'log-1',
    timestamp: '23:21:56',
    type: 'info',
    module: 'CORE',
    message: 'Hypertext firewall initialized. Secure gateway handshake complete.',
  },
  {
    id: 'log-2',
    timestamp: '23:22:01',
    type: 'success',
    module: 'WORK',
    message: 'Repositories synchronized with remote master. 12 operational branches loaded.',
  },
  {
    id: 'log-3',
    timestamp: '23:22:15',
    type: 'info',
    module: 'GAME',
    message: 'Web Audio synthesizer engine compiled successfully. Audio nodes: Hot-swappable.',
  },
  {
    id: 'log-4',
    timestamp: '23:22:30',
    type: 'warn',
    module: 'VELKORA',
    message: 'Sector Lambda-9 is emitting micro-harmonic anomalies. Diagnostic scanner listening.',
  }
];
