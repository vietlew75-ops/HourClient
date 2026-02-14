import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  FileDown, ShieldCheck, History, ArrowDownToLine, 
  ChevronLeft, Terminal, Activity, AlertTriangle, 
  Lock, Clock
} from 'lucide-react';

const VERSIONS = [
  {
    tag: "1.4.1",
    status: "Latest",
    date: "Current Stable",
    size: "1.77 MB",
    bytes: "1,866,668 bytes",
    id: "11NpfLjD39inzJ822JZvpXK8xjpXYm7fY",
    url: "https://drive.google.com/uc?export=download&id=11NpfLjD39inzJ822JZvpXK8xjpXYm7fY"
  },
  {
    tag: "1.3.1",
    status: "Legacy",
    date: "Legacy Build",
    size: "1.77 MB",
    bytes: "1,864,123 bytes",
    id: "1YaykY5087GxjdhdhxGEMSaFHSkHfocbc",
    url: "https://drive.google.com/uc?export=download&id=1YaykY5087GxjdhdhxGEMSaFHSkHfocbc"
  }
];

const DownloadPage = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const startDownload = (tag: string, url: string) => {
    setDownloading(tag);
    setTimeout(() => {
      window.location.href = url;
      setTimeout(() => setDownloading(null), 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-amber-500 selection:text-black font-sans">
      <nav className="fixed top-0 left-0 right-0 z-[100] py-8">
        <div className="container mx-auto px-8 flex justify-between items-center">
          <a href="index.html" className="flex items-center gap-4 group">
            <div className="p-2 rounded-xl bg-white/10 group-hover:bg-amber-500 group-hover:text-black transition-all">
              <ChevronLeft className="w-6 h-6" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Back to Home</span>
          </a>
          <div className="flex items-center gap-4">
             <Clock className="w-5 h-5 text-amber-500 flicker" />
             <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">Vault Session: Active</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-8 pt-48 pb-32">
        <div className="max-w-4xl mx-auto text-center mb-24 space-y-6">
          <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-6 py-2 rounded-full text-amber-500 text-[10px] font-black tracking-[0.3em] uppercase flicker">
            <Lock className="w-4 h-4" /> Secure Repository Access
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none">
            RETRIEVE <span className="text-amber-500">CLIENT.</span>
          </h1>
          <p className="text-gray-500 text-xl font-light max-w-2xl mx-auto">
            Authorized builds only. All downloads are scanned and verified against our security protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {VERSIONS.map((v) => (
            <div key={v.tag} className="glass p-12 rounded-[3.5rem] relative overflow-hidden group hover:border-amber-500/30 transition-all">
              <div className="absolute top-0 right-0 bg-amber-500 text-black px-8 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-3xl">
                {v.status}
              </div>
              
              <div className="flex items-center gap-8 mb-10">
                <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20">
                  <FileDown className="w-12 h-12 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-5xl font-black tracking-tighter uppercase italic">v{v.tag}</h3>
                  <div className="flex items-center gap-3 text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">
                    <Activity className="w-3 h-3 text-amber-500" /> {v.date}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase font-black">Integrity Status</span>
                  <span className="text-sm font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-500" /> Secure
                  </span>
                </div>
                <div className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase font-black">Data Payload</span>
                  <span className="text-sm font-bold">{v.size} ({v.bytes})</span>
                </div>
              </div>

              <button 
                disabled={downloading !== null}
                onClick={() => startDownload(v.tag, v.url)}
                className={`w-full py-7 rounded-3xl text-2xl font-black transition-all transform flex items-center justify-center gap-4 italic ${
                  downloading === v.tag 
                  ? 'bg-white/10 text-amber-500 cursor-wait' 
                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-[0_10px_40px_rgba(251,191,36,0.1)] active:scale-95 group-hover:scale-[1.02]'
                }`}
              >
                {downloading === v.tag ? (
                  <>DECRYPTING...</>
                ) : (
                  <>INITIALIZE DOWNLOAD <ArrowDownToLine className="w-6 h-6" /></>
                )}
              </button>
              
              <div className="mt-8 text-center text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                MD5_CHECKSUM: {v.id.substring(0, 16).toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 max-w-2xl mx-auto glass p-8 rounded-3xl border-red-500/10">
          <div className="flex gap-6 items-start">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-red-400 uppercase tracking-widest text-sm">Security Advisory</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ensure your antivirus exceptions are correctly configured for Java-based utilities. HourClient utilizes advanced packet manipulation which may trigger heuristic warnings in non-secured environments.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-mono font-bold text-gray-700 uppercase tracking-[0.5em]">
        Repository Build: v3.0 // Port 8080 // Encrypted
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<DownloadPage />);