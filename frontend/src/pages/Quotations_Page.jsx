import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Calculator, Percent, FileText, Calendar, 
  CheckCircle, Save, Scale, ArrowRight, Star, Clock, ShieldCheck 
} from 'lucide-react';

export default function Quotations_Page() {
  // 🧭 Local sub-view route navigation toggle
  // 'form' = Submit Quotation Entry Field | 'compare' = Side-by-Side Evaluation Matrix
  const [viewMode, setViewMode] = useState('form');

  // 🔔 HUD Status Alert Toast State Engines
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // =========================================================
  // STATE DEFINITIONS FOR THE ENTRY FORM VIEW
  // =========================================================
  const [lineItems, setLineItems] = useState([
    { item: "Ergonomic chair", qty: 25, unitPrice: 3500, deliveryDays: 7 },
    { item: "Standing desks", qty: 10, unitPrice: 8200, deliveryDays: 14 }
  ]);
  const [taxPercent, setTaxPercent] = useState(18);
  const [notes, setNotes] = useState('Payment terms: 20 days net from deployment validation window.');
  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const computedSubtotal = lineItems.reduce((acc, current) => acc + (current.qty * (parseFloat(current.unitPrice) || 0)), 0);
    const computedTax = computedSubtotal * ((parseFloat(taxPercent) || 0) / 100);
    setSubtotal(computedSubtotal);
    setTaxAmount(computedTax);
    setGrandTotal(computedSubtotal + computedTax);
  }, [lineItems, taxPercent]);

  // =========================================================
  // 🛠️ INTERACTIVE SUBMISSION HANDLERS
  // =========================================================
  const triggerToastAlert = (messageText) => {
    setToastMessage(messageText);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handleFormSubmitAction = (processingState) => {
    triggerToastAlert(
      processingState === 'Submitted' 
        ? 'Quotation pipeline synchronized and broadcast to network node.' 
        : 'Worksheet draft configurations cached securely.'
    );
  };

  const handleVendorApprovalSelection = (vendorTitleCode) => {
    triggerToastAlert(`Transaction Locked: ${vendorTitleCode} approved for master contract assignment.`);
    console.log("🔒 PROCUREMENT SELECTION BIND COMPLETE:", {
      assignedVendor: vendorTitleCode,
      rfqReference: "office furniture procurement q2",
      authorizationTimestamp: new Date().toISOString(),
      contractFinancials: vendorTitleCode === "TechCore LTD" ? grandTotal : vendorTitleCode === "Infra Supplies" ? 185000 : 214800
    });
  };

  // =========================================================
  // VIEW MODE A: SUBMIT QUOTATION FORM LAYOUT
  // =========================================================
  if (viewMode === 'form') {
    return (
      <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in relative">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Submit Quotations</h1>
              <p className="text-xs text-slate-400 font-medium mt-0.5 flex items-center gap-1.5">
                <span className="text-[#017E84] font-bold">RFQ Reference:</span> office furniture procurement q2 — 
                <span className="text-purple-400 font-mono font-bold flex items-center gap-1"><Calendar className="w-3 h-3" /> deadline 15 june 2026</span>
              </p>
            </div>
            {/* Action Trigger to Hop directly onto Screen 7 Matrix */}
            <button 
              onClick={() => setViewMode('compare')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/30 text-purple-400 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <Scale className="w-4 h-4" /> Compare Received Quotations <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl mb-6 flex items-start gap-3 shadow-md">
            <div className="p-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg mt-0.5 shrink-0"><FileText className="w-4 h-4" /></div>
            <div>
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider">RFQ Summary Context</h4>
              <p className="text-xs text-slate-200 font-semibold mt-0.5">Ergonomic chair * 25, standing desk * 10 — Category: Furniture</p>
            </div>
          </div>

          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Your Quotation Worksheet</h3>
          <div className="bg-slate-950 border border-slate-800/60 rounded-2xl shadow-2xl overflow-hidden mb-8">
            <div className="w-full overflow-x-auto">
              <table className="w-full table-fixed text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/20 text-[10px] font-black text-slate-500 uppercase border-b border-slate-800">
                    <th className="py-3.5 px-6 w-1/3">Item Description</th>
                    <th className="py-3.5 px-4 text-center w-24">Qty</th>
                    <th className="py-3.5 px-4 w-44">Unit Price (INR)</th>
                    <th className="py-3.5 px-4 w-44">Line Total (INR)</th>
                    <th className="py-3.5 px-6 text-center w-36">Delivery (days)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900 text-xs font-semibold text-slate-300">
                  {lineItems.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-900/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-white truncate">{row.item}</td>
                      <td className="py-4 px-4 text-center font-mono text-slate-400 text-[13px]">{row.qty}</td>
                      <td className="py-4 px-4">
                        <div className="relative max-w-[140px]">
                          <span className="absolute left-3 top-2.5 font-bold text-slate-600">₹</span>
                          <input type="number" value={row.unitPrice} onChange={(e) => {
                            const updated = [...lineItems]; updated[index].unitPrice = e.target.value; setLineItems(updated);
                          }} className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-6 pr-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#017E84]/50" />
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono text-white text-[13px]">₹{(row.qty * (parseFloat(row.unitPrice) || 0)).toLocaleString('en-IN')}</td>
                      <td className="py-4 px-6">
                        <input type="number" value={row.deliveryDays} onChange={(e) => {
                          const updated = [...lineItems]; updated[index].deliveryDays = e.target.value; setLineItems(updated);
                        }} className="w-16 text-center bg-slate-900 border border-slate-800 rounded-xl py-2 text-xs font-mono font-bold text-purple-400 mx-auto block" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-slate-950 border border-slate-800/60 p-4 rounded-xl">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Percent className="w-3.5 h-3.5 text-purple-400" /> tax / GST %</label>
                <div className="relative max-w-[120px]">
                  <input type="number" value={taxPercent} onChange={(e) => setTaxPercent(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs font-mono font-black text-purple-400 focus:outline-none" />
                  <span className="absolute right-3 top-2.5 font-bold text-slate-600">%</span>
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800/60 p-4 rounded-xl">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">Note / terms</label>
                <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-slate-800 focus:outline-none bg-slate-900 text-slate-300 resize-none" />
              </div>
            </div>

            <div className="lg:col-span-3 bg-slate-950 border border-slate-800/80 p-6 rounded-2xl shadow-2xl flex flex-col justify-between min-h-[180px]">
              <div className="space-y-2 font-mono text-xs font-bold text-slate-400">
                <div className="flex justify-between"><span>Subtotal:</span><span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>GST ({taxPercent}%):</span><span className="text-purple-400">+ ₹{taxAmount.toLocaleString('en-IN')}</span></div>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center font-mono">
                <span className="text-xs font-black text-slate-300 uppercase">Grand total:</span>
                <span className="text-xl font-black text-emerald-400">₹{Math.round(grandTotal).toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex gap-4 mt-8">
          <button onClick={() => handleFormSubmitAction('Submitted')} className="flex items-center gap-2 px-6 py-3 bg-[#017E84] text-white rounded-xl text-xs font-black tracking-wide cursor-pointer active:scale-95 transition-transform"><CheckCircle className="w-4 h-4" /> Submit Quotation</button>
          <button onClick={() => handleFormSubmitAction('Draft')} className="flex items-center gap-2 px-6 py-3 bg-slate-950 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold cursor-pointer active:scale-95 transition-transform"><Save className="w-4 h-4" /> Save Draft</button>
        </div>

        {/* FLOATING ACTION HUD NOTIFICATION TOAST */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-slate-950 border border-[#017E84]/40 shadow-2xl p-4 rounded-2xl flex items-center gap-3 animate-fade-in z-50">
            <div className="w-8 h-8 rounded-xl bg-[#017E84]/10 flex items-center justify-center text-[#017E84]"><CheckCircle className="w-4 h-4" /></div>
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Worksheet Updated</h4>
              <p className="text-[11px] font-medium text-slate-400 mt-0.5">{toastMessage}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================
  // VIEW MODE B: SCREEN 7 - QUOTATION COMPARISON MATRIX UI
  // =========================================================
  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in relative">
      <div>
        {/* UPPER CONSOLE BANNER Display */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Quotation Comparison</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              RFQ: <span className="text-white font-bold">office furniture procurement q2</span> — 3 quotations received
            </p>
          </div>
          {/* Back out navigation gate controller */}
          <button 
            onClick={() => setViewMode('form')}
            className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            &larr; Back to Worksheet Entry
          </button>
        </div>

        {/* 📊 CORE EVALUATION MATRIX COMPONENT STRUCTURE */}
        <div className="bg-slate-950 border border-slate-800/60 rounded-2xl shadow-2xl overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-900/50 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <th className="py-4 px-6 border-b border-slate-800">Criteria</th>
                  
                  {/* OPTIMAL LOWEST TARGET COLUMN HEADER */}
                  <th className="py-4 px-6 bg-emerald-500/10 border-b-2 border-emerald-500 text-emerald-400 font-black text-center relative">
                    Infra Supplies <span className="block text-[8px] uppercase tracking-widest text-emerald-500/80 mt-0.5 font-mono">(Lowest)</span>
                  </th>
                  
                  <th className="py-4 px-6 text-slate-300 text-center border-b border-slate-800 border-l border-slate-900 bg-slate-950/20">TechCore LTD (You)</th>
                  <th className="py-4 px-6 text-slate-300 text-center border-b border-slate-800">Office Need Co.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs font-bold">
                
                {/* ROW 1: GRAND TOTAL (Dynamically binds your custom input total into column 2!) */}
                <tr className="hover:bg-slate-900/20 transition-colors">
                  <td className="py-4 px-6 text-slate-400 uppercase tracking-wide text-[10px]">Grand Total</td>
                  <td className="py-4 px-6 text-center bg-emerald-500/10 text-emerald-400 font-mono font-black text-[14px]">₹1,85,000</td>
                  <td className="py-4 px-6 text-center font-mono text-white bg-slate-950/20 border-l border-slate-900/60">₹{Math.round(grandTotal).toLocaleString('en-IN')}</td>
                  <td className="py-4 px-6 text-center font-mono text-slate-400">₹2,14,800</td>
                </tr>

                {/* ROW 2: GST RATIO (Dynamically updates to reflect your form state) */}
                <tr className="hover:bg-slate-900/20 transition-colors">
                  <td className="py-4 px-6 text-slate-400 uppercase tracking-wide text-[10px]">GST %</td>
                  <td className="py-4 px-6 text-center bg-emerald-500/10 text-emerald-400 font-mono">18%</td>
                  <td className="py-4 px-6 text-center font-mono text-slate-300 bg-slate-950/20 border-l border-slate-900/60">{taxPercent}%</td>
                  <td className="py-4 px-6 text-center font-mono text-slate-300">18%</td>
                </tr>

                {/* ROW 3: DELIVERY DURATION (Dynamically monitors row items input timeline) */}
                <tr className="hover:bg-slate-900/20 transition-colors">
                  <td className="py-4 px-6 text-slate-400 uppercase tracking-wide text-[10px]">Delivery (days)</td>
                  <td className="py-4 px-6 text-center bg-emerald-500/10 text-emerald-400 font-mono flex items-center justify-center gap-1.5 py-4"><Clock className="w-3.5 h-3.5" /> 10 days</td>
                  <td className="py-4 px-6 text-center font-mono text-slate-300 bg-slate-950/20 border-l border-slate-900/60">{lineItems[1]?.deliveryDays || 14} days</td>
                  <td className="py-4 px-6 text-center font-mono text-emerald-400">{lineItems[0]?.deliveryDays || 7} days</td>
                </tr>

                {/* ROW 4: SUPPLIER REPUTATION RATING */}
                <tr className="hover:bg-slate-900/20 transition-colors">
                  <td className="py-4 px-6 text-slate-400 uppercase tracking-wide text-[10px]">Vendor rating</td>
                  <td className="py-4 px-6 text-center bg-emerald-500/10 text-emerald-400 flex items-center justify-center gap-1 py-4"><Star className="w-3.5 h-3.5 fill-emerald-400 animate-spin-slow" /> 4.5 / 5</td>
                  <td className="py-4 px-6 text-center text-slate-300 bg-slate-950/20 border-l border-slate-900/60">4.2 / 5</td>
                  <td className="py-4 px-6 text-center text-slate-400">3.8 / 5</td>
                </tr>

                {/* ROW 5: AMORTIZATION PAYMENT CONFIGURATION */}
                <tr className="hover:bg-slate-900/20 transition-colors">
                  <td className="py-4 px-6 text-slate-400 uppercase tracking-wide text-[10px]">Payment terms</td>
                  <td className="py-4 px-6 text-center bg-emerald-500/10 text-emerald-400">30 days net</td>
                  <td className="py-4 px-6 text-center text-slate-300 bg-slate-950/20 border-l border-slate-900/60">30 days net</td>
                  <td className="py-4 px-6 text-center text-slate-400">15 days net</td>
                </tr>

                {/* ROW 6: INTERACTIVE CONSOLE SELECTION HUB SUBMIT ACTIONS */}
                <tr>
                  <td className="py-6 px-6 border-t border-slate-900"></td>
                  
                  {/* GREEN PRIMARY ACTION TRIGGER */}
                  <td className="py-6 px-4 bg-emerald-500/10 text-center border-t border-slate-900">
                    <button onClick={() => handleVendorApprovalSelection('Infra Supplies')} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-950/40 border border-emerald-400/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Select & Approve
                    </button>
                  </td>
                  
                  <td className="py-6 px-4 text-center border-t border-slate-900 bg-slate-950/20 border-l border-slate-900/60">
                    <button onClick={() => handleVendorApprovalSelection('TechCore LTD')} className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all active:scale-95 cursor-pointer">
                      Select
                    </button>
                  </td>
                  <td className="py-6 px-4 text-center border-t border-slate-900">
                    <button onClick={() => handleVendorApprovalSelection('Office Need Co.')} className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all active:scale-95 cursor-pointer">
                      Select
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* 💡 USER HELPER ALERT INSIGHT DESCRIPTION */}
        <p className="text-[10px] font-semibold text-rose-400/90 tracking-wide mt-4 italic">
          * Note: Green highlight indicates the cost-minimal optimized supplier proposal. Initializing selection binds execution straight to manager workflow queues.
        </p>
      </div>

      {/* LOWER DECK ANCHOR FOOTER BOUNDARY */}
      <div className="pt-4 border-t border-slate-800/40 text-[10px] font-semibold text-slate-600 tracking-wide flex justify-between items-center mt-8">
        <span>Analytical Comparison Engine Operating</span>
        <span>Data Nodes Synced Edge-to-Edge</span>
      </div>

      {/* FLOATING ACTION HUD NOTIFICATION TOAST */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-950 border border-purple-500/40 shadow-2xl p-4 rounded-2xl flex items-center gap-3 animate-fade-in z-50">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400"><CheckCircle className="w-4 h-4" /></div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Workflow Event</h4>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}