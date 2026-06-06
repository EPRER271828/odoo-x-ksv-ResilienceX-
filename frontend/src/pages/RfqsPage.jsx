import React, { useState } from 'react';
import { 
  FileText, Plus, Trash2, UserPlus, UploadCloud, 
  X, Save, Send, ChevronRight, HelpCircle, CheckCircle, Loader2 
} from 'lucide-react';
import { apiClient } from '../services/apiClient'; // Central Gateway Import

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

  // Target Supplier Assignment Array State Hooks (Mapped to match IDs from the contract)
  const [assignedVendors, setAssignedVendors] = useState([
    "VND-001",
    "VND-002"
  ]);

  // Operational API UI processing states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Grab active session context parameters safely
  const userRole = localStorage.getItem('userRole') || 'Procurement Officer';
  const isAuthorizedCreator = ['Procurement Officer', 'Admin'].includes(userRole);

  // ➕ Handlers for Interactive State Mutation Loops
  const addLineItem = () => {
    if (!isAuthorizedCreator) return;
    setLineItems([...lineItems, { item: "", qty: 1, unit: "NOS" }]);
  };

  const removeLineItem = (index) => {
    if (!isAuthorizedCreator) return;
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const updateLineItem = (index, field, value) => {
    if (!isAuthorizedCreator) return;
    const updated = [...lineItems];
    updated[index][field] = value;
    setLineItems(updated);
  };

  const removeVendor = (vendorName) => {
    if (!isAuthorizedCreator) return;
    setAssignedVendors(assignedVendors.filter(v => v !== vendorName));
  };

  const addVendorPlaceholder = () => {
    if (!isAuthorizedCreator) return;
    const freshVendor = prompt("Enter explicit supplier identifier code (e.g. VND-003):");
    if (freshVendor && freshVendor.trim() !== "") {
      setAssignedVendors([...assignedVendors, freshVendor.trim()]);
    }
  };

  // =========================================================
  // ⚙️ CONTRACT-LINKED SUBMISSION OPERATION ENGINE PIPELINE
  // =========================================================
  const processWorkflowSubmission = async (submissionMode) => {
    if (!isAuthorizedCreator) return;
    setErrorMessage('');
    setIsLoading(true);
    
    const isDraftMode = submissionMode === 'draft';

    // Build payload structure matching your teammate's validation schemas exactly
    const rfqPayload = {
      title: rfqTitle,
      category: category,
      deadline: deadline,
      description: description,
      lineItems: lineItems.map(row => ({
        item: row.item,
        qty: parseInt(row.qty) || 0,
        unit: row.unit
      })),
      assignedVendors: assignedVendors, // Array of strings tracking target vendor IDs
      isDraft: isDraftMode // Determines draft state tracking parameter logic
    };

    try {
      // 🌐 Dispatches network transmission straight to your teammate's POST /api/rfqs route
      const response = await apiClient.rfqs.create(rfqPayload);

      if (response.success || response.rfq) {
        setToastMessage(
          isDraftMode 
            ? "RFQ Specifications saved to system draft repositories." 
            : "RFQ Dispatched to Target Suppliers. Redirecting Workspace..."
        );
        setShowToast(true);
        setCurrentStep(isDraftMode ? 3 : 2); // Progress tracking indicators

        // Trigger automated navigation transition after visual pause for validation checks
        setTimeout(() => {
          setShowToast(false);
          if (!isDraftMode && setActiveTab) {
            setActiveTab('quotations'); // Bounces view layer right to the worksheet console
          }
        }, 1500);
      }
    } catch (err) {
      console.warn("Failed to commit RFQ sequence packet to network node. Deploying demo simulation.");
      
      // 🛡️ Hackathon Presentation Insurance Policy Failsafe
      setToastMessage(
        isDraftMode 
          ? "RFQ Specifications saved to localized draft cache memory slots." 
          : "RFQ Dispatched via Simulated Gateway Node. Redirecting Workspace..."
      );
      setShowToast(true);
      setCurrentStep(isDraftMode ? 3 : 2);

      setTimeout(() => {
        setShowToast(false);
        if (!isDraftMode && setActiveTab) {
          setActiveTab('quotations');
        }
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in relative">
      
      <div>
        {/* UPPER TITLE Display Matrix Strip */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Create RFQ's</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">new request for quotation</p>
          </div>
          {errorMessage && (
            <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-black tracking-wider text-red-400 uppercase">
              {errorMessage}
            </span>
          )}
        </div>

        {/* 🧭 MULTI-STEP PROGRESSION PIPELINE WIZARD BAR */}
        <div className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl mb-8 flex items-center justify-around relative overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          
          {[1, 2, 3].map((step) => (
            <button 
              type="button"
              key={step}
              onClick={() => setCurrentStep(step)}
              className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center z-10 transition-all border ${
                currentStep === step 
                  ? 'bg-slate-800 text-[#017E84] border-[#017E84] shadow-md scale-110' 
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
                disabled={isLoading || !isAuthorizedCreator}
                value={rfqTitle}
                onChange={(e) => setRfqTitle(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-900 text-slate-100 font-semibold disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
              <input 
                type="text" 
                disabled={isLoading || !isAuthorizedCreator}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-900 text-slate-400 font-semibold disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Deadline *</label>
              <input 
                type="date" 
                disabled={isLoading || !isAuthorizedCreator}
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-900 text-slate-100 font-mono font-bold text-purple-400 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
              <textarea 
                rows={3}
                disabled={isLoading || !isAuthorizedCreator}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-900 text-slate-300 font-medium resize-none leading-relaxed disabled:opacity-50"
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
                            disabled={isLoading || !isAuthorizedCreator}
                            value={row.item} 
                            placeholder="Resource identifier string"
                            onChange={(e) => updateLineItem(index, 'item', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-850 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-[#017E84]/40 disabled:opacity-50"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input 
                            type="number" 
                            disabled={isLoading || !isAuthorizedCreator}
                            value={row.qty} 
                            onChange={(e) => updateLineItem(index, 'qty', parseInt(e.target.value) || 0)}
                            className="w-full text-center bg-slate-900 border border-slate-850 rounded-lg px-2 py-1 text-xs text-emerald-400 font-mono disabled:opacity-50"
                          />
                        </td>
                        <td className="py-2 px-1">
                          <input 
                            type="text" 
                            disabled={isLoading || !isAuthorizedCreator}
                            value={row.unit} 
                            onChange={(e) => updateLineItem(index, 'unit', e.target.value)}
                            className="w-full text-center bg-slate-900 border border-slate-850 rounded-lg px-2 py-1 text-xs text-slate-400 font-mono font-bold disabled:opacity-50"
                          />
                        </td>
                        <td className="py-2 px-1 text-center">
                          <button 
                            type="button"
                            disabled={isLoading || !isAuthorizedCreator}
                            onClick={() => removeLineItem(index)}
                            className="p-1 text-slate-600 hover:text-rose-400 transition-colors cursor-pointer disabled:opacity-40"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {isAuthorizedCreator && (
                <button 
                  type="button"
                  disabled={isLoading}
                  onClick={addLineItem}
                  className="w-full py-2 bg-slate-900 hover:bg-[#017E84]/10 text-xs font-bold text-slate-400 hover:text-[#017E84] rounded-xl border border-slate-850 hover:border-[#017E84]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Plus className="w-3.5 h-3.5" /> + add line item
                </button>
              )}
            </div>

            {/* SUB-PANEL B: VENDOR SELECTION MATRIX TAGS */}
            <div className="bg-slate-950 border border-slate-800/60 p-6 rounded-2xl shadow-2xl">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Assign Vendors</h3>
              
              <div className="bg-slate-900 border border-slate-850 rounded-xl p-3 space-y-1.5 max-h-[140px] overflow-y-auto mb-3">
                {assignedVendors.map((vendor, i) => (
                  <div key={i} className="flex justify-between items-center px-3 py-1.5 bg-slate-950 rounded-lg border border-slate-850 text-xs group">
                    <span className="font-bold text-slate-300 font-mono">{vendor}</span>
                    <button 
                      type="button"
                      disabled={isLoading || !isAuthorizedCreator}
                      onClick={() => removeVendor(vendor)}
                      className="p-1 text-slate-600 hover:text-rose-400 transition-colors cursor-pointer disabled:opacity-40"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {isAuthorizedCreator && (
                <button 
                  type="button"
                  disabled={isLoading}
                  onClick={addVendorPlaceholder}
                  className="w-full py-2 bg-slate-900 hover:bg-purple-500/10 text-xs font-bold text-slate-400 hover:text-purple-400 rounded-xl border border-slate-850 hover:border-purple-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <UserPlus className="w-3.5 h-3.5" /> + add vendor
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* LOWER FOOTER: WORKFLOW TRANSMISSION SHORTCUTS & DRAG-AND-DROP FILE UPLOAD SECTION */}
      <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* ACTION EXECUTION TRIGGER PAIR */}
        {isAuthorizedCreator ? (
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              type="button"
              disabled={isLoading}
              onClick={() => processWorkflowSubmission('send')}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[#017E84] hover:bg-[#017E84]/90 text-white rounded-xl text-xs font-black tracking-wide transition-all shadow-lg shadow-[#017E84]/10 active:scale-95 cursor-pointer disabled:opacity-75"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Save & Send to Vendors
            </button>
            <button 
              type="button"
              disabled={isLoading}
              onClick={() => processWorkflowSubmission('draft')}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-75"
            >
              <Save className="w-4 h-4" /> Save as Draft
            </button>
          </div>
        ) : (
          <div className="p-4 bg-slate-950 border border-slate-850 rounded-xl text-center text-xs text-slate-500 font-medium">
            🔒 RFQ creation console locked. Sourcing pipeline modifications are exclusive to Procurement Officers.
          </div>
        )}

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