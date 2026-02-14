
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Zap, 
  Eye, 
  User, 
  Settings, 
  Download, 
  Menu, 
  X,
  Clock,
  ChevronRight,
  Play,
  Github,
  Terminal,
  Activity,
  Lock,
  Ghost,
  ExternalLink
} from 'lucide-react';

// --- Components ---
const YoutubeEmbed = ({ embedId }: { embedId: string }) => (
  <div className="video-responsive relative aspect-video w-full">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      title="Embedded youtube"
      className="rounded-2xl"
    />
  </div>
);

interface ModuleCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  modules: { name: string; desc: string }[];
}

const CATEGORIES: ModuleCategory[] = [
  {
    id: 'combat',
    name: 'Combat',
    icon: <Shield />,
    color: 'text-red-500',
    modules: [
      { name: 'KillAura', desc: 'Attack entities around you automatically with advanced rotations.' },
      { name: 'Velocity', desc: 'Reduce or eliminate knockback from attacks and projectiles.' },
      { name: 'AimAssist', desc: 'Subtly help your aim lock onto targets for a legit feel.' },
      { name: 'Reach', desc: 'Extend your hitting distance by up to 6 blocks.' },
    ]
  },
  {
    id: 'movement',
    name: 'Movement',
    icon: <Zap />,
    color: 'text-blue-500',
    modules: [
      { name: 'Flight', desc: 'Defy gravity and fly through the air on any server.' },
      { name: 'Speed', desc: 'Move faster than normally possible with various bypasses.' },
      { name: 'Spider', desc: 'Climb up walls like a spider.' },
      { name: 'NoFall', desc: 'Take zero fall damage from any height.' },
    ]
  },
  {
    id: 'visuals',
    name: 'Visuals',
    icon: <Eye />,
    color: 'text-green-500',
    modules: [
      { name: 'PlayerESP', desc: 'See players through walls with high-detail boxes.' },
      { name: 'StorageESP', desc: 'Locate chests, furnaces, and hoppers easily.' },
      { name: 'Chams', desc: 'Render entities with custom colors and materials.' },
      { name: 'FullBright', desc: 'Illuminate the world as if it were mid-day.' },
    ]
  },
  {
    id: 'player',
    name: 'Player',
    icon: <User />,
    color: 'text-yellow-500',
    modules: [
      { name: 'Scaffold', desc: 'Automatically place blocks under you as you walk.' },
      { name: 'AutoEat', desc: 'Eat food when your hunger bar is low automatically.' },
      { name: 'InvManager', desc: 'Clean your inventory of junk and sort items.' },
      { name: 'ChestStealer', desc: 'Loot chests instantly upon opening them.' },
    ]
  }
];

const ModuleExplorer = () => {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0]);

  return (
    <div className="glass rounded-[2rem] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
      <div className="w-full md:w-64 border-r border-white/5 bg-white/5 p-6 space-y-2">
        <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Categories</h4>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeCat.id === cat.id ? 'bg-amber-500 text-black font-bold shadow-lg' : 'hover:bg-white/5 text-gray-400'}`}
          >
            {/* Fix: casting to React.ReactElement<any> to resolve className prop injection error on unknown type */}
            {React.isValidElement(cat.icon) ? React.cloneElement(cat.icon as React.ReactElement<any>, { className: 'w-5 h-5' }) : cat.icon}
            {cat.name}
          </button>
        ))}
      </div>
      <div className="flex-1 p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-3 rounded-2xl bg-white/5 ${activeCat.color}`}>
            {/* Fix: casting to React.ReactElement<any> to resolve className prop injection error on unknown type */}
            {React.isValidElement(activeCat.icon) ? React.cloneElement(activeCat.icon as React.ReactElement<any>, { className: 'w-8 h-8' }) : activeCat.icon}
          </div>
          <div>
            <h3 className="text-3xl font-black">{activeCat.name}</h3>
            <p className="text-gray-500">Showing {activeCat.modules.length} advanced modules</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeCat.modules.map(mod => (
            <div key={mod.name} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
              <h5 className="font-bold text-lg mb-2 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {mod.name}
              </h5>
              <p className="text-gray-400 text-sm leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TerminalLog = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messages = ["[SYSTEM] Initializing HourClient v2.5...", "[AUTH] Validating session key...", "[MODULE] Combat engine online.", "[MODULE] Movement bypasses loaded.", "[HWID] Hardware ID verified.", "[INFO] Connected to secure backbone.", "[STATUS] Ready for deployment."];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLogs(prev => [...prev, messages[i]]);
        i++;
      } else clearInterval(interval);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="bg-black/80 border border-white/10 rounded-lg p-4 font-mono text-[10px] text-amber-500/60 max-h-32 overflow-y-auto w-64 hidden xl:block fixed bottom-8 left-8 z-40 backdrop-blur-sm" ref={logRef}>
      {logs.map((log, idx) => (
        <div key={idx} className="mb-1 animate-pulse">
          <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
          {log}
        </div>
      ))}
    </div>
  );
};

