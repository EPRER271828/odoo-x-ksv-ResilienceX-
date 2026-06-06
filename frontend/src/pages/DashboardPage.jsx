import React, { useState } from 'react';
import { 
  FileText, ClipboardList, TrendingUp, AlertTriangle, 
  Plus, UserPlus, Eye, ArrowUpRight
} from 'lucide-react';

// Wireframe Mock Data Matrix
const RECENT_ORDERS = [
  { id: "Po1", vendor: "Infra", amount: "87,000", status: "Approved" },
  { id: "Po2", vendor: "Tech core", amount: "140,000", status: "Pending" },
  { id: "Po3", vendor: "OfficeNeed Co", amount: "34,900", status: "draft" }
];

export default function DashboardPage({ activeTab, setActiveTab}) {
  const [orders] = useState(RECENT_ORDERS);

  // Fallback rendering state if user browses away from primary dashboard node
  if (activeTab !== 'dashboard') {
    return (
      <div className="w-full p-8 text-slate-400 font-medium tracking-wide">
        Workspace component panel for <span className="text-[#017E84] font-bold uppercase">[{activeTab}]</span> is initialized and awaiting integration loops.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between">
      
      {/* HEADER MATRIX SUMMARY STRIP */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
        <p className="text-xs text-slate-400 font-medium mt-0.5">Welcome back, Procurement Officer - Today's Overview</p>
      </div>

      {/* 📊 FOUR-UP HIGHER INTENSITY METRIC CARDS ROW CONTAINER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* ACTIVE RFQS CARD */}
        <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center group hover:border-[#017E84]/40 transition-all duration-300">
          <span className="text-3xl font-black text-white tracking-tight mb-1">12</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#017E84]" /> Active RFQ's
          </span>
        </div>

        {/* PENDING APPROVALS CARD */}
        <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center group hover:border-amber-500/40 transition-all duration-300">
          <span className="text-3xl font-black text-white tracking-tight mb-1">5</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ClipboardList className="w-3.5 h-3.5 text-amber-500" /> Pending Approvals
          </span>
        </div>

        {/* PO VALUE CARD */}
        <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center group hover:border-emerald-500/40 transition-all duration-300">
          <span className="text-3xl font-black text-emerald-400 tracking-tight mb-1">$ 2.3L</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> PO's this month
          </span>
        </div>

        {/* OVERDUE INVOICES CARD */}
        <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center group hover:border-rose-500/40 transition-all duration-300">
          <span className="text-3xl font-black text-rose-400 tracking-tight mb-1">3</span>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Overdue Invoices
          </span>
        </div>

      </div>

      {/* MID SECTION PANEL SPLIT GRID: RECENT ORDERS VS SPENDING TRENDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-stretch">
        
        {/* LEFT COMPONENT: RECENT PURCHASE ORDERS LEDGER GRID */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800/60 rounded-2xl shadow-2xl overflow-hidden p-6 flex flex-col">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Recent Purchase Orders</h3>
          
          <div className="w-full overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-black tracking-wider text-slate-500 uppercase bg-slate-900/30">
                  <th className="py-3 px-4">PO#</th>
                  <th className="py-3 px-4">Vendor</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs font-semibold text-slate-300">
                {orders.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-purple-400">{po.id}</td>
                    <td className="py-3.5 px-4 text-white">{po.vendor}</td>
                    <td className="py-3.5 px-4 font-mono">₹{po.amount}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                        po.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        po.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COMPONENT: SPENDING TRENDS VISUAL MATRICES */}
        <div className="bg-slate-950 border border-slate-800/60 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Spending Trends</h3>
            <p className="text-[10px] text-slate-500 font-medium">Analytics evaluation across last 6 months</p>
          </div>

          {/* SIMULATED ANALYTICS GRAPHICS CONTAINER MATCHING MOCKUP GRAPHICS */}
          <div className="my-4 flex flex-col items-center justify-center bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-4 flex-1 min-h-[160px]">
            {/* Pie Chart Representation Overlay */}
            <div className="flex items-center gap-6 w-full justify-around">
              <div className="w-16 h-16 rounded-full border-4 border-t-[#017E84] border-r-purple-500 border-b-amber-500 border-l-slate-700 animate-spin-slow" />
              <div className="space-y-1 text-[10px] font-bold text-slate-400">
                <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#017E84]" /> Infrastructure</p>
                <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Technology</p>
                <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Logistics</p>
              </div>
            </div>
            
            {/* Sparkline Row representation */}
            <div className="w-full h-1 bg-slate-800 rounded-full relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-3/4 bg-gradient-to-r from-[#017E84] to-purple-500 rounded-full" />
            </div>
          </div>

          <p className="text-[10px] font-semibold text-[#017E84] flex items-center justify-center gap-1 cursor-pointer hover:underline">
            View Expanded Analytics Report <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>

      </div>

      {/* LOWER FOOTER HORIZONTAL DIVIDER STRIP & ACTION BUTTON MATRIX */}
      <div className="pt-6 border-t border-slate-800/80">
      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Quick Operational Actions</h4>
      <div className="flex flex-wrap gap-4">
        
        {/* Matches case 'rfqs': */}
        <button 
          onClick={() => setActiveTab && setActiveTab('rfqs')}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-[#017E84]/10 border border-slate-800 hover:border-[#017E84]/30 text-slate-300 hover:text-[#017E84] rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" /> + new RFQ
        </button>

        {/* Matches case 'vendors': */}
        <button 
          onClick={() => setActiveTab && setActiveTab('vendors')}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-purple-500/10 border border-slate-800 hover:border-purple-500/30 text-slate-300 hover:text-purple-400 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
        >
          <UserPlus className="w-4 h-4" /> Add Vendor
        </button>

        {/* Matches case 'invoices': */}
        <button 
          onClick={() => setActiveTab && setActiveTab('invoices')}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 text-slate-300 hover:text-amber-400 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
        >
          <Eye className="w-4 h-4" /> view Invoices
        </button>

      </div>
      </div>

    </div>
  );
}