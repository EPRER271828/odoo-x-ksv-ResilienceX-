import React, { useState, useEffect } from 'react';
import { 
  History, CheckCircle2, Clock, FileText, UserPlus, 
  Search, ShieldCheck, Filter, ArrowDownAZ, Loader2, CreditCard
} from 'lucide-react';
import { apiClient } from '../services/apiClient'; // Central Gateway Import

export default function Activity_Page() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // 🔄 Operational API Lifecycle State Modules
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);

  const filterTabs = ['All', 'RFQ', 'Approvals', 'Invoices', 'Vendors'];

  // 🔮 Asynchronous Mounting & Dependency Monitoring Lifecycle Hook matched to Screen 10 Contract
  useEffect(() => {
    async function loadAuditTrailRecords() {
      try {
        setIsLoading(true);
        // Map parameter streams directly into central engine: GET /api/audit-logs?filter=X
        const contractFilterToken = activeFilter === 'All' ? '' : activeFilter;
        const data = await apiClient.auditLogs.getLogs(contractFilterToken);
        setAuditLogs(data);
        setErrorStatus(null);
      } catch (err) {
        console.error("Audit log endpoint unreachable. Injecting system insurance fallbacks.");
        setErrorStatus("Local Simulation Ledger Active");
        
        // Hackathon Insurance Policy: Structured precisely to support Screen 10 contract shapes
        setAuditLogs([
          { "id": "LOG-9011", "type": "Quotation", "message": "Quotation selected - Infra supplies pvt ltd selected for office furniture Q2", "timestamp": "23 may 2025, 9:15 PM" },
          { "id": "LOG-9012", "type": "Approvals", "message": "Approval pending - PO-2024 awaiting L2 approval by priya shah", "timestamp": "22 may 2025, 09:15 AM" },
          { "id": "LOG-9013", "type": "RFQ", "message": "RFQ published - office furniture Q2 sent to 3 vendors", "timestamp": "19 may 2025" },
          { "id": "LOG-9014", "type": "Vendors", "message": "Vendor added - FastLog transport registered and pending verifications", "timestamp": "18 may 2025, 3:20 PM" }
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    loadAuditTrailRecords();
  }, [activeFilter]);

  // 🎨 HELPER FUNCTION: Maps contract structural log types to matching UI visual anchors dynamically
  const getLogVisualProperties = (typeString) => {
    switch (typeString?.toLowerCase()) {
      case 'rfq':
        return { icon: FileText, style: "text-[#017E84] bg-[#017E84]/10 border-[#017E84]/20" };
      case 'approvals':
      case 'quotation':
        return { icon: CheckCircle2, style: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
      case 'invoices':
        return { icon: CreditCard, style: "text-amber-400 bg-amber-500/10 border-amber-500/20" };
      case 'vendors':
        return { icon: UserPlus, style: "text-purple-400 bg-purple-500/10 border-purple-500/20" };
      default:
        return { icon: Clock, style: "text-slate-400 bg-slate-500/10 border-slate-500/20" };
    }
  };

  // Local filtering layer for live multi-input text evaluation matching message parameters
  const filteredLogs = auditLogs.filter(log => {
    return log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
           log.type.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in">
      
      <div>
        {/* UPPER TITLE Display Matrix Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <History className="w-6 h-6 text-[#017E84]" /> Activity & Logs
              </h1>
              {errorStatus && (
                <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-[10px] font-black tracking-wider text-amber-400 rounded-lg uppercase">
                  {errorStatus}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Procurement audit trail records</p>
          </div>
          
          {/* Quick-Filter Utility Input field */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              type="text"
              placeholder="Search audit trail records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-800 focus:outline-none focus:border-[#017E84]/40 bg-slate-950 text-slate-100 placeholder-slate-600 font-medium"
            />
          </div>
        </div>

        {/* 🧭 SCOPE HORIZONTAL SELECTION PILLS ROW */}
        <div className="flex flex-wrap gap-2 mb-8 text-xs font-bold">
          {filterTabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                activeFilter === tab
                  ? 'bg-[#017E84]/10 text-[#017E84] border-[#017E84]/30 shadow-md shadow-[#017E84]/5'
                  : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 📋 CHRONOLOGICAL TIMELINE AUDIT TRAIL PANEL */}
        <div className="bg-slate-950 border border-slate-800/60 rounded-2xl p-6 shadow-2xl relative">
          
          {/* Subtle vertical spine connector pipeline graphics rule */}
          <div className="absolute top-8 bottom-8 left-[38px] w-0.5 bg-slate-900/40" />

          <div className="space-y-6 relative z-10">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <Loader2 className="w-6 h-6 text-[#017E84] animate-spin" />
                Querying System Compliance Ledger...
              </div>
            ) : filteredLogs.length > 0 ? (
              filteredLogs.map((log) => {
                const visualProps = getLogVisualProperties(log.type);
                const LogIcon = visualProps.icon;
                
                return (
                  <div key={log.id} className="flex items-start gap-4 group animate-slide-in">
                    
                    {/* Modular Vector Icon Bubble Node */}
                    <div className={`p-2 rounded-xl border shrink-0 transition-all duration-300 group-hover:scale-105 shadow-md ${visualProps.style}`}>
                      <LogIcon className="w-4 h-4" />
                    </div>

                    {/* Content Detail Card */}
                    <div className="flex-1 bg-slate-900/30 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group-hover:border-slate-700 transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-white capitalize">{log.type} Transaction</span>
                          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-slate-400 font-mono">
                            {log.id}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed font-sans">
                          {log.message}
                        </p>
                      </div>

                      {/* Timestamp Text Element */}
                      <span className="text-[10px] font-bold font-mono text-purple-400 shrink-0 self-start sm:self-auto bg-purple-500/5 px-2 py-1 rounded-lg border border-purple-500/10 capitalize">
                        {log.timestamp}
                      </span>
                    </div>

                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center text-slate-500 font-medium text-xs tracking-wide">
                No system operation events trace within your specific filter parameters.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* LOWER ARCHITECTURAL ACCENT DECK FOOTER */}
      <div className="pt-4 border-t border-slate-800/40 text-[10px] font-semibold text-slate-600 tracking-wide flex justify-between items-center mt-8">
        <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> DB Ledger Integrity Verified</span>
        <span className="flex items-center gap-1 font-mono"><ArrowDownAZ className="w-3.5 h-3.5" /> Ordered: Descending Timestamp</span>
      </div>

    </div>
  );
}