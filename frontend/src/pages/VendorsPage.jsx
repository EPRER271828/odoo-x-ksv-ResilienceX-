import React, { useState } from 'react';
import { 
  UserPlus, Search, Building2, Eye, 
  CheckCircle2, Clock, Ban, X, FileText, ShieldAlert, Phone
} from 'lucide-react';

// Explicit Dataset mapped from your blueprint
const INITIAL_VENDORS = [
  { id: "VND-8821", name: "Infra Supplies Pvt Ltd", category: "Constructions", gst: "27AABCS1429Bz0", contact: "+91 98765 43210", status: "Active" },
  { id: "VND-4409", name: "Tech Core LTD", category: "IT", gst: "27AABCS1429Bz0", contact: "+91 81234 56789", status: "Active" },
  { id: "VND-3112", name: "FastLog Transport", category: "logistics", gst: "27AABCS1429Bz0", contact: "+91 70123 45678", status: "Blocked" },
  { id: "VND-1042", name: "Apex Corporate Hub", category: "Peripherals", gst: "24AKZPS8810K1Z2", contact: "+91 99887 76655", status: "Pending" }
];

export default function VendorsPage() {
  const [vendors, setVendors] = useState(INITIAL_VENDORS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  
  // 🔮 Modal Visibility & Multi-Input Object State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formInput, setFormInput] = useState({
    name: '',
    category: '',
    gst: '',
    contact: '',
    status: 'Active'
  });

  // Intercept data submissions to prepend record into local array tracking stream
  const handleAddVendorSubmit = (e) => {
    e.preventDefault();
    if (!formInput.name.trim()) return;

    // Generate clean unique incremental string ID codes
    const generatedId = `VND-${Math.floor(1000 + Math.random() * 9000)}`;
    const freshRecord = {
      id: generatedId,
      ...formInput
    };

    setVendors([freshRecord, ...vendors]);
    setIsModalOpen(false); // Close Modal form container
    setFormInput({ name: '', category: '', gst: '', contact: '', status: 'Active' }); // Clear out fields
  };

  // Multi-input context tracking logic (Search by Name, GST, or Category)
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vendor.gst.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'All') return matchesSearch;
    return matchesSearch && vendor.status === activeTab;
  });

  // Dynamic Aggregation Tallies for Pill Badges
  const totalCount = vendors.length;
  const activeCount = vendors.filter(v => v.status === 'Active').length;
  const pendingCount = vendors.filter(v => v.status === 'Pending').length;
  const blockedCount = vendors.filter(v => v.status === 'Blocked').length;

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in relative">
      
      <div>
        {/* UPPER TITLE HEADER PANEL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Vendors</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Manage supplier profiles and registrations</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#017E84] hover:bg-[#017E84]/90 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#017E84]/10 active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" /> + Add Vendor
          </button>
        </div>

        {/* SEARCH BAR UTILITY ENGINE */}
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search bar ...... search by name, gst number, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-950 text-slate-100 placeholder-slate-500 font-medium"
          />
        </div>

        {/* PILL FILTERS STATUS MATRIX ROW */}
        <div className="flex flex-wrap gap-2 mb-6 text-xs font-bold">
          <button 
            onClick={() => setActiveTab('All')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeTab === 'All' ? 'bg-slate-800 text-white border-slate-700 shadow-sm' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            All ({totalCount})
          </button>
          <button 
            onClick={() => setActiveTab('Active')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeTab === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Active ({activeCount})
          </button>
          <button 
            onClick={() => setActiveTab('Pending')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeTab === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Pending ({pendingCount})
          </button>
          <button 
            onClick={() => setActiveTab('Blocked')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeTab === 'Blocked' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Blocked ({blockedCount})
          </button>
        </div>

        {/* DATA DIRECTORY LEDGER GRID CONTAINER */}
        <div className="bg-slate-950 border border-slate-800/60 rounded-2xl shadow-2xl overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-black tracking-wider text-slate-500 uppercase bg-slate-900/20">
                  <th className="py-3.5 px-6 w-64">Vendor Name</th>
                  <th className="py-3.5 px-4 w-40">Category</th>
                  <th className="py-3.5 px-4 w-44">GST no.</th>
                  <th className="py-3.5 px-4 w-44">Contact no.</th>
                  <th className="py-3.5 px-4 w-36">Status</th>
                  <th className="py-3.5 px-6 w-32 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs font-semibold text-slate-300">
                {filteredVendors.length > 0 ? (
                  filteredVendors.map((vendor, index) => (
                    <tr key={index} className="hover:bg-slate-900/30 transition-colors">
                      
                      {/* VENDOR COLUMN ELEMENT */}
                      <td className="py-4 px-6 font-bold text-white flex items-center gap-3 truncate">
                        <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 group-hover:text-white shrink-0">
                          <Building2 className="w-3.5 h-3.5 text-[#017E84]" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="truncate">{vendor.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono font-bold mt-0.5 tracking-wider">{vendor.id}</span>
                        </div>
                      </td>

                      {/* CATEGORY ELEMENT */}
                      <td className="py-4 px-4 text-slate-400 capitalize truncate">{vendor.category}</td>

                      {/* GST NO COLUMN */}
                      <td className="py-4 px-4 font-mono text-[11px] text-purple-400 tracking-wide truncate">{vendor.gst}</td>

                      {/* CONTACT NO COLUMN */}
                      <td className="py-4 px-4 font-mono text-slate-400 text-[11px] truncate">{vendor.contact}</td>

                      {/* STATUS BADGES COLUMN */}
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                          vendor.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          vendor.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {vendor.status === 'Active' && <CheckCircle2 className="w-2.5 h-2.5" />}
                          {vendor.status === 'Pending' && <Clock className="w-2.5 h-2.5" />}
                          {vendor.status === 'Blocked' && <Ban className="w-2.5 h-2.5" />}
                          {vendor.status}
                        </span>
                      </td>

                      {/* ACTION CONTROLS BUTTON BLOCK */}
                      <td className="py-4 px-6 text-center">
                        <button className="px-4 py-1.5 bg-slate-900 hover:bg-[#017E84]/10 border border-slate-800 hover:border-[#017E84]/30 text-slate-400 hover:text-[#017E84] rounded-lg font-bold text-[10px] uppercase transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer active:scale-95">
                          <Eye className="w-3 h-3" /> View
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 font-medium tracking-wide">
                      No active suppliers match your current query parameter thresholds.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* LOWER ARCHITECTURAL ACCENT DIVIDER STRIP */}
      <div className="pt-4 border-t border-slate-800/40 text-[10px] font-semibold text-slate-600 tracking-wide flex justify-between items-center mt-8">
        <span>Vendor Core Registry Node Active</span>
        <span>Filters Synced</span>
      </div>

      {/* ========================================================= */}
      {/* 🔮 INTERACTIVE REGISTRATION CAPTURE GLASS MODAL OVERLAY */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scale-up">
            
            {/* Form Header block view wrapper */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#017E84]" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Register Supplier profile</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Core input nodes context fields stream layout */}
            <form onSubmit={handleAddVendorSubmit} className="p-6 space-y-4 text-xs font-bold text-slate-300">
              
              {/* Field 1: Corporate Entity Legal Title Name */}
              <div className="space-y-1.5">
                <label className="text-slate-400 flex items-center gap-1.5 uppercase text-[10px] tracking-wider"><Building2 className="w-3.5 h-3.5" /> Vendor Legal Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Delta Infrastructure Co."
                  value={formInput.name}
                  onChange={(e) => setFormInput({...formInput, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-[#017E84]/50 font-medium text-white text-xs"
                />
              </div>

              {/* Field 2: Industrial Domain Category type */}
              <div className="space-y-1.5">
                <label className="text-slate-400 flex items-center gap-1.5 uppercase text-[10px] tracking-wider"><FileText className="w-3.5 h-3.5" /> Industrial Category</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. IT, Construction, Logistics"
                  value={formInput.category}
                  onChange={(e) => setFormInput({...formInput, category: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-[#017E84]/50 font-medium text-white text-xs"
                />
              </div>

              {/* Field 3: Corporate Tax Registry Number (GSTIN) */}
              <div className="space-y-1.5">
                <label className="text-slate-400 flex items-center gap-1.5 uppercase text-[10px] tracking-wider"><ShieldAlert className="w-3.5 h-3.5" /> GSTIN Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 27AABCS1429Bz0"
                  value={formInput.gst}
                  onChange={(e) => setFormInput({...formInput, gst: e.target.value.toUpperCase()})}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-[#017E84]/50 font-mono text-purple-400 text-xs uppercase tracking-wider"
                />
              </div>

              {/* Field 4: Comms Point Line Contact telephone numbers */}
              <div className="space-y-1.5">
                <label className="text-slate-400 flex items-center gap-1.5 uppercase text-[10px] tracking-wider"><Phone className="w-3.5 h-3.5" /> Primary Contact Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. +91 98321 44521"
                  value={formInput.contact}
                  onChange={(e) => setFormInput({...formInput, contact: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-[#017E84]/50 font-mono text-white text-xs"
                />
              </div>

                {/* Automated Status System Banner Notification */}
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-wider">Automated Onboarding Policy</span>
                <p className="text-[11px] font-medium leading-relaxed text-slate-400">
                    New vendor records are initialized as <span className="text-amber-400 font-bold">Pending</span>. Profiles automatically transition to Active once internal compliance verifies the provided GSTIN structure.
                </p>
                </div>

              {/* Form operations decision CTA buttons row */}
              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-[#017E84] hover:bg-[#017E84]/90 text-white rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Save Supplier
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}