const Navbar = ({ ghostMode, toggleGhost }: { ghostMode: boolean, toggleGhost: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className={`p-1.5 rounded-lg transition-colors ${ghostMode ? 'bg-amber-500' : 'bg-white/10 group-hover:bg-amber-500'}`}>
            <Clock className={`w-6 h-6 transition-colors ${ghostMode ? 'text-black' : 'text-white group-hover:text-black'}`} strokeWidth={3} />
          </div>
          <span className="text-2xl font-black tracking-tighter glitch-text" data-text="HOURCLIENT">HOUR<span className="text-amber-500">CLIENT</span></span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8">
            {['Showcase', 'Modules', 'Interface', 'Download'].map((name) => (
              <a key={name} href={`#${name.toLowerCase()}`} className="text-gray-400 hover:text-amber-400 font-bold text-sm uppercase tracking-widest transition-colors">
                {name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleGhost} className={`p-2 rounded-lg border transition-all ${ghostMode ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}>
              <Ghost className="w-5 h-5" />
            </button>
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-xl font-black text-sm transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-500/20 flex items-center gap-2">
              <Download className="w-4 h-4" /> GET ACCESS
            </button>
          </div>
        </div>
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 py-10 px-6 space-y-6">
          {['Showcase', 'Modules', 'Interface', 'Download'].map((name) => (
            <a key={name} href={`#${name.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-black text-gray-300 hover:text-amber-400 uppercase tracking-tighter">
              {name}
            </a>
          ))}
          <button className="w-full bg-amber-500 text-black py-4 rounded-xl font-black flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> DOWNLOAD CLIENT
          </button>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  const [ghostMode, setGhostMode] = useState(false);
  const toggleGhost = () => {
    setGhostMode(!ghostMode);
    document.body.classList.toggle('ghost-mode');
  };

  return (
    <div className="min-h-screen selection:bg-amber-500 selection:text-black">
      <Navbar ghostMode={ghostMode} toggleGhost={toggleGhost} />
      <TerminalLog />
      <section className="relative pt-40 pb-24 md:pt-60 md:pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl aspect-square bg-amber-500/10 blur-[160px] rounded-full -z-10 animate-pulse" />
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-2xl text-amber-500 text-xs font-black tracking-widest mb-10 backdrop-blur-md">
            <Activity className="w-4 h-4 animate-pulse" /> STATUS: UNDETECTED
          </div>
          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter mb-8 leading-[0.85] uppercase">
            UNLEASH THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-white to-amber-700 italic">ANOMALY.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-2xl mb-12 leading-relaxed font-light">
            HourClient is the next generation of utility software. Crafted for performance, built for anonymity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#download" className="group w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black text-xl font-black px-12 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:scale-105">
              GET ACCESS <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#showcase" className="w-full sm:w-auto glass hover:bg-white/5 text-white text-xl font-bold px-12 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all">
              <Play className="w-5 h-5 fill-current text-amber-500" /> WATCH TRAILER
            </a>
          </div>
        </div>
      </section>

      <section id="showcase" className="py-32 bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-20 text-center">
            <div className="w-12 h-1 bg-amber-500 mb-6 rounded-full" />
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Live Showcase</h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <YoutubeEmbed embedId="LTV5hgBO34Y" />
          </div>
        </div>
      </section>

      <section id="gui" className="py-32 bg-gradient-to-b from-black to-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 order-2 lg:order-1 relative">
              <div className="glass p-3 rounded-[3rem] shadow-2xl">
                <img src="https://i.ibb.co/L5hY5m8/image.png" alt="GUI" className="rounded-[2.5rem] w-full" />
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 space-y-10">
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                A BEAUTIFUL <br /> <span className="text-amber-500 italic">INTERFACE.</span>
              </h2>
              <p className="text-gray-400 text-xl font-light">Complexity made simple. Manage every aspect of your gameplay without interrupting the flow.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="modules" className="py-32 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">Module Explorer</h2>
          </div>
          <ModuleExplorer />
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="container mx-auto px-6 text-center text-gray-600 text-[10px] uppercase tracking-[0.4em]">
          <span>&copy; {new Date().getFullYear()} HourClient Team. NOT AN OFFICIAL MINECRAFT PRODUCT.</span>
        </div>
      </footer>
    </div>
  );
}
