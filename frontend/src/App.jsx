import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 🔐 Core Authentication Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// 🧭 Global Shell Structural Layout Elements
import GlobalNavbar from './components/GlobalNavbar';
import GlobalSidebar from './components/GlobalSidebar';

// 📂 Production Workflow Page Components 
import DashboardPage from './pages/DashboardPage';
import VendorsPage from './pages/VendorsPage';
import RfqsPage from './pages/RfqsPage';
import Quotations_Page from './pages/Quotations_Page';
import Approvals_Page from './pages/Approvals_Page';
import Purchase_Orders_Page from './pages/Purchase_Orders_Page';
import Invoices_Page from './pages/Invoices_Page';
import Reports_page from './pages/Reports_page'; 
import Activity_Page from './pages/Activity_Page';

// 🛡️ ROLE MAPPING STRUCTURAL ALIGNMENT REFERENCE
const ROLES = {
  OFFICER: 'Procurement Officer',
  VENDOR: 'Vendor',
  MANAGER: 'Manager / Approver',
  ADMIN: 'Admin'
};

// Pinned permission matrix checking array
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

export default function App() {
  // Navigation tab index state matching the wireframe layout options perfectly
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Layout state flags passed down to manage the context panel layers
  const [showLogs, setShowLogs] = useState(true);
  const [logCount, setLogCount] = useState(3);

  // CHANGED: Dynamic baseline context reading from browser memory cache layers
  const [userSession, setUserSession] = useState({
    email: localStorage.getItem('userEmail') || 'dev.user@university.edu',
    role: localStorage.getItem('userRole') || 'Procurement Officer'
  });

  // NEW: An internal lifecycle effect to keep the sidebar updated if the session variables change
  useEffect(() => {
    const handleStorageUpdate = () => {
      setUserSession({
        email: localStorage.getItem('userEmail') || 'dev.user@university.edu',
        role: localStorage.getItem('userRole') || 'Procurement Officer'
      });

      setActiveTab('dashboard');
    };

    // Listen to changes (handy if testing layout shifts between roles)
    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  // =========================================================
  // DYNAMIC COMPONENT FILE VIEW DETERMINATION ROUTER SWITCH
  // =========================================================
  const renderActiveContentPage = () => {
    // 🛡️ ENFORCE DOWNSTREAM FRONTEND WORKSPACE PAGE PROTECTION GUARD
    const userRole = userSession.role;
    const isAuthorized = userRole === ROLES.ADMIN || PAGE_PERMISSIONS[activeTab]?.includes(userRole);

    if (!isAuthorized) {
      return (
        <div className="w-full min-h-screen bg-slate-900 flex flex-col items-center justify-center p-8 text-center font-sans antialiased">
          <div className="bg-slate-950 border border-red-900/30 p-8 rounded-2xl max-w-md shadow-2xl space-y-3">
            <span className="text-xs font-black tracking-widest px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg uppercase">
              403 Access Forbidden
            </span>
            <h2 className="text-white text-base font-black tracking-tight">Security Clearance Exception</h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Your active credential registry track <span className="text-purple-400 font-mono font-bold">[{userRole}]</span> lacks structural clearance validation mapping weights to parse the current console workspace node.
            </p>
            <button 
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Return to Safe Terminal Dashboard
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardPage 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showLogs={showLogs} 
            setShowLogs={setShowLogs}
            setLogCount={setLogCount}
          />
        );
      case 'vendors':
        return <VendorsPage />;
      case 'rfqs':
        return <RfqsPage setActiveTab={setActiveTab} />;
      case 'quotations':
        return <Quotations_Page />;
      case 'approvals':
        return <Approvals_Page />;
      case 'orders':
        return <Purchase_Orders_Page />;
      case 'invoices':
        return <Invoices_Page />;
      case 'reports':
        return <Reports_page />;
      case 'activity':
        return <Activity_Page />;
      default:
        return (
          <DashboardPage 
            activeTab={activeTab}
            showLogs={showLogs} 
            setShowLogs={setShowLogs}
            setLogCount={setLogCount}
          />
        );
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased">
        
        <Routes>
          {/* Isolation Authentication Gates */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Master ERP Console Layout Module Area */}
          <Route 
            path="/dashboard" 
            element={
              <>
                {/* 1. Global Header Navbar stays pinned at the top */}
                <GlobalNavbar />
                
                {/* 2. Full screen width side-by-side flex layout container */}
                <div className="flex flex-1 overflow-hidden w-full items-stretch justify-start">
                  
                  {/* 3. Global Sidebar Component - Mapped cleanly to dynamic contract session hooks */}
                  <GlobalSidebar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    showLogs={showLogs} 
                    setShowLogs={setShowLogs} 
                    logCount={logCount}
                    email={userSession.email} // Dynamic Prop assignment
                    role={userSession.role}   // Dynamic Prop assignment
                  />
                  
                  {/* 4. Fluid Inner Workspace Panel tracking the current selected file template */}
                  <div className="flex-1 flex min-w-0 bg-slate-900 items-stretch overflow-y-auto">
                    {renderActiveContentPage()}
                  </div>

                </div>
              </>
            } 
          />

          {/* Automatic Route Redirection Fallback Gate */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

      </div>
    </Router>
  );
}