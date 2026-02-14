
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

// --- Types ---
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

// --- Components ---

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
            {React.cloneElement(cat.icon as React.ReactElement, { className: 'w-5 h-5' })}
            {cat.name}
          </button>
        ))}
      </div>
      <div className="flex-1 p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-3 rounded-2xl bg-white/5 ${activeCat.color}`}>
            {React.cloneElement(activeCat.icon as React.ReactElement, { className: 'w-8 h-8' })}
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
    const messages = [
      "[SYSTEM] Initializing HourClient v2.5...",
      "[AUTH] Validating session key...",
      "[MODULE] Combat engine online.",
      "[MODULE] Movement bypasses loaded.",
      "[HWID] Hardware ID verified.",
      "[INFO] Connected to secure backbone.",
      "[STATUS] Ready for deployment."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLogs(prev => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
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

  const navLinks = [
    { name: 'Showcase', href: '#showcase' },
    { name: 'Modules', href: '#modules' },
    { name: 'Interface', href: '#gui' },
    { name: 'Download', href: '#download' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className={`p-1.5 rounded-lg transition-colors ${ghostMode ? 'bg-amber-500' : 'bg-white/10 group-hover:bg-amber-500'}`}>
            <Clock className={`w-6 h-6 transition-colors ${ghostMode ? 'text-black' : 'text-white group-hover:text-black'}`} strokeWidth={3} />
          </div>
          <span className="text-2xl font-black tracking-tighter glitch-text" data-text="HOURCLIENT">HOUR<span className="text-amber-500">CLIENT</span></span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-400 hover:text-amber-400 font-bold text-sm uppercase tracking-widest transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleGhost}
              className={`p-2 rounded-lg border transition-all ${ghostMode ? 'bg-amber-500/20 border-amber-500 text-amber-500' : 'border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}
              title="Toggle Ghost Mode"
            >
              <Ghost className="w-5 h-5" />
            </button>
            <button className="bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 rounded-xl font-black text-sm transition-all transform hover:-translate-y-1 shadow-lg shadow-amber-500/20 flex items-center gap-2">
              <Download className="w-4 h-4" /> GET ACCESS
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 py-10 px-6 space-y-6 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block text-2xl font-black text-gray-300 hover:text-amber-400 uppercase tracking-tighter">
              {link.name}
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
    <div className={`min-h-screen selection:bg-amber-500 selection:text-black transition-colors duration-700`}>
      <Navbar ghostMode={ghostMode} toggleGhost={toggleGhost} />
      <TerminalLog />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-60 md:pb-40 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl aspect-square bg-amber-500/10 blur-[160px] rounded-full -z-10 animate-pulse" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-2xl text-amber-500 text-xs font-black tracking-widest mb-10 backdrop-blur-md">
            <Activity className="w-4 h-4 animate-pulse" /> STATUS: UNDETECTED ON ALL MAJOR NETWORKS
          </div>
          
          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter mb-8 leading-[0.85] uppercase">
            UNLEASH THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-white to-amber-700 italic">
              ANOMALY.
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-2xl mb-12 leading-relaxed font-light">
            HourClient is the next generation of utility software. 
            Crafted for performance, built for anonymity, and designed to provide absolute control over your environment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#download" className="group w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black text-xl font-black px-12 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_rgba(251,191,36,0.3)] hover:scale-105 active:scale-95">
              GET ACCESS <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#showcase" className="w-full sm:w-auto glass hover:bg-white/5 text-white text-xl font-bold px-12 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:border-white/20">
              <Play className="w-5 h-5 fill-current text-amber-500" /> WATCH TRAILER
            </a>
          </div>

          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-40">
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-black text-white">150+</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Modules</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-black text-white">0%</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Ban Rate</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-black text-white">4.9/5</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Rating</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-black text-white">24/7</span>
              <span className="text-[10px] uppercase tracking-widest font-bold">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section id="showcase" className="py-32 relative bg-[#080808]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-20 text-center">
            <div className="w-12 h-1 bg-amber-500 mb-6 rounded-full" />
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tighter">Live Combat Footage</h2>
            <p className="text-gray-400 max-w-2xl text-lg">Watch how our unique bypass technology operates in real-time environments.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden glass border-white/10 glow-amber group">
               <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/LTV5hgBO34Y?si=hsEnH6QtTR-CXha9&autoplay=0&controls=1&rel=0&modestbranding=1" 
                title="HourClient Showcase" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen
              />
              <div className="absolute inset-0 pointer-events-none border-[12px] border-black/20 rounded-[2.5rem]" />
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-3xl group hover:border-amber-500/30 transition-all">
                <Lock className="w-10 h-10 text-amber-500 mb-6" />
                <h4 className="text-xl font-black mb-3">Security First</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Our advanced obfuscation ensures that your client remains undetectable to standard anti-cheats and manual inspections.</p>
              </div>
              <div className="glass p-8 rounded-3xl group hover:border-amber-500/30 transition-all">
                <Zap className="w-10 h-10 text-amber-500 mb-6" />
                <h4 className="text-xl font-black mb-3">Performance Built</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Highly optimized rendering engine provides up to 30% more FPS compared to vanilla or other utility clients.</p>
              </div>
              <div className="glass p-8 rounded-3xl group hover:border-amber-500/30 transition-all">
                <Settings className="w-10 h-10 text-amber-500 mb-6" />
                <h4 className="text-xl font-black mb-3">Customization</h4>
                <p className="text-gray-400 text-sm leading-relaxed">Create and save infinite profiles. Switch between "Legit" and "Rage" modes with a single keybind.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GUI Section */}
      <section id="gui" className="py-32 overflow-hidden bg-gradient-to-b from-black to-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-amber-500/10 blur-[120px] rounded-full" />
              <div className="glass p-3 rounded-[3rem] transform lg:-rotate-2 transition-all hover:rotate-0 hover:scale-[1.02] duration-700 shadow-2xl relative">
                <img 
                  src="https://i.ibb.co/L5hY5m8/image.png" 
                  alt="HourClient ClickGUI" 
                  className="rounded-[2.5rem] w-full"
                />
                <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-[10px] font-mono text-amber-500">
                  // RENDER_CONTEXT: ACTIVE
                </div>
              </div>
            </div>

            <div className="flex-1 order-1 lg:order-2 space-y-10">
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                A BEAUTIFUL <br />
                <span className="text-amber-500 italic">INTERFACE.</span>
              </h2>
              <p className="text-gray-400 text-xl font-light leading-relaxed">
                Complexity made simple. Our ClickGUI offers a unified workspace to manage every aspect of your gameplay without interrupting the flow.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Smart Categorization", desc: "Easily navigate through our intuitive tabs." },
                  { title: "Instant Search", desc: "Find any module in milliseconds with fuzzy search." },
                  { title: "Visual Editing", desc: "Tweak colors and transparency in real-time." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="mt-1 w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                      <ChevronRight className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <h5 className="font-black text-lg text-white">{item.title}</h5>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Module Explorer */}
      <section id="modules" className="py-32 bg-[#050505] relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">Module Explorer</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Explore the tools that will redefine your competitive edge.</p>
          </div>
          
          <ModuleExplorer />
        </div>
      </section>

      {/* CTA / Download Section */}
      <section id="download" className="py-40 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20" />
        <div className="container mx-auto px-6 relative">
          <div className="glass p-12 md:p-24 rounded-[4rem] text-center border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
              <Terminal className="w-64 h-64" />
            </div>
            
            <div className="bg-amber-500 w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(251,191,36,0.5)] transform hover:rotate-12 transition-transform">
              <Download className="text-black w-10 h-10" />
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">
              TAKE THE <span className="text-amber-500">THRONE.</span>
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-light">
              Join a community of elite players. Experience the client everyone is talking about.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8">
              <button className="w-full md:w-auto bg-white text-black text-2xl font-black px-16 py-6 rounded-[2rem] hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-4 group">
                DOWNLOAD v2.5 <Download className="w-7 h-7 group-hover:bounce" />
              </button>
              <button className="w-full md:w-auto glass text-white text-2xl font-bold px-16 py-6 rounded-[2rem] hover:bg-white/10 transition-all flex items-center justify-center gap-4">
                DOCUMENTATION <ExternalLink className="w-6 h-6 opacity-50" />
              </button>
            </div>
            
            <div className="mt-16 flex justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
               <span className="font-mono text-xs uppercase tracking-[0.3em]">SHA256: 9F86D08188...</span>
               <span className="font-mono text-xs uppercase tracking-[0.3em]">VERIFIED BY SECTIGO</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-amber-500 p-2 rounded-xl">
                  <Clock className="text-black w-6 h-6" strokeWidth={3} />
                </div>
                <span className="text-3xl font-black tracking-tighter">HOUR<span className="text-amber-500">CLIENT</span></span>
              </div>
              <p className="text-gray-500 text-lg max-w-sm font-light leading-relaxed">
                The ghost in the machine. Redefining what's possible in the digital arena since 2021.
              </p>
            </div>
            
            <div>
              <h6 className="font-black uppercase text-xs tracking-widest mb-8 text-amber-500">Quick Links</h6>
              <ul className="space-y-4 text-gray-400 font-bold text-sm">
                <li><a href="#" className="hover:text-white transition-colors uppercase">User Agreement</a></li>
                <li><a href="#" className="hover:text-white transition-colors uppercase">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors uppercase">Bypass Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors uppercase">Support Desk</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="font-black uppercase text-xs tracking-widest mb-8 text-amber-500">Connect</h6>
              <div className="flex gap-6">
                <a href="#" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1"><Github className="w-8 h-8" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-[10px] uppercase tracking-[0.4em]">
            <span>&copy; {new Date().getFullYear()} HourClient Team.</span>
            <span>NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ASSOCIATED WITH MOJANG.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
