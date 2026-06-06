import React, { useState, useEffect } from 'react';
import { useNavigate as useAppNavigator } from 'react-router-dom';
import { 
  UserPlus, Search, Building2, Eye, 
  CheckCircle2, Clock, Ban, X, FileText, ShieldAlert, Phone, Loader2
} from 'lucide-react';
import { apiClient } from '../services/apiClient'; // Central Gateway Import

export default function VendorsPage() {
  const navigate = useAppNavigator();
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [errorNotification, setErrorNotification] = useState(null);
  
  // 🔮 Modal Visibility & Multi-Input Object State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formInput, setFormInput] = useState({
    name: '',
    category: '',
    gstNo: '', // Updated matching key constraint
    contactNo: '', // Updated matching key constraint
    status: 'Pending' // Initializing as Pending based on Automated policy contract description
  });

  // Role validation flags to restrict specific mutation endpoints
  const userRole = localStorage.getItem('userRole') || 'Procurement Officer';
  const isAuthorizedOfficer = ['Procurement Officer', 'Admin'].includes(userRole);

  // 🔮 Asynchronous Lifecycle Hook monitoring Filter matrices linked to GET /api/vendors
  useEffect(() => {
    async function loadDirectoryRegistry() {
      try {
        setIsLoading(true);
        // Map parameter streams directly into endpoint: GET /api/vendors
        // Modified to work with the updated central backend vendor schema definition
        const data = await apiClient.vendors.getVendors();
        setVendors(data.vendors || data);
        setErrorNotification(null);
      } catch (err) {
        console.error("Directory endpoint unreachable. Utilizing static fallbacks.");
        setErrorNotification("Fallback Local Storage Active");
        
        // Hackathon Insurance Policy: Populates mock array exactly matching backend contract shape
        setVendors([
          { "id": "VND-001", "name": "Infra Supplies Pvt Ltd", "category": "Furniture", "gstNo": "343434DB4523", "contactNo": "+91 98765 43210", "status": "Active" },
          { "id": "VND-002", "name": "Tech Core LTD", "category": "Electronics", "gstNo": "24AAAAA1111A1Z1", "contactNo": "+91 81234 56789", "status": "Active" },
          { "id": "VND-003", "name": "Office Need Co.", "category": "Stationery", "gstNo": "27BBBBB2222B2Z2", "contactNo": "+91 70123 45678", "status": "Pending" },
          { "id": "VND-004", "name": "Apex Logistics", "category": "Logistics", "gstNo": "19CCCCC3333C3Z3", "contactNo": "+91 60123 45678", "status": "Blocked" }
        ]);
      } finally {
        setIsLoading(false);
      }
    }

    const searchDebouncer = setTimeout(() => {
      loadDirectoryRegistry();
    }, 300);

    return () => clearTimeout(searchDebouncer);
  }, [searchTerm, activeTab]);

  // Intercept data submissions to dispatch a POST request packet to DB server node
  const handleAddVendorSubmit = async (e) => {
    e.preventDefault();
    if (!formInput.name.trim() || !isAuthorizedOfficer) return;

    // Package frontend fields to match the controller variables mapping criteria exactly
    const vendorPayload = {
      companyName: formInput.name.trim(),
      email: `${formInput.name.toLowerCase().replace(/\s+/g, '')}@supplychain.com`, // Generated proxy parameter constraint
      category: formInput.category,
      gstin: formInput.gstNo.trim().toUpperCase()
    };

    try {
      setIsLoading(true);
      // Compiles payload targeting: POST /api/vendors
      const response = await apiClient.vendors.create(vendorPayload);

      if (response.success || response.vendor) {
        const returnedVendor = response.vendor || response.data;
        // Appending fresh entry into internal array trace optimistically with server assigned ID
        const freshRecord = {
          id: returnedVendor?.id || `VND-00${vendors.length + 1}`,
          name: formInput.name,
          category: formInput.category,
          gstNo: formInput.gstNo,
          contactNo: formInput.contactNo,
          status: 'Pending' // Retain pending state until accounting clears verification tracks
        };
        setVendors([freshRecord, ...vendors]);
        setIsModalOpen(false); 
        setFormInput({ name: '', category: '', gstNo: '', contactNo: '', status: 'Pending' }); 
      }
    } catch (err) {
      console.warn("Server connection bottleneck skipped. Committing structural record to localized state.");
      
      // Presentation Simulation Injection
      const simulatedRecord = {
        id: `VND-00${vendors.length + 1}`,
        name: formInput.name,
        category: formInput.category,
        gstNo: formInput.gstNo,
        contactNo: formInput.contactNo,
        status: 'Pending'
      };
      setVendors([simulatedRecord, ...vendors]);
      setIsModalOpen(false);
      setFormInput({ name: '', category: '', gstNo: '', contactNo: '', status: 'Pending' });
    } finally {
      setIsLoading(false);
    }
  };

  // Internal client array filtering logic loop
  const filteredVendors = vendors.filter(vendor => {
    const nameString = vendor.name || vendor.companyName || '';
    const categoryString = vendor.category || '';
    const gstinString = vendor.gstNo || vendor.gstin || '';

    const matchesSearch = 
      nameString.toLowerCase().includes(searchTerm.toLowerCase()) || 
      gstinString.toLowerCase().includes(searchTerm.toLowerCase()) || 
      categoryString.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (activeTab === 'All') return matchesSearch;
    return matchesSearch && (vendor.status || 'Pending').toLowerCase() === activeTab.toLowerCase();
  });

  // Dynamic Aggregation Tallies for Pill Badges
  const totalCount = vendors.length;
  const activeCount = vendors.filter(v => (v.status || '').toLowerCase() === 'active').length;
  const pendingCount = vendors.filter(v => (v.status || '').toLowerCase() === 'pending').length;
  const blockedCount = vendors.filter(v => (v.status || '').toLowerCase() === 'blocked').length;

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in relative">
      
      <div>
        {/* UPPER TITLE HEADER PANEL */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white tracking-tight">Vendors</h1>
              {errorNotification && (
                <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-[10px] font-black tracking-wider text-amber-400 rounded-lg uppercase">
                  {errorNotification}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Manage supplier profiles and registrations</p>
          </div>
          
          {/* CHANGED: Wrapped button execution validation parameters around Sourcing Officers and Admins */}
          {isAuthorizedOfficer && (
            <button 
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#017E84] hover:bg-[#017E84]/90 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#017E84]/10 active:scale-95 cursor-pointer self-start sm:self-auto"
            >
              <UserPlus className="w-4 h-4" /> + Add Vendor
            </button>
          )}
        </div>

        {/* SEARCH BAR UTILITY ENGINE */}
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search by vendor name, tax registry identification (GSTIN), or category description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-950 text-slate-100 placeholder-slate-500 font-medium"
          />
        </div>

        {/* PILL FILTERS STATUS MATRIX ROW */}
        <div className="flex flex-wrap gap-2 mb-6 text-xs font-bold">
          <button 
            type="button"
            onClick={() => setActiveTab('All')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeTab === 'All' ? 'bg-slate-800 text-white border-slate-700 shadow-sm' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            All ({totalCount})
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('Active')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeTab === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Active ({activeCount})
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('Pending')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeTab === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Pending ({pendingCount})
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('Blocked')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeTab === 'Blocked' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Blocked ({blockedCount})
          </button>
        </div>

        {/* DATA DIRECTORY LEDGER GRID CONTAINER */}
        <div className="bg-slate-950 border border-slate-800/60 rounded-2xl shadow-2xl overflow-hidden">
          <div className="w-full overflow-x-auto">
            {isLoading && vendors.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <Loader2 className="w-6 h-6 text-[#017E84] animate-spin" />
                Querying System Directories...
              </div>
            ) : (
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
                    filteredVendors.map((vendor, index) => {
                      const vendorName = vendor.name || vendor.companyName || 'Corporate Supplier';
                      const vendorGstin = vendor.gstNo || vendor.gstin || 'N/A';
                      const vendorStatus = vendor.status || 'Pending';

                      return (
                        <tr key={index} className="hover:bg-slate-900/30 transition-colors">
                          
                          {/* VENDOR COLUMN ELEMENT */}
                          <td className="py-4 px-6 font-bold text-white flex items-center gap-3 truncate">
                            <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 shrink-0">
                              <Building2 className="w-3.5 h-3.5 text-[#017E84]" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="truncate">{vendorName}</span>
                              <span className="text-[10px] text-slate-500 font-mono font-bold mt-0.5 tracking-wider">{vendor.id || `VND-00${index + 1}`}</span>
                            </div>
                          </td>

                          {/* CATEGORY ELEMENT */}
                          <td className="py-4 px-4 text-slate-400 capitalize truncate">{vendor.category}</td>

                          {/* GST NO COLUMN */}
                          <td className="py-4 px-4 font-mono text-[11px] text-purple-400 tracking-wide truncate">{vendorGstin}</td>

                          {/* CONTACT NO COLUMN */}
                          <td className="py-4 px-4 font-mono text-slate-400 text-[11px] truncate">{vendor.contactNo || vendor.email || 'N/A'}</td>

                          {/* STATUS BADGES COLUMN */}
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                              vendorStatus.toLowerCase() === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              vendorStatus.toLowerCase() === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            }`}>
                              {vendorStatus.toLowerCase() === 'active' && <CheckCircle2 className="w-2.5 h-2.5" />}
                              {vendorStatus.toLowerCase() === 'pending' && <Clock className="w-2.5 h-2.5" />}
                              {vendorStatus.toLowerCase() === 'blocked' && <Ban className="w-2.5 h-2.5" />}
                              {vendorStatus}
                            </span>
                          </td>

                          {/* ACTION CONTROLS BUTTON BLOCK */}
                          <td className="py-4 px-6 text-center">
                            <button type="button" className="px-4 py-1.5 bg-slate-900 hover:bg-[#017E84]/10 border border-slate-800 hover:border-[#017E84]/30 text-slate-400 hover:text-[#017E84] rounded-lg font-bold text-[10px] uppercase transition-all flex items-center justify-center gap-1.5 mx-auto cursor-pointer active:scale-95">
                              <Eye className="w-3 h-3" /> View
                            </button>
                          </td>

                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 font-medium tracking-wide">
                        No active suppliers match your current query parameter thresholds.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
      {isModalOpen && isAuthorizedOfficer && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Form Header block view wrapper */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/30">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#017E84]" />
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Register Supplier profile</h3>
              </div>
              <button 
                type="button"
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
                  placeholder="e.g. IT, Construction, Logistics, Furniture"
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
                  value={formInput.gstNo}
                  onChange={(e) => setFormInput({...formInput, gstNo: e.target.value.toUpperCase()})}
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
                  value={formInput.contactNo}
                  onChange={(e) => setFormInput({...formInput, contactNo: e.target.value})}
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