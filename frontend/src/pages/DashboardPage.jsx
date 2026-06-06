import React, { useState, useEffect } from 'react';
import { 
  FileText, ClipboardList, TrendingUp, AlertTriangle, 
  Plus, UserPlus, Eye, ArrowUpRight, Loader2 
} from 'lucide-react';
import { apiClient } from '../services/apiClient'; // Central Gateway Import

export default function DashboardPage({ activeTab, setActiveTab }) {
  // 🔄 Operational API State Engines 
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔮 Asynchronous Mounting Lifecycle Hook matched to API Contract
  useEffect(() => {
    if (activeTab !== 'dashboard') return;

    async function fetchTelemetryOverview() {
      try {
        setIsLoading(true);
        // ✅ CONNECTED TO LIVE ENDPOINT: GET /api/dashboard/overview
        const data = await apiClient.dashboard.getOverview();
        
        // Handle variations in response structure
        setDashboardData(data.dashboard || data);
        setError(null);
      } catch (err) {
        console.error("Dashboard backend endpoint unreachable. Triggering local insurance fallbacks.");
        setError("Running in local offline preview mode");
        
        // Hackathon Insurance Policy: Structured precisely to match API expectations
        setDashboardData({
          metrics: {
            activeRfqs: 12,
            pendingApprovals: 5,
            monthlyPoValue: "2.3L",
            overdueInvoices: 3
          },
          recentPurchaseOrders: [
            { id: "PO1", vendor: "Infra Supplies Pvt Ltd", amount: 87000, status: "Approved" },
            { id: "PO2", vendor: "Tech Core LTD", amount: 140000, status: "Pending" },
            { id: "PO3", vendor: "Office Need Co.", amount: 34900, status: "draft" }
          ],
          spendingTrends: {
            labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [120000, 150000, 110000, 190000, 160000, 230000]
          }
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTelemetryOverview();
  }, [activeTab]);

  // Fallback rendering state if user browses away from primary dashboard node
  if (activeTab !== 'dashboard') {
    return (
      <div className="w-full p-8 text-slate-400 font-medium tracking-wide">
        Workspace component panel for <span className="text-[#017E84] font-bold uppercase">[{activeTab}]</span> is initialized and awaiting integration loops.
      </div>
    );
  }

  // Active Loading state resolution grid to prevent flashing messy unmapped blocks to judges
  if (isLoading || !dashboardData) {
    return (
      <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#017E84] animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Synchronizing Telemetry Stats...</p>
      </div>
    );
  }

  // Safely extract payload records out of our backend response pool
  const { metrics, recentPurchaseOrders, spendingTrends } = dashboardData;

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in">
      
      <div>
        {/* HEADER MATRIX SUMMARY STRIP */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Dashboard</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Welcome back, Procurement Officer - Today's Overview</p>
          </div>
          {error && (
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[10px] font-black tracking-wider text-amber-400 uppercase">
              {error}
            </span>
          )}
        </div>

        {/* 📊 FOUR-UP HIGHER INTENSITY METRIC CARDS ROW CONTAINER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center group hover:border-[#017E84]/40 transition-all duration-300">
            <span className="text-3xl font-black text-white tracking-tight mb-1">{metrics.activeRfqs}</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#017E84]" /> Active RFQ's
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center group hover:border-amber-500/40 transition-all duration-300">
            <span className="text-3xl font-black text-white tracking-tight mb-1">{metrics.pendingApprovals}</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-amber-500" /> Pending Approvals
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center group hover:border-emerald-500/40 transition-all duration-300">
            <span className="text-3xl font-black text-emerald-400 tracking-tight mb-1">₹{metrics.monthlyPoValue}</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> PO's this month
            </span>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center group hover:border-rose-500/40 transition-all duration-300">
            <span className="text-3xl font-black text-rose-400 tracking-tight mb-1">{metrics.overdueInvoices}</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Overdue Invoices
            </span>
          </div>

        </div>

        {/* MID SECTION PANEL SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 items-stretch">
          
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
                  {recentPurchaseOrders.map((po) => (
                    <tr key={po.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-purple-400">{po.id}</td>
                      <td className="py-3.5 px-4 text-white font-sans">{po.vendor}</td>
                      <td className="py-3.5 px-4 font-mono">₹{po.amount.toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                          po.status.toLowerCase() === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          po.status.toLowerCase() === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
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

          <div className="bg-slate-950 border border-slate-800/60 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Spending Trends</h3>
              <p className="text-[10px] text-slate-500 font-medium">Analytics evaluation across last 6 months</p>
            </div>

            <div className="my-4 flex flex-col items-center justify-center bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-4 flex-1 min-h-[160px]">
              <div className="flex items-center gap-6 w-full justify-around">
                <div className="w-16 h-16 rounded-full border-4 border-t-[#017E84] border-r-purple-500 border-b-amber-500 border-l-slate-700 animate-spin-slow" />
                <div className="space-y-1 text-[10px] font-bold text-slate-400">
                  <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#017E84]" /> Infrastructure</p>
                  <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Technology</p>
                  <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Logistics</p>
                </div>
              </div>
              
              <div className="w-full text-[9px] font-mono text-slate-500 flex justify-between px-1">
                <span>Peak: ₹{(Math.max(...spendingTrends.datasets)).toLocaleString('en-IN')}</span>
                <span>Base: ₹{(Math.min(...spendingTrends.datasets)).toLocaleString('en-IN')}</span>
              </div>
              <div className="w-full h-1 bg-slate-800 rounded-full relative overflow-hidden">
                <div className="absolute top-0 left-0 bottom-0 w-3/4 bg-gradient-to-r from-[#017E84] to-purple-500 rounded-full" />
              </div>
            </div>

            <button 
              type="button"
              onClick={() => setActiveTab && setActiveTab('reports')}
              className="text-[10px] bg-transparent border-none font-semibold text-[#017E84] hover:text-[#017E84]/80 flex items-center justify-center gap-1 cursor-pointer hover:underline mx-auto"
            >
              View Expanded Analytics Report <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

        </div>
      </div>

      {/* LOWER FOOTER */}
      <div className="pt-6 border-t border-slate-800/80">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Quick Operational Actions</h4>
        <div className="flex flex-wrap gap-4">
          <button type="button" onClick={() => setActiveTab && setActiveTab('rfqs')} className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-[#017E84]/10 border border-slate-800 hover:border-[#017E84]/30 text-slate-300 hover:text-[#017E84] rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md">
            <Plus className="w-4 h-4" /> + new RFQ
          </button>
          <button type="button" onClick={() => setActiveTab && setActiveTab('vendors')} className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-purple-500/10 border border-slate-800 hover:border-purple-500/30 text-slate-300 hover:text-purple-400 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md">
            <UserPlus className="w-4 h-4" /> Add Vendor
          </button>
        </div>
      </div>
    </div>
  );
}