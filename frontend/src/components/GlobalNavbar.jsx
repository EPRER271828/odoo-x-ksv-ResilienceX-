import { Link, useLocation } from 'react-router-dom';
import { Database, LogOut, Terminal, Layers, Activity } from 'lucide-react';

export default function GlobalNavbar() {
  const location = useLocation();

  // Highlight helper: returns bright styles if the current path matches the link target
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return `px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
      isActive 
        ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 shadow-sm shadow-purple-900/10' 
        : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
    }`;
  };

  return (
    <nav className="bg-slate-950 border-b border-slate-800 px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT LOGO & BRAND SECTION */}
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
              <Database className="w-5 h-5" />
            </div>
            <span className="font-black text-white text-lg tracking-tight">Vendor Bridge Workspace</span>
          </Link>

          {/* TRAVERSAL NAV TAB LINK MATRIX */}
          <div className="hidden sm:flex items-center gap-1.5">
            <Link to="/dashboard" className={getLinkStyle('/dashboard')}>
              <Layers className="w-3.5 h-3.5" />
              Network Core
            </Link>
          </div>
        </div>

        {/* RIGHT LIVE TELEMETRY STATUS SECTION */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono font-bold text-slate-400 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            HQ-NODE LIVE
          </div>
          
          <div className="h-4 w-px bg-slate-800" />

          <Link 
            to="/login" 
            className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/10" 
            title="Terminate Core Session"
          >
            <LogOut className="w-4.5 h-4.5" />
          </Link>
        </div>

      </div>
    </nav>
  );
}