import React, { useState } from 'react';
import { 
  Eye, User, Clock, 
  ChevronRight, Play, Github, Activity, Ghost, 
  ExternalLink, Target, Wind, Crosshair, Layers, Box, Cpu, AlertTriangle,
  MoreHorizontal
} from 'lucide-react';

// --- Configuration ---
const LATEST_VERSION = "1.4";

// --- Types ---
interface Module {
  name: string;
  desc: string;
  isHot?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  modules: Module[];
}

// --- Data ---
const CATEGORIES: Category[] = [
  {
    id: 'combat',
    name: 'Combat',
    icon: <Target />,
    color: 'text-red-500',
    modules: [
      { name: 'AimAssist', desc: 'Subtle interpolation for a legitimate competitive feel.' },
      { name: 'AntiFireball', desc: 'Automatically deflect incoming fireballs from entities.' },
      { name: 'AutoClicker', desc: 'High-CPS jitter simulation with randomized delay patterns.' },
      { name: 'KillAura', desc: 'Advanced path-finding rotations with multi-target support.', isHot: true },
      { name: 'LagRange', desc: 'Manipulate latency to hit players from unexpected distances.' },
      { name: 'NoHitDelay', desc: 'Removes the attack cooldown for maximum damage output.' },
      { name: 'Reach', desc: 'Extend your hit distance up to 6.0 blocks.', isHot: true },
      { name: 'TargetStrafe', desc: 'Automatically circle around targets while maintaining distance.' },
      { name: 'Velocity', desc: 'Cancel knockback via packet manipulation. Fully customizable.' },
      { name: 'WTap', desc: 'Resets sprint on every hit to maximize knockback dealt.' },
    ]
  },
  {
    id: 'movement',
    name: 'Movement',
    icon: <Wind />,
    color: 'text-blue-500',
    modules: [
      { name: 'AntiVoid', desc: 'Prevents you from falling into the void by teleporting back.' },
      { name: 'Blink', desc: 'Suspend your position on the server while moving locally.' },
      { name: 'Eagle', desc: 'Automatically sneaks at the edge of blocks for bridging.' },
      { name: 'Fly', desc: 'Bypass gravity and fly across the map with motion control.', isHot: true },
      { name: 'Jesus', desc: 'Walk on liquid surfaces as if they were solid ground.' },
      { name: 'KeepSprint', desc: 'Prevents the loss of sprint when hitting entities.' },
      { name: 'LongJump', desc: 'Leap across massive gaps with momentum preservation.' },
      { name: 'NoFall', desc: 'Intercept fall packets to negate all impact damage.' },
      { name: 'NoJumpDelay', desc: 'Removes the delay between consecutive jumps.' },
      { name: 'NoSlow', desc: 'Prevent item usage from slowing you down.', isHot: true },
      { name: 'SafeWalk', desc: 'Prevents you from falling off block edges while walking.' },
      { name: 'Speed', desc: 'Multiply base movement speed using advanced bhop logic.', isHot: true },
      { name: 'Sprint', desc: 'Forces the sprint state regardless of conditions.' },
    ]
  },
  {
    id: 'render',
    name: 'Render',
    icon: <Eye />,
    color: 'text-green-500',
    modules: [
      { name: 'BedESP', desc: 'Draws boxes around beds through walls.' },
      { name: 'Chams', desc: 'Apply custom materials to entities seen through walls.' },
      { name: 'ChestESP', desc: 'Highlight chests, ender-chests, and hoppers globally.' },
      { name: 'ClickGui', desc: 'The central interface for client configuration.', isHot: true },
      { name: 'ESP', desc: 'Render bounding boxes and health bars through geometry.', isHot: true },
      { name: 'Fullbright', desc: 'Maximum gamma override for complete visibility.' },
      { name: 'HUD', desc: 'On-screen display for client info and module status.' },
      { name: 'Indicators', desc: 'Visual cues for damage, clicks, and active status.' },
      { name: 'ItemESP', desc: 'Locates dropped items and item frames through walls.' },
      { name: 'NameTags', desc: 'Render high-resolution name plates with gear info.' },
      { name: 'NoHurtCam', desc: 'Removes the screen shake effect when taking damage.' },
      { name: 'TargetHUD', desc: 'Displays a detailed health bar for the target you hit.' },
      { name: 'Tracers', desc: 'Draw lines connecting your crosshair to nearby threats.' },
      { name: 'Trajectories', desc: 'Predicts the flight path of projectiles and arrows.' },
      { name: 'ViewClip', desc: 'Allows third-person camera to pass through walls.' },
      { name: 'Xray', desc: 'Filter blocks to only show valuable ores like diamonds.' },
    ]
  },
  {
    id: 'player',
    name: 'Player',
    icon: <User />,
    color: 'text-yellow-500',
    modules: [
      { name: 'AntiDebuff', desc: 'Automatically removes negative effects like blindness.' },
      { name: 'AutoHeal', desc: 'Uses healing items automatically when health is low.' },
      { name: 'AutoTool', desc: 'Switches to the optimal tool for the block being broken.' },
      { name: 'ChestStealer', desc: 'Loot chests instantly upon interaction.' },
      { name: 'FastPlace', desc: 'Removes the placement delay for rapid building.' },
      { name: 'GApple', desc: 'Automatically consumes golden apples to maintain health and regeneration.', isHot: true },
      { name: 'GhostHand', desc: 'Interact with blocks through walls and obstructions.' },
      { name: 'InvManager', desc: 'Sort, clean, and organize your inventory with one click.' },
      { name: 'InvWalk', desc: 'Allows movement and jumping while inventory is open.' },
      { name: 'MCF', desc: 'Middle-Click Friend: Quickly add players to your friend list.' },
      { name: 'Scaffold', desc: 'Place blocks beneath you automatically while moving.', isHot: true },
      { name: 'SpeedMine', desc: 'Increases the speed of breaking blocks.' },
    ]
  },
  {
    id: 'misc',
    name: 'Misc',
    icon: <MoreHorizontal />,
    color: 'text-purple-500',
    modules: [
      { name: 'AntiObbyTrap', desc: 'Prevents being trapped in obsidian or cobwebs.' },
      { name: 'AntiObfuscate', desc: 'Attempts to reveal hidden server-side data.' },
      { name: 'BedNuker', desc: 'Automatically breaks beds through walls in BedWars.' },
      { name: 'BedTracker', desc: 'Tracks the location of beds across the map.' },
      { name: 'LightningTracker', desc: 'Notifies you of lightning strikes to find players.' },
      { name: 'NickHider', desc: 'Hides your username locally for recording purposes.' },
      { name: 'NoRotate', desc: 'Prevents the server from forcing your head rotation.' },
      { name: 'Spammer', desc: 'Automatically sends configurable messages to chat.' },
    ]
  }
];

