import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ClipboardList, 
  CheckSquare, 
  ShoppingCart, 
  Receipt, 
  BarChart3, 
  History, 
  Database,
  LogOut 
} from 'lucide-react';

export default function GlobalSidebar({ activeTab, setActiveTab, email, isAdmin }) {
  const navigate = useNavigate();

  // Explicit mapping structured straight from image_1d7c2a.png
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vendors', label: 'Vendors', icon: Users },
    { id: 'rfqs', label: "RFQ's", icon: FileText },
    { id: 'quotations', label: 'Quotations', icon: ClipboardList },
    { id: 'approvals', label: 'Approvals', icon: CheckSquare },
    { id: 'orders', label: 'Purchase orders', icon: ShoppingCart },
    { id: 'invoices', label: 'Invoices', icon: Receipt },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'activity', label: 'Activity', icon: History },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 text-slate-300 font-sans">
      
      {/* UPPER SECTION: BRAND IDENTITY & LINK MATRIX */}
      <div className="space-y-6">
        
        {/* BRAND LOGO CONSOLE HEADER */}
        <div className="flex items-center gap-3 px-1">
          <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
            <Database className="w-5 h-5" />
          </div>
          <span className="font-black text-white text-lg tracking-tight">Bridge Core</span>
        </div>
        
        {/* DYNAMIC NAVIGATION LINKS ROW GENERATOR */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                  isActive 
                    ? 'bg-[#017E84]/10 text-[#017E84] border-[#017E84]/20 shadow-sm shadow-[#017E84]/5' 
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#017E84]' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* LOWER SECTION: ADMIN SECURITY & SIGN OUT CARD */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 overflow-hidden">
        <div className="overflow-hidden min-w-0 flex-1">
          <p className="text-xs font-bold text-slate-300 truncate" title={email}>
            {email}
          </p>
          <span 
            className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md inline-block mt-1.5 text-white shadow-sm"
            style={{ backgroundColor: isAdmin ? '#714B67' : '#017E84' }}
          >
            {isAdmin ? "Admin Security" : "Student View"}
          </span>
        </div>
        
        <button 
          onClick={() => navigate('/login')} 
          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all shrink-0 border border-transparent hover:border-rose-500/20 cursor-pointer"
          title="Terminate Session"
        >
          <LogOut className="w-4.5 h-4.5" />
        </button>
      </div>

    </aside>
  );
}