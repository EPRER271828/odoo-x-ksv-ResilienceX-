import React, { useState } from 'react';
import { 
  FileText, Plus, Trash2, UserPlus, UploadCloud, 
  X, Save, Send, ChevronRight, HelpCircle, CheckCircle 
} from 'lucide-react';

export default function RfqsPage({ setActiveTab }) {
  // Step Wizard Stepper Tracking Indicator
  const [currentStep, setCurrentStep] = useState(1);

  // Form Field Matrix States
  const [rfqTitle, setRfqTitle] = useState('Office Furniture procurement Q2');
  const [category, setCategory] = useState('Furniture');
  const [deadline, setDeadline] = useState('2026-06-15'); // Updated date parameter tracking
  const [description, setDescription] = useState('Ergonomic chairs and standing desks for 3rd floor');

  // Dynamic Array State Hooks for Table Line Items
  const [lineItems, setLineItems] = useState([
    { item: "Ergonomic chair", qty: 25, unit: "NOS" },
    { item: "Standing desks", qty: 10, unit: "NOS" }
  ]);

  // Target Supplier Assignment Array State Hooks
  const [assignedVendors, setAssignedVendors] = useState([
    "Infra Supplies Pvt Ltd",
    "Techcore LTD"
  ]);

  // Toast State Notification flags for Hackathon presentation tracking
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // ➕ Handlers for Interactive State Mutation Loops
  const addLineItem = () => {
    setLineItems([...lineItems, { item: "", qty: 1, unit: "NOS" }]);
  };

  const removeLineItem = (index) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] = value;
    setLineItems(updated);
  };

  const removeVendor = (vendorName) => {
    setAssignedVendors(assignedVendors.filter(v => v !== vendorName));
  };

  const addVendorPlaceholder = () => {
    const freshVendor = prompt("Enter supplier name string to attach:");
    if (freshVendor && freshVendor.trim() !== "") {
      setAssignedVendors([...assignedVendors, freshVendor.trim()]);
    }
  };

  // =========================================================
  // ⚙️ SUBMISSION OPERATION ENGINE PIPELINE
  // =========================================================
  const processWorkflowSubmission = (submissionMode) => {
    if (submissionMode === 'send') {
      // 1. Set Toast UI Message Context
      setToastMessage("RFQ Dispatched to Target Suppliers. Redirecting Workspace...");
      setShowToast(true);
      setCurrentStep(2); // Progress stepping track layout visual indicators

      // 2. Trigger automated navigation transition after visual pause for validation checks
      setTimeout(() => {
        setShowToast(false);
        if (setActiveTab) {
          setActiveTab('quotations'); // Bounces application view shell right to the workspace sheet layer
        }
      }, 1500);

    } else {
      // Code Execution path tracking for local draft caches
      setToastMessage("RFQ Specifications saved to system draft repositories.");
      setShowToast(true);
      setCurrentStep(3); // Advance visual tracking markers
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in relative">
      
      <div>
        {/* UPPER TITLE Display Matrix Strip */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-white tracking-tight">Create RFQ's</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">new request for quotation</p>
        </div>

        {/* 🧭 MULTI-STEP PROGRESSION PIPELINE WIZARD BAR */}
        <div className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl mb-8 flex items-center justify-around relative overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          
          {[1, 2, 3].map((step) => (
            <button 
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center z-10 transition-all border ${
                currentStep === step 
                  ? 'bg-[#017E84] text-white border-[#017E84] shadow-md shadow-[#017E84]/20 scale-110' 
                  : currentStep > step
                  ? 'bg-purple-950/40 text-purple-400 border-purple-800/40'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* MAIN DATA FORM METRIC ENTRY FIELDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          
          {/* LEFT CONTAINER: PRIMARY ATTRIBUTE DATA REGISTRY */}
          <div className="bg-slate-950 border border-slate-800/60 p-6 rounded-2xl shadow-2xl space-y-4">
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">RFQ's Title *</label>
              <input 
                type="text" 
                value={rfqTitle}
                onChange={(e) => setRfqTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-900 text-slate-100 font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
              <input 
                type="text" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-900 text-slate-400 font-semibold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Deadline *</label>
              <input 
                type="date" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-900 text-slate-100 font-mono font-bold text-purple-400"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
              <textarea 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-900 text-slate-300 font-medium resize-none leading-relaxed"
              />
            </div>

          </div>

          {/* RIGHT CONTAINER: INTERACTIVE ITEM TABLES & VENDOR SELECTION */}
          <div className="space-y-6">
            
            {/* SUB-PANEL A: TRANSACTION LINE ITEMS GRID TABLE */}
            <div className="bg-slate-950 border border-slate-800/60 p-6 rounded-2xl shadow-2xl flex flex-col">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Line Items</h3>
              
              <div className="w-full overflow-x-auto mb-3">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-[9px] font-black tracking-wider text-slate-500 uppercase bg-slate-900/10">
                      <th className="py-2 px-2 w-1/2">Item</th>
                      <th className="py-2 px-2 text-center w-20">Qty</th>
                      <th className="py-2 px-2 text-center w-24">Unit</th>
                      <th className="py-2 px-2 text-center w-12"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-xs text-slate-300">
                    {lineItems.map((row, index) => (
                      <tr key={index} className="hover:bg-slate-900/20 transition-colors">
                        <td className="py-2 px-1">
                          <input 
                            type="text" 
                            value={row.item} 
                            placeholder="Resource identifier string"
                            onChange={(e) => updateLineItem(index, 'item', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-850 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-[#017E84]/40"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input 
                            type="number" 
                            value={row.qty} 
                            onChange={(e) => updateLineItem(index, 'qty', parseInt(e.target.value) || 0)}
                            className="w-full text-center bg-slate-900 border border-slate-850 rounded-lg px-2 py-1 text-xs text-emerald-400 font-mono"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input 
                            type="text" 
                            value={row.unit} 
                            onChange={(e) => updateLineItem(index, 'unit', e.target.value)}
                            className="w-full text-center bg-slate-900 border border-slate-850 rounded-lg px-2 py-1 text-xs text-slate-400 font-mono font-bold"
                          />
                        </td>
                        <td className="py-2 px-1 text-center">
                          <button 
                            onClick={() => removeLineItem(index)}
                            className="p-1 text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button 
                onClick={addLineItem}
                className="w-full py-2 bg-slate-900 hover:bg-[#017E84]/10 text-xs font-bold text-slate-400 hover:text-[#017E84] rounded-xl border border-slate-850 hover:border-[#017E84]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> + add line item
              </button>
            </div>

            {/* SUB-PANEL B: VENDOR SELECTION MATRIX TAGS */}
            <div className="bg-slate-950 border border-slate-800/60 p-6 rounded-2xl shadow-2xl">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Assign Vendors</h3>
              
              <div className="bg-slate-900 border border-slate-850 rounded-xl p-3 space-y-1.5 max-h-[140px] overflow-y-auto mb-3">
                {assignedVendors.map((vendor, i) => (
                  <div key={i} className="flex justify-between items-center px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-850 text-xs group">
                    <span className="font-bold text-slate-300">{vendor}</span>
                    <button 
                      onClick={() => removeVendor(vendor)}
                      className="p-1 text-slate-600 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <button 
                onClick={addVendorPlaceholder}
                className="w-full py-2 bg-slate-900 hover:bg-purple-500/10 text-xs font-bold text-slate-400 hover:text-purple-400 rounded-xl border border-slate-850 hover:border-purple-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" /> + add vendor
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* LOWER FOOTER: WORKFLOW TRANSMISSION SHORTCUTS & DRAG-AND-DROP FILE UPLOAD SECTION */}
      <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* ACTION EXECUTION TRIGGER PAIR */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => processWorkflowSubmission('send')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-[#017E84] hover:bg-[#017E84]/90 text-white rounded-xl text-xs font-black tracking-wide transition-all shadow-lg shadow-[#017E84]/10 active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Save & Send to Vendors
          </button>
          <button 
            onClick={() => processWorkflowSubmission('draft')}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save as Draft
          </button>
        </div>

        {/* DRAG AND DROP FILE COMPONENT LAYER */}
        <div>
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Attachments</h4>
          <div className="border border-slate-800 border-dashed bg-slate-950/40 hover:bg-slate-950 hover:border-[#017E84]/30 transition-all rounded-xl p-4 text-center cursor-pointer flex flex-col items-center justify-center space-y-1 group">
            <UploadCloud className="w-5 h-5 text-slate-600 group-hover:text-[#017E84] transition-colors" />
            <span className="text-[11px] font-bold text-slate-400 group-hover:text-slate-300 transition-colors">Drag & drop files or click to upload</span>
          </div>
        </div>

      </div>

      {/* FLOATING ACTION INTERCEPTION TOAST HUD BANNER */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-950 border border-[#017E84]/40 shadow-2xl p-4 rounded-2xl flex items-center gap-3 animate-fade-in z-50">
          <div className="w-8 h-8 rounded-xl bg-[#017E84]/10 flex items-center justify-center text-[#017E84]">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Pipeline Processing</h4>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

    </div>
  );
}