// --- Components ---
const YoutubeEmbed = ({ embedId }: { embedId: string }) => (
  <div className="relative group overflow-hidden rounded-3xl">
    <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
    <div className="relative aspect-video w-full border border-white/10 shadow-2xl">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${embedId}?si=hsEnH6QtTR-CXha9&autoplay=0&mute=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="HourClient Showcase"
        className="rounded-2xl"
      />
    </div>
  </div>
);

const ModuleExplorer = () => {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0]);

  return (
    <div className="glass rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row min-h-[650px] border-amber-500/10 hover:border-amber-500/20 transition-colors">
      <div className="w-full lg:w-72 bg-white/[0.02] p-8 space-y-3 border-r border-white/5">
        <div className="flex items-center gap-2 mb-8 px-2">
          <Layers className="w-4 h-4 text-amber-500" />
          <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Directory</h4>
        </div>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCat(cat)}
            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
              activeCat.id === cat.id 
              ? 'bg-amber-500 text-black font-black shadow-[0_10px_30px_rgba(251,191,36,0.2)]' 
              : 'hover:bg-white/5 text-gray-400'
            }`}
          >
            <div className="flex items-center gap-4">
              {React.isValidElement(cat.icon) ? React.cloneElement(cat.icon as React.ReactElement<any>, { className: 'w-5 h-5' }) : cat.icon}
              <span className="text-sm uppercase tracking-widest">{cat.name}</span>
            </div>
            {activeCat.id === cat.id && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </div>
      
      <div className="flex-1 p-8 lg:p-16 max-h-[800px] overflow-y-auto custom-scrollbar">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-widest ${activeCat.color}`}>
              System: {activeCat.id}.dll
            </div>
            <h3 className="text-5xl font-black tracking-tighter uppercase">{activeCat.name}</h3>
          </div>
          <p className="text-gray-500 text-sm max-w-xs font-mono">
            // Loaded {activeCat.modules.length} operational tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          {activeCat.modules.map(mod => (
            <div key={mod.name} className="group relative p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all overflow-hidden">
              {mod.isHot && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-amber-500 text-black text-[8px] font-black uppercase tracking-tighter rounded-bl-xl">
                  ESSENTIAL
                </div>
              )}
              <h5 className="font-black text-xl mb-3 flex items-center gap-3 group-hover:text-amber-500 transition-colors uppercase italic">
                {mod.name}
              </h5>
              <p className="text-gray-500 text-sm leading-relaxed font-light">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
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
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] py-8 transition-all">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className={`p-2 rounded-xl transition-all ${ghostMode ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/10 group-hover:bg-amber-500 group-hover:text-black'}`}>
              <Clock className="w-6 h-6" strokeWidth={3} />
            </div>
            <span className="text-3xl font-black tracking-tighter italic glitch-text" data-text="HOURCLIENT">HOUR<span className="text-amber-500">CLIENT</span></span>
          </div>
          
          <div className="hidden lg:flex items-center gap-12 font-bold text-xs uppercase tracking-[0.2em] text-gray-400">
            <a href="#showcase" className="hover:text-amber-500 transition-colors">Showcase</a>
            <a href="#interface" className="hover:text-amber-500 transition-colors">Interface</a>
            <a href="#modules" className="hover:text-amber-500 transition-colors">Modules</a>
            <a href="download.html" className="hover:text-amber-500 transition-colors">Download</a>
            <div className="flex items-center gap-6 border-l border-white/10 pl-12">
              <button onClick={toggleGhost} className={`p-2 rounded-lg transition-all ${ghostMode ? 'bg-amber-500/20 text-amber-500 border border-amber-500' : 'text-white/30 hover:text-white'}`}>
                <Ghost className="w-5 h-5" />
              </button>
              <a 
                href="download.html"
                className="bg-amber-500 hover:bg-amber-400 text-black px-8 py-3 rounded-2xl font-black transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg shadow-amber-500/20 text-center"
              >
                GET ACCESS
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-60 pb-40 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl aspect-square bg-amber-500/5 blur-[180px] rounded-full -z-10 animate-pulse" />
        <div className="container mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-6 py-2 rounded-full text-amber-500 text-[10px] font-black tracking-[0.3em] mb-12 flicker">
            <Activity className="w-4 h-4" /> v{LATEST_VERSION} - UNDETECTED
          </div>
          <h1 className="text-7xl md:text-[140px] font-black tracking-tighter leading-[0.8] mb-12 uppercase italic">
            THE SYSTEM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-400 via-white to-amber-900">IS YOURS.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-500 text-xl md:text-2xl font-light mb-16 leading-relaxed">
            Engineered for those who demand the impossible. HourClient redefines utility with bypasses that leave detection in the dark.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a 
              href="download.html"
              className="group w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black text-2xl font-black px-16 py-6 rounded-3xl transition-all shadow-[0_0_50px_rgba(251,191,36,0.3)] hover:scale-105 flex items-center gap-4 italic"
            >
              DOWNLOAD NOW <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </a>
            <a href="#showcase" className="w-full sm:w-auto glass hover:bg-white/5 text-white text-2xl font-bold px-16 py-6 rounded-3xl transition-all flex items-center justify-center gap-4 italic">
              <Play className="w-6 h-6 fill-current text-amber-500" /> SHOWCASE
            </a>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="py-40 bg-[#080808]">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="space-y-4">
              <h2 className="text-6xl font-black uppercase tracking-tighter italic">Operational <span className="text-amber-500">Intelligence.</span></h2>
              <p className="text-gray-500 text-lg max-w-md font-light">Watch HourClient dismantle traditional server-side anti-cheats in high-fidelity 4K.</p>
            </div>
            <div className="flex gap-4">
              <div className="glass p-6 rounded-3xl text-center min-w-[140px]">
                <div className="text-3xl font-black text-amber-500 mb-1">0%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Ban Rate</div>
              </div>
              <div className="glass p-6 rounded-3xl text-center min-w-[140px]">
                <div className="text-3xl font-black text-amber-500 mb-1">59+</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Modules</div>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            <YoutubeEmbed embedId="LTV5hgBO34Y" />
          </div>
        </div>
      </section>

      {/* Interface */}
      <section id="interface" className="py-40 bg-gradient-to-b from-black to-[#050505]">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-center gap-32">
            <div className="flex-1 order-2 lg:order-1 relative group">
              <div className="absolute -inset-4 bg-amber-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
              <div className="glass p-4 rounded-[3.5rem] shadow-2xl relative z-10 overflow-hidden">
                <div className="absolute inset-x-0 h-1 bg-amber-500/40 shadow-[0_0_15px_rgba(251,191,36,0.5)] z-20 animate-scan pointer-events-none" style={{ animation: 'scan 4s linear infinite' }} />
                <style>{`
                  @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    5% { opacity: 1; }
                    95% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                  }
                  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                  .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(251, 191, 36, 0.2); border-radius: 10px; }
                  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(251, 191, 36, 0.4); }
                `}</style>
                <img 
                  src="https://i.ibb.co/Q7qVCv9P/image2.png" 
                  alt="HourClient Interface" 
                  className="rounded-[3rem] w-full border border-white/5"
                />
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 space-y-12">
              <div className="w-16 h-2 bg-amber-500 rounded-full" />
              <h2 className="text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">
                VISUAL <br /> <span className="text-amber-500">PRECISION.</span>
              </h2>
              <p className="text-gray-400 text-2xl font-light leading-relaxed">
                The most intuitive ClickGUI in the scene. Designed for rapid deployment and instant configuration during high-intensity sessions.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-amber-500">
                    <Crosshair className="w-6 h-6" />
                    <span className="font-black text-xs uppercase tracking-widest">Real-time Adjust</span>
                  </div>
                  <p className="text-sm text-gray-500">Modify every module setting without leaving the game menu.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-amber-500">
                    <Box className="w-6 h-6" />
                    <span className="font-black text-xs uppercase tracking-widest">Modern Blur</span>
                  </div>
                  <p className="text-sm text-gray-500">Backdrop-filtered visuals that integrate seamlessly with your client.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="py-40 bg-[#050505]">
        <div className="container mx-auto px-8">
          <div className="text-center mb-24 space-y-4">
            <div className="flex items-center justify-center gap-4 text-amber-500 mb-6">
              <Cpu className="w-6 h-6 animate-pulse" />
              <div className="h-px w-24 bg-white/10" />
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter italic">CORE <span className="text-amber-500">REGISTRY.</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto font-light">Explore the extensive library of high-performance modules optimized for the latest version.</p>
          </div>
          <ModuleExplorer />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 bg-black overflow-hidden relative">
        <div className="absolute inset-0 bg-amber-500/5 -skew-y-6 translate-y-20 pointer-events-none" />
        <div className="container mx-auto px-8 relative z-10 flex flex-col items-center">
          <div className="flex gap-8 mb-16">
            <a href="#" className="p-4 rounded-full glass hover:bg-amber-500 hover:text-black transition-all">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="p-4 rounded-full glass hover:bg-amber-500 hover:text-black transition-all">
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-700 text-center space-y-4">
            <p>&copy; {new Date().getFullYear()} HourClient Team. ALL PROTOCOLS ENCRYPTED.</p>
            <p className="opacity-40 max-w-md mx-auto leading-relaxed">THIS IS A UTILITY TOOLSET. NOT AN OFFICIAL MOJANG PRODUCT. USE AT YOUR OWN DISCRETION WITHIN LICENSED ENVIRONMENTS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}