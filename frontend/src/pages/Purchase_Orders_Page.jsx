import React, { useState } from 'react';
import { 
  ShoppingCart, Search, FileSpreadsheet, Eye, 
  CheckCircle2, Clock, XCircle, Building2, ArrowDownAZ 
} from 'lucide-react';

// Comprehensive Procurement Purchase Orders Dataset Matrix
const INITIAL_PURCHASE_ORDERS = [
  { id: "PO-2026-0068", description: "Ergonomic Chairs & Standing Desks", vendor: "Infra Supplies Pvt Ltd", date: "21 May, 2026", amount: "1,85,400", status: "Open" },
  { id: "PO-2026-0052", description: "AI Workstation Infrastructure Setup", vendor: "Tech Core LTD", date: "04 April, 2026", amount: "4,20,000", status: "Completed" },
  { id: "PO-2026-0031", description: "Custom Peripheral Array Bundles", vendor: "OfficeNeed Co", date: "12 March, 2026", amount: "34,900", status: "Completed" },
  { id: "PO-2026-0019", description: "Express Server Rack Logistics Shifting", vendor: "FastLog Transport", date: "18 Feb, 2026", amount: "1,90,000", status: "Cancelled" }
];

export default function Purchase_Orders_Page() {
  const [purchaseOrders] = useState(INITIAL_PURCHASE_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // Multi-input contextual filtering query pipeline
  const filteredOrders = purchaseOrders.filter(order => {
    const matchesFilter = activeFilter === 'All' || order.status === activeFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      order.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Dynamic filter pill tally calculators
  const totalCount = purchaseOrders.length;
  const openCount = purchaseOrders.filter(p => p.status === 'Open').length;
  const completedCount = purchaseOrders.filter(p => p.status === 'Completed').length;
  const cancelledCount = purchaseOrders.filter(p => p.status === 'Cancelled').length;

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in">
      
      <div>
        {/* UPPER TITLE HEADER & OPERATIONS CONTROL DECK */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-[#017E84]" /> Purchase Orders
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Historical tracking registry for outward corporate procurements</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer self-start md:self-auto shadow-md">
            <FileSpreadsheet className="w-4 h-4 text-[#017E84]" /> Export Ledger Sheets
          </button>
        </div>

        {/* SEARCH BAR INPUT ELEMENT */}
        <div className="relative w-full mb-6">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search by purchase order id, descriptive keys, supplier organization names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-xs rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#017E84]/20 focus:border-[#017E84]/40 transition-all bg-slate-950 text-slate-100 placeholder-slate-500 font-medium"
          />
        </div>

        {/* WORKFLOW STATUS INTERCEPTION PILLS ROW */}
        <div className="flex flex-wrap gap-2 mb-6 text-xs font-bold">
          <button 
            onClick={() => setActiveFilter('All')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeFilter === 'All' ? 'bg-slate-800 text-white border-slate-700 shadow-sm' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            All ({totalCount})
          </button>
          <button 
            onClick={() => setActiveFilter('Open')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeFilter === 'Open' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Open ({openCount})
          </button>
          <button 
            onClick={() => setActiveFilter('Completed')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeFilter === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Completed ({completedCount})
          </button>
          <button 
            onClick={() => setActiveFilter('Cancelled')}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${activeFilter === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-950 text-slate-400 border-transparent hover:text-slate-200'}`}
          >
            Cancelled ({cancelledCount})
          </button>
        </div>

        {/* TRANSACTION RECORD LEDGER GRID */}
        <div className="bg-slate-950 border border-slate-800/60 rounded-2xl shadow-2xl overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full table-fixed text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-black tracking-wider text-slate-500 uppercase bg-slate-900/20">
                  <th className="py-3.5 px-6 w-44">PO Identifier</th>
                  <th className="py-3.5 px-4 w-64">Procurement Description</th>
                  <th className="py-3.5 px-4 w-52">Target Vendor</th>
                  <th className="py-3.5 px-4 w-36">Issue Date</th>
                  <th className="py-3.5 px-4 w-36">Total Amount</th>
                  <th className="py-3.5 px-4 w-32">Status</th>
                  <th className="py-3.5 px-6 w-28 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs font-semibold text-slate-300">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-900/30 transition-colors">
                      
                      {/* PO Identifier Cell */}
                      <td className="py-4 px-6 font-mono text-[11px] font-bold text-purple-400 tracking-wide truncate">
                        {order.id}
                      </td>

                      {/* Description Cell */}
                      <td className="py-4 px-4 text-white truncate max-w-xs font-bold">
                        {order.description}
                      </td>

                      {/* Vendor Cell */}
                      <td className="py-4 px-4 text-slate-400 flex items-center gap-2 truncate py-4">
                        <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{order.vendor}</span>
                      </td>

                      {/* Issue Date Cell */}
                      <td className="py-4 px-4 text-slate-400 font-mono text-[11px]">
                        {order.date}
                      </td>

                      {/* Total Amount Cell */}
                      <td className="py-4 px-4 font-mono font-bold text-slate-200">
                        ₹{order.amount}
                      </td>

                      {/* Status Badges Cell */}
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                          order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          order.status === 'Open' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {order.status === 'Completed' && <CheckCircle2 className="w-2.5 h-2.5" />}
                          {order.status === 'Open' && <Clock className="w-2.5 h-2.5" />}
                          {order.status === 'Cancelled' && <XCircle className="w-2.5 h-2.5" />}
                          {order.status}
                        </span>
                      </td>

                      {/* Action Cell */}
                      <td className="py-4 px-6 text-center">
                        <button className="px-3 py-1.5 bg-slate-900 hover:bg-[#017E84]/10 border border-slate-800 hover:border-[#017E84]/30 text-slate-400 hover:text-[#017E84] rounded-lg font-bold text-[10px] uppercase transition-all mx-auto flex items-center gap-1 cursor-pointer active:scale-95">
                          <Eye className="w-3 h-3" /> View
                        </button>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-medium tracking-wide">
                      No matching purchase order records found in the directory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* LOWER DECK BOUNDARY ANCHOR STRIP */}
      <div className="pt-4 border-t border-slate-800/40 text-[10px] font-semibold text-slate-600 tracking-wide flex justify-between items-center mt-8">
        <span>Purchase Order Registry Stack Verified</span>
        <span className="flex items-center gap-1 font-mono"><ArrowDownAZ className="w-3.5 h-3.5" /> Ordered by Descending IDs</span>
      </div>

    </div>
  );
}