import React, { useState } from 'react';
import { 
  History, CheckCircle2, Clock, FileText, UserPlus, 
  Search, ShieldCheck, Filter, ArrowDownAZ 
} from 'lucide-react';

// Comprehensive chronological mock log array from image_1c80a9.png
const AUDIT_LOGS = [
  {
    id: "LOG-001",
    type: "Approvals",
    title: "Quotation selected",
    description: "Infra supplies pvt ltd selected for office furniture Q2",
    timestamp: "23 May, 2026, 9:15 PM",
    icon: CheckCircle2,
    iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  },
  {
    id: "LOG-002",
    type: "Approvals",
    title: "Approval pending",
    description: "PO-2024 awaiting L2 approval by priya shah",
    timestamp: "22 May, 2026, 09:15 AM",
    icon: Clock,
    iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20"
  },
  {
    id: "LOG-003",
    type: "RFQ",
    title: "RFQ published",
    description: "office furniture Q2 sent to 3 vendors",
    timestamp: "19 May, 2026",
    icon: FileText,
    iconColor: "text-[#017E84] bg-[#017E84]/10 border-[#017E84]/20"
  },
  {
    id: "LOG-004",
    type: "Vendors",
    title: "Vendor added",
    description: "FastLog transport registered and pending verifications",
    timestamp: "18 May, 2026, 3:20 PM",
    icon: UserPlus,
    iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20"
  }
];

export default function Activity_Page() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering module interception logic
  const filteredLogs = AUDIT_LOGS.filter(log => {
    const matchesFilter = activeFilter === 'All' || log.type.toLowerCase() === activeFilter.toLowerCase();
    const matchesSearch = 
      log.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      log.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterTabs = ['All', 'RFQ', 'Approvals', 'Invoices', 'Vendors'];

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in">
      
      <div>
        {/* UPPER TITLE Display Matrix Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <History className="w-6 h-6 text-[#017E84]" /> Activity & Logs
            </h1>
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
          <div className="absolute top-8 bottom-8 left-[38px] w-0.5 bg-slate-900" />

          <div className="space-y-6 relative z-10">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => {
                const LogIcon = log.icon;
                return (
                  <div key={log.id} className="flex items-start gap-4 group animate-slide-in">
                    
                    {/* Modular Vector Icon Bubble Node */}
                    <div className={`p-2 rounded-xl border shrink-0 transition-all duration-300 group-hover:scale-105 shadow-md ${log.iconColor}`}>
                      <LogIcon className="w-4 h-4" />
                    </div>

                    {/* Content Detail Card */}
                    <div className="flex-1 bg-slate-900/30 border border-slate-850 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group-hover:border-slate-800 transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-white">{log.title}</span>
                          <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-slate-400 font-mono">
                            {log.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                          {log.description}
                        </p>
                      </div>

                      {/* Timestamp Text Element */}
                      <span className="text-[10px] font-bold font-mono text-purple-400 shrink-0 self-start sm:self-auto bg-purple-500/5 px-2 py-1 rounded-lg border border-purple-500/10">
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