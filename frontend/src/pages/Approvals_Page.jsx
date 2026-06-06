import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, XCircle, MessageSquare, 
  FileText, ShieldCheck, ThumbsDown, Calendar 
} from 'lucide-react';

export default function Approvals_Page() {
  // 🧭 Workflow Stage Progression Indicator State (Currently at Step 3: L2 Approval)
  const [currentStage, setCurrentStage] = useState(3);
  const [approvalRemarks, setApprovalRemarks] = useState('');
  const [workflowStatus, setWorkflowStatus] = useState('pending'); // 'pending' | 'approved' | 'rejected'

  // Mock datasets extracted directly from your image_1c855c.png blueprint
  const workflowStages = [
    { id: 1, label: "Submitted" },
    { id: 2, label: "L1 Review" },
    { id: 3, label: "L2 approval" },
    { id: 4, label: "Generate PO" }
  ];

  const approvalChain = [
    {
      name: "Rahul Mehta",
      role: "Procurement head",
      status: "approved",
      timestamp: "Approved on may 20, 10:32 Am"
    },
    {
      name: "Priya Shah",
      role: "Finance manager",
      status: "awaiting",
      timestamp: "Awaiting — Assigned may 21"
    }
  ];

  const quotationsSummary = {
    vendor: "Infra Supplies PVT LTD",
    total: "1,85,400",
    delivery: "10 days",
    rating: "4.5 / 5"
  };

  // ⚡ Decision Trigger Actions
  const handleDecisionSubmit = (actionType) => {
    if (actionType === 'approve') {
      setWorkflowStatus('approved');
      setCurrentStage(4); // Advance sequence directly to Generate PO phase
    } else {
      setWorkflowStatus('rejected');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in">
      
      <div>
        {/* UPPER CONSOLE BANNER HEADER DISPLAY */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-white tracking-tight">Approval Workflow</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
            <span className="text-[#017E84] font-bold">RFQ Manifest:</span> office furniture Q2 — 
            <span className="text-purple-400 font-bold">Vendor:</span> {quotationsSummary.vendor} — 
            <span className="text-emerald-400 font-mono font-black bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/10 rounded">₹{quotationsSummary.total}</span>
          </p>
        </div>

        {/* 🧭 HORIZONTAL METRIC PROGRESSION STEPPER WIZARD */}
        <div className="w-full bg-slate-950 border border-slate-800 p-6 rounded-2xl mb-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-[44px] left-12 right-12 h-0.5 bg-slate-800 z-0" />
          
          <div className="flex justify-between items-center w-full relative z-10">
            {workflowStages.map((stage) => {
              const isCompleted = stage.id < currentStage;
              const isActive = stage.id === currentStage;

              return (
                <div key={stage.id} className="flex flex-col items-center flex-1 text-center group">
                  <div className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center border transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-sm shadow-emerald-500/5' 
                      : isActive
                      ? 'bg-[#017E84] text-white border-[#017E84] shadow-lg shadow-[#017E84]/20 scale-110'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : stage.id}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider mt-2.5 transition-colors ${
                    isActive ? 'text-white font-black' : 'text-slate-400 font-bold'
                  }`}>
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* MID SECTION DATA LAYOUT SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          
          {/* LEFT COLUMN COMPONENT: APPROVAL SIGNATURE CHAIN & AUDIT COMMENTS */}
          <div className="space-y-6">
            
            {/* Approval Chain Sub-Panel */}
            <div className="bg-slate-950 border border-slate-800/60 p-6 rounded-2xl shadow-2xl">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Approval Chain</h3>
              
              <div className="space-y-4 relative before:absolute before:top-2 before:bottom-2 before:left-4 before:w-0.5 before:bg-slate-800">
                {approvalChain.map((node, i) => {
                  const isApproved = node.status === 'approved';
                  return (
                    <div key={i} className="flex items-start gap-4 relative z-10 group">
                      <div className={`p-1.5 rounded-full border shrink-0 mt-0.5 transition-all ${
                        isApproved 
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                          : 'bg-slate-900 border-slate-800 text-purple-400 animate-pulse'
                      }`}>
                        {isApproved ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      
                      <div className="min-w-0 flex-1 bg-slate-900/40 border border-slate-850/60 rounded-xl p-3 group-hover:border-slate-800 transition-all">
                        <p className="text-xs font-black text-white">{node.name} <span className="text-[10px] font-bold text-slate-400 font-mono">({node.role})</span></p>
                        <span className={`text-[10px] block mt-1 font-semibold ${isApproved ? 'text-slate-400' : 'text-purple-400'}`}>
                          {node.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Approval Remarks Interactive Form Box */}
            <div className="bg-slate-950 border border-slate-800/60 p-6 rounded-2xl shadow-2xl">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#017E84]" /> Approval Remarks
              </label>
              <textarea 
                rows={3}
                placeholder="Add your comments or conditions....."
                value={approvalRemarks}
                disabled={workflowStatus !== 'pending'}
                onChange={(e) => setApprovalRemarks(e.target.value)}
                className="w-full px-4 py-3 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-[#017E84]/30 transition-all bg-slate-900 text-slate-200 placeholder-slate-600 font-medium resize-none leading-relaxed disabled:opacity-50"
              />
            </div>

          </div>

          {/* RIGHT COLUMN COMPONENT: PROPOSALS DATA SUMMARY SUMMARY & DECISION CORE */}
          <div className="bg-slate-950 border border-slate-800/60 p-6 rounded-2xl shadow-2xl space-y-6 flex flex-col justify-between min-h-[352px]">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-400" /> Quotations Summary
              </h3>
              
              <div className="space-y-3 bg-slate-900/40 border border-slate-850 p-4 rounded-xl text-xs font-bold font-mono text-slate-400">
                <div className="flex justify-between items-center py-1 border-b border-slate-900/60">
                  <span>Vendor:</span> <span className="text-white font-sans">{quotationsSummary.vendor}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-900/60">
                  <span>Total Balance:</span> <span className="text-emerald-400 text-[13px]">₹{quotationsSummary.total}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-900/60">
                  <span>Delivery Target:</span> <span className="text-purple-400">{quotationsSummary.delivery}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Reputation Rating:</span> <span className="text-amber-400 font-sans">{quotationsSummary.rating}</span>
                </div>
              </div>
            </div>

            {/* INTERACTIVE WORKFLOW TERMINAL CONTROL HUBS */}
            <div className="pt-4 border-t border-slate-800">
              {workflowStatus === 'pending' ? (
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => handleDecisionSubmit('approve')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#017E84] hover:bg-[#017E84]/90 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#017E84]/10 transition-all active:scale-95 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" /> Approve
                  </button>
                  <button 
                    onClick={() => handleDecisionSubmit('reject')}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-900/30 font-black text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 cursor-pointer"
                  >
                    <ThumbsDown className="w-4 h-4" /> Reject
                  </button>
                </div>
              ) : (
                <div className={`p-4 rounded-xl border text-center text-xs font-black uppercase tracking-wider animate-fade-in ${
                  workflowStatus === 'approved' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                }`}>
                  {workflowStatus === 'approved' 
                    ? '✓ Workflow Approved Stack Dispatched — Generating Purchase Order Manifest' 
                    : '✕ Transaction Cancelled & Flagged by Overseer Approval Rule'}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* LOWER FOOTER ANCHOR PANEL */}
      <div className="pt-4 border-t border-slate-800/40 text-[10px] font-semibold text-slate-600 tracking-wide flex justify-between items-center mt-8">
        <span>Approval Pipeline Clearance Deck Active</span>
        <span>Governance Security Secured</span>
      </div>

    </div>
  );
}