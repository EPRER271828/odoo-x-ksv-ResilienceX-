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

// =========================================================
// 🛡️ ROLE-BASED ACCESS CONTROL PERMISSIONS CONFIGURATION
// =========================================================
const ROLES = {
  OFFICER: 'Procurement Officer',
  VENDOR: 'Vendor',
  MANAGER: 'Manager / Approver',
  ADMIN: 'Admin'
};

const PAGE_PERMISSIONS = {
  dashboard:  [ROLES.OFFICER, ROLES.MANAGER, ROLES.ADMIN],
  vendors:    [ROLES.OFFICER, ROLES.ADMIN],
  rfqs:       [ROLES.OFFICER, ROLES.ADMIN],
  quotations: [ROLES.OFFICER, ROLES.VENDOR, ROLES.ADMIN],
  approvals:  [ROLES.MANAGER, ROLES.ADMIN],
  orders:     [ROLES.OFFICER, ROLES.VENDOR, ROLES.MANAGER, ROLES.ADMIN],
  invoices:   [ROLES.OFFICER, ROLES.MANAGER, ROLES.ADMIN],
  reports:    [ROLES.ADMIN],
  activity:   [ROLES.ADMIN]
};

export default function GlobalSidebar({ activeTab, setActiveTab, email, role }) {
  const navigate = useNavigate();

  // Explicit mapping structured straight from layout parameters
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

  // 🛡️ FILTER LAYER: Blocks navigation elements based on structural roles
  const visibleMenuItems = menuItems.filter(item => {
    if (role === ROLES.ADMIN) return true; // Global "All View" Override Rule
    return PAGE_PERMISSIONS[item.id]?.includes(role);
  });

  // Session demolition method to cleanly wipe authorization tokens upon exit
  const handleTerminateSession = () => {
    localStorage.clear(); 
    navigate('/login');
  };

  // Dynamic background style picker based on platform role constraints
  const getRoleBadgeColor = (roleName) => {
    switch (roleName) {
      case ROLES.ADMIN:
        return '#714B67';
      case ROLES.OFFICER:
        return '#017E84';
      case ROLES.MANAGER:
        return '#4F46E5'; 
      case ROLES.VENDOR:
        return '#E11D48'; // Distinct rose token badge for third-party vendors
      default:
        return '#334155'; 
    }
  };

  return (
    <aside className="w-64 h-screen sticky top-0 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 text-slate-300 font-sans no-print">
      
      {/* UPPER SECTION: BRAND IDENTITY & LINK MATRIX */}
      <div className="space-y-6">
        
        {/* BRAND LOGO CONSOLE HEADER */}
        <div className="flex items-center gap-3 px-1">
          <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
            <Database className="w-5 h-5" />
          </div>
          <span className="font-black text-white text-lg tracking-tight">Bridge Core</span>
        </div>
        
        {/* DYNAMIC ROLE-FILTERED LINKS NAVIGATION */}
        <nav className="space-y-1">
          {visibleMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                  isActive 
                    ? 'bg-slate-900 text-[#017E84] border-[#017E84]/20 shadow-sm' 
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

      {/* LOWER SECTION: REGISTRY IDENTITIES & SIGN OUT CARD */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 overflow-hidden">
        <div className="overflow-hidden min-w-0 flex-1">
          {/* Dynamic User Email Text Block Container */}
          <p className="text-xs font-bold text-slate-300 truncate" title={email}>
            {email || 'dev.user@university.edu'}
          </p>
          
          {/* Dynamic System Role Authorization Badge Label */}
          <span 
            className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md inline-block mt-1.5 text-white shadow-sm"
            style={{ backgroundColor: getRoleBadgeColor(role) }}
          >
            {role || 'Procurement Officer'}
          </span>
        </div>
        
        <button 
          type="button"
          onClick={handleTerminateSession} 
          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all shrink-0 border border-transparent hover:border-rose-500/20 cursor-pointer"
          title="Terminate Session"
        >
          <LogOut className="w-4.5 h-4.5" />
        </button>
      </div>

    </aside>
  );
}