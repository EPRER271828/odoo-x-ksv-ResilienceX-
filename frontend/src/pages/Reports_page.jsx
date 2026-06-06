import React from 'react';
import { 
  BarChart3, Calendar, Download, TrendingUp, Users, 
  CheckCircle, AlertTriangle, ArrowUpRight 
} from 'lucide-react';

export default function Reports_page() {
  
  // Datasets extracted exactly from your image_1c7dbe.png blueprint
  const spendByCategory = [
    { name: "IT Hardware", amount: "4.8L", raw: 480000, width: "w-[85%]", color: "bg-blue-500" },
    { name: "Furniture", amount: "3.2L", raw: 320000, width: "w-[60%]", color: "bg-emerald-500" },
    { name: "Stationery", amount: "2.1L", raw: 210000, width: "w-[40%]", color: "bg-amber-500" },
    { name: "Logistics", amount: "2.3L", raw: 230000, width: "w-[45%]", color: "bg-rose-500" }
  ];

  const topVendors = [
    { name: "TechCore Ltd", spend: "4,20,000", pos: 6 },
    { name: "Infra Supplies", spend: "3,10,000", pos: 4 },
    { name: "FastLog", spend: "1,90,000", pos: 3 }
  ];

  const monthlyTrends = [
    { month: "Dec", height: "h-8" },
    { month: "Jan", height: "h-12" },
    { month: "Feb", height: "h-10" },
    { month: "Mar", height: "h-16" },
    { month: "Apr", height: "h-14" },
    { month: "May", height: "h-20", highlight: true } // May is the active highlighted column
  ];

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in">
      
      <div>
        {/* UPPER TITLE HEADER AND DATE CONTROLLERS BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Reports & analytics</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5 font-mono text-[#017E84]">
              Procurement Insights — May 2026
            </p>
          </div>
          
          {/* Calendar selection and document export controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto text-xs font-bold">
            <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl font-mono text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-purple-400" /> May 2026
            </div>
            <button className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-200 rounded-xl transition-all active:scale-95 cursor-pointer">
              <Download className="w-3.5 h-3.5 text-[#017E84]" /> Export
            </button>
          </div>
        </div>

        {/* 📊 FOUR-UP PERFORMANCE COUNTER BLOCKS MATRIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* TOTAL SPEND BLOCK */}
          <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-blue-400 tracking-tight mb-0.5">12.4 L</span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-500" /> total spend
            </span>
          </div>

          {/* ACTIVE VENDORS BLOCK */}
          <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-emerald-400 tracking-tight mb-0.5">28</span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-500" /> Active vendors
            </span>
          </div>

          {/* PO FULFILLMENT RATIO BLOCK */}
          <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-amber-500 tracking-tight mb-0.5">94%</span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-amber-500" /> PO Fulfillment
            </span>
          </div>

          {/* OVERDUE INVOICES BLOCK */}
          <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-rose-400 tracking-tight mb-0.5">3</span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> overdue invoices
            </span>
          </div>

        </div>

        {/* LOWER SPLIT GRID DECK: CATEGORY BARS VS VENDOR & TRENDS PANELS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* LEFT COLUMN: SPEND BY CATEGORY HORIZONTAL METERS */}
          <div className="bg-slate-950 border border-slate-800/60 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Spend by Category</h3>
              <p className="text-[10px] text-slate-500 font-semibold font-mono">Resource allocation breakdowns</p>
            </div>

            <div className="space-y-5 my-6 flex-1 flex flex-col justify-center">
              {spendByCategory.map((cat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300">{cat.name}</span>
                    <span className="font-mono text-white">₹{cat.amount}</span>
                  </div>
                  {/* Custom horizontal progress meter track */}
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-850">
                    <div className={`${cat.color} ${cat.width} h-full rounded-full transition-all duration-500`} />
                  </div>
                </div>
              ))}
            </div>

            <span className="text-[10px] font-bold text-slate-500 text-center block border-t border-slate-900 pt-3">
              Metrics calculate full cumulative transactional pools
            </span>
          </div>

          {/* RIGHT COLUMN: TOP VENDORS LEDGER AND HISTORICAL MONKEY TREND GRAPHS */}
          <div className="space-y-6 flex flex-col justify-between">
            
            {/* SUB-PANEL A: TOP SUPPLIERS LEDGER */}
            <div className="bg-slate-950 border border-slate-800/60 rounded-2xl p-5 shadow-2xl flex-1 flex flex-col justify-between">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Top Vendors by Spend</h3>
              
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-900 text-[9px] font-black tracking-wider text-slate-500 uppercase bg-slate-900/10">
                      <th className="py-2 px-3">Vendor</th>
                      <th className="py-2 px-3 text-right">Spend (₹)</th>
                      <th className="py-2 px-4 text-center w-20">POs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900 text-xs font-semibold text-slate-300">
                    {topVendors.map((vendor, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/20 transition-colors">
                        <td className="py-2.5 px-3 text-white font-bold">{vendor.name}</td>
                        <td className="py-2.5 px-3 text-right font-mono text-purple-400">₹{vendor.spend}</td>
                        <td className="py-2.5 px-4 text-center font-mono text-slate-400">{vendor.pos}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SUB-PANEL B: MONTHLY ANALYTICS TREND COLUMN GRAPHICS */}
            <div className="bg-slate-950 border border-slate-800/60 rounded-2xl p-5 shadow-2xl flex-1 flex flex-col justify-between">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Monthly Trend</h3>
              
              {/* Graphical representation bar columns stack layout matching mockup graph shapes */}
              <div className="flex items-end justify-between px-4 bg-slate-900/20 border border-slate-850 rounded-xl pt-8 pb-3 min-h-[112px]">
                {monthlyTrends.map((col, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                    {/* The bar pillar vector link */}
                    <div className={`w-full max-w-[28px] ${col.height} rounded-t transition-all duration-300 ${
                      col.highlight 
                        ? 'bg-[#017E84] shadow-lg shadow-[#017E84]/20 group-hover:bg-[#017E84]/80' 
                        : 'bg-blue-950/40 border border-blue-900/30 group-hover:bg-blue-900/20'
                    }`} />
                    <span className={`text-[9px] font-bold font-mono ${col.highlight ? 'text-white font-black' : 'text-slate-500'}`}>
                      {col.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* LOWER FOOTER ANALYTICAL COMPLIANCE DECK */}
      <div className="pt-4 border-t border-slate-800/40 text-[10px] font-semibold text-slate-600 tracking-wide flex justify-between items-center mt-8">
        <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5 text-[#017E84]" /> Core Analytical Pipeline Connected</span>
        <span className="flex items-center gap-1 text-[#017E84] hover:underline cursor-pointer">Generate Comprehensive Annual Audit <ArrowUpRight className="w-3 h-3" /></span>
      </div>

    </div>
  );
}