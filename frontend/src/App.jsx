import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 🔐 Core Authentication Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// 🧭 Global Shell Structural Layout Elements
import GlobalNavbar from './components/GlobalNavbar';
import GlobalSidebar from './components/GlobalSidebar';

// 📂 Production Workflow Page Components (Imported exactly matching your folder tree)
import DashboardPage from './pages/DashboardPage';
import VendorsPage from './pages/VendorsPage';
import RfqsPage from './pages/RfqsPage';
import Quotations_Page from './pages/Quotations_Page';
import Approvals_Page from './pages/Approvals_Page';
import Purchase_Orders_Page from './pages/Purchase_Orders_Page';
import Invoices_Page from './pages/Invoices_Page';
import Reports_page from './pages/Reports_page'; // Lowercase 'p' to match your file name
import Activity_Page from './pages/Activity_Page';

export default function App() {
  // Navigation tab index state matching the wireframe layout options perfectly
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Layout state flags passed down to manage the context panel layers
  const [showLogs, setShowLogs] = useState(true);
  const [logCount, setLogCount] = useState(3);

  // Mock initial session variables mapping role parameters and access metrics
  const mockSession = {
    email: "dev.user@university.edu",
    isAdmin: true // Set to false to immediately view your teal "Student View" theme
  };

  // =========================================================
  // DYNAMIC COMPONENT FILE VIEW DETERMINATION ROUTER SWITCH
  // =========================================================
  const renderActiveContentPage = () => {
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
                {/* 1. Global Header Navbar stays pinned at the absolute top boundary */}
                <GlobalNavbar />
                
                {/* 2. Full screen width side-by-side flex layout container */}
                <div className="flex flex-1 overflow-hidden w-full items-stretch justify-start">
                  
                  {/* 3. Global Sidebar Component docked firmly on the far-left edge */}
                  <GlobalSidebar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    showLogs={showLogs} 
                    setShowLogs={setShowLogs} 
                    logCount={logCount}
                    email={mockSession.email}
                    isAdmin={mockSession.isAdmin}
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