import React, { useState } from 'react';
import { 
  Download, Printer, Mail, Building, FileText, 
  Calendar, CheckCircle, CreditCard, AlertCircle 
} from 'lucide-react';

export default function Invoices_Page() {
  // ⚡ Interactive state loop to toggle the invoice clearance status
  const [paymentStatus, setPaymentStatus] = useState('Pending Payment');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const invoiceData = {
    poNumber: "PO-2025-0068",
    poDate: "21 May, 2026",
    invoiceDate: "22 May, 2026",
    dueDate: "21 June, 2026",
    subtotal: 169500,
    cgst: 15255,
    sgst: 15255,
    grandTotal: 200010,
    lineItems: [
      { item: "Ergonomic chair", qty: 25, unitPrice: 3500, total: 87500 },
      { item: "Tech Core LTD", qty: 10, unitPrice: 8200, total: 82000 }
    ],
    vendor: {
      name: "Infra supplies pvt ltd",
      email: "billing@infrasupplies.com" // Added explicitly to empower mailto execution links
    }
  };

  // =========================================================
  // 🛠️ DOCUMENT OPERATIONS ACTION HANDLERS
  // =========================================================

  // Triggers native browser window print-spooler layer (Handles both structural layout Printing and Save-As-PDF)
  const executeBrowserPrint = (modeText) => {
    window.print();
    setToastMessage(modeText === 'pdf' ? 'PDF File Download Pipeline Triggered' : 'Document Dispatched to System Spooler');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // Triggers system deep-link mail service pre-formatted parsing block
  const handleEmailInvoiceAction = () => {
    const emailSubject = encodeURIComponent(`Invoice Processing Ledger Confirmation - ${invoiceData.poNumber}`);
    const emailBody = encodeURIComponent(
      `Dear ${invoiceData.vendor.name} Accounts Team,\n\n` +
      `This auto-generated report confirms processing state tracking updates for order profile: ${invoiceData.poNumber}.\n\n` +
      `Current Balance Parameters:\n` +
      `• Invoice Date: ${invoiceData.invoiceDate}\n` +
      `• Total Balance: ₹${invoiceData.grandTotal.toLocaleString('en-IN')}\n` +
      `• Clearance Processing State: ${paymentStatus}\n\n` +
      `Regards,\nProcurement Compliance Operations Node`
    );

    window.location.href = `mailto:${invoiceData.vendor.email}?subject=${emailSubject}&body=${emailBody}`;
    setToastMessage('System Mail Client Context Dispatched');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in relative">
      
      {/* 🖨️ CUSTOM INLINE PRINT INTERCEPTION MEDIA QUERIES */}
      <style>{`
        @media print {
          /* Cleanly strip out all background panels and dashboard navigation bars */
          nav, sidebar, button, .no-print, .global-navbar, .global-sidebar {
            display: none !important;
          }
          body, .min-h-screen, .bg-slate-900 {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .invoice-document-card {
            background: #ffffff !important;
            border: none !important;
            box-shadow: none !important;
            color: #000000 !important;
            width: 100% !important;
            padding: 0 !important;
          }
          .text-white, .text-slate-100, .text-slate-300 { color: #000000 !important; }
          .text-slate-400, .text-slate-500 { color: #374151 !important; }
          .bg-slate-950, .bg-slate-900\/20, .bg-slate-900\/40 { background: #f3f4f6 !important; border-color: #d1d5db !important; }
          .border-slate-800, .border-slate-850 { border-color: #e5e7eb !important; }
          .text-purple-400 { color: #5b21b6 !important; }
          .text-emerald-400 { color: #065f46 !important; }
        }
      `}</style>

      <div className="invoice-document-card max-w-5xl w-full mx-auto">
        {/* UPPER TITLE HEADER & DOCUMENT UTILITY ACTIONS BUTTON STRIP */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6 no-print">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Purchase Order & Invoice</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5 font-mono text-[#017E84]">
              PO-2024-auto-generated after approval
            </p>
          </div>
          
          {/* Action Document Utility Triggers */}
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => executeBrowserPrint('pdf')}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95 shadow-md"
            >
              <Download className="w-4 h-4 text-[#017E84]" /> Download PDF
            </button>
            <button 
              onClick={() => executeBrowserPrint('print')}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95 shadow-md"
            >
              <Printer className="w-4 h-4 text-purple-400" /> Print
            </button>
            <button 
              onClick={handleEmailInvoiceAction}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/30 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95 shadow-md"
            >
              <Mail className="w-4 h-4 text-amber-400" /> Email invoice
            </button>
          </div>
        </div>

        {/* 🏢 ENTITY ADDRESS MATRIX AND RECORD SCHEDULING CARD */}
        <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 shadow-2xl mb-8 space-y-6">
          
          {/* Address Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* Bill To Entity Row */}
            <div className="space-y-1">
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Bill to:</span>
              <p className="text-white font-black text-sm flex items-center gap-1.5">
                <Building className="w-4 h-4 text-[#017E84]" /> Your Organization Name
              </p>
              <p className="text-slate-400 font-medium">123 business park, ahmedabad</p>
              <p className="text-purple-400 font-mono font-bold text-[11px] mt-1">GSTIN: 253834384FB</p>
            </div>
            
            {/* Vendor Entity Row */}
            <div className="space-y-1">
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Vendor:</span>
              <p className="text-white font-black text-sm flex items-center gap-1.5">
                <Building className="w-4 h-4 text-purple-400" /> Infra supplies pvt ltd
              </p>
              <p className="text-slate-400 font-medium">456, industrial estate, surat</p>
              <p className="text-purple-400 font-mono font-bold text-[11px] mt-1">GSTIN: 343434DB4523</p>
            </div>
          </div>

          <div className="border-t border-slate-900 my-4" />

          {/* Record Schedule Parameters Ledger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold font-mono">
            <div className="bg-slate-900/40 p-3 border border-slate-850 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans mb-0.5">PO Number:</span>
              <span className="text-white">{invoiceData.poNumber}</span>
            </div>
            <div className="bg-slate-900/40 p-3 border border-slate-850 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans mb-0.5">Invoice Date:</span>
              <span className="text-slate-300">{invoiceData.invoiceDate}</span>
            </div>
            <div className="bg-slate-900/40 p-3 border border-slate-850 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans mb-0.5">PO Date:</span>
              <span className="text-slate-300">{invoiceData.poDate}</span>
            </div>
            <div className="bg-slate-900/40 p-3 border border-slate-850 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans mb-0.5">Due Date:</span>
              <span className="text-purple-400">{invoiceData.dueDate}</span>
            </div>
          </div>

        </div>

        {/* 📊 INVOICE STATEMENT LINE ITEMS DETAIL GRID */}
        <div className="bg-slate-950 border border-slate-800/60 rounded-2xl shadow-2xl overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/20 text-[10px] font-black tracking-wider text-slate-500 uppercase border-b border-slate-800">
                  <th className="py-3.5 px-6 w-5/12">Item</th>
                  <th className="py-3.5 px-4 text-center w-24">Qty</th>
                  <th className="py-3.5 px-4 text-right w-36">Unit Price</th>
                  <th className="py-3.5 px-6 text-right w-40">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs font-semibold text-slate-300">
                {invoiceData.lineItems.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#017E84]" /> {row.item}
                    </td>
                    <td className="py-4 px-4 text-center font-mono text-slate-400">{row.qty}</td>
                    <td className="py-4 px-4 text-right font-mono">₹{row.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-6 text-right font-mono text-white">₹{row.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
                
                {/* FINANCIAL COMPILATION LEDGER SUB-TABLE FIELDS */}
                <tr className="bg-slate-900/10">
                  <td colSpan="2" className="border-t border-slate-900"></td>
                  <td className="py-2 px-4 text-right text-slate-500 font-bold uppercase tracking-wider text-[9px] border-t border-slate-900">Subtotal</td>
                  <td className="py-2 px-6 text-right font-mono font-bold text-slate-300 border-t border-slate-900">₹{invoiceData.subtotal.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-slate-900/10">
                  <td colSpan="2"></td>
                  <td className="py-2 px-4 text-right text-slate-500 font-bold uppercase tracking-wider text-[9px]">CGST (9%)</td>
                  <td className="py-2 px-6 text-right font-mono font-bold text-purple-400">+ ₹{invoiceData.cgst.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-slate-900/10">
                  <td colSpan="2"></td>
                  <td className="py-2 px-4 text-right text-slate-500 font-bold uppercase tracking-wider text-[9px]">SGST (9%)</td>
                  <td className="py-2 px-6 text-right font-mono font-bold text-purple-400">+ ₹{invoiceData.sgst.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-slate-900/20">
                  <td colSpan="2" className="border-t border-slate-850"></td>
                  <td className="py-3 px-4 text-right text-slate-300 font-black uppercase tracking-wider text-[10px] border-t border-slate-850">Grand Total</td>
                  <td className="py-3 px-6 text-right font-mono font-black text-emerald-400 text-sm border-t border-slate-850">₹{invoiceData.grandTotal.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* LOWER FOOTER WORKFLOW RECONCILIATION CLOSURE STRIP */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 no-print">
        
        {/* Dynamic Status Pill Badge Pair Group */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status:</span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${
            paymentStatus === 'Paid' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-lg shadow-amber-950/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${paymentStatus === 'Paid' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
            {paymentStatus}
          </span>
        </div>

        {/* Action Trigger to mutate state */}
        {paymentStatus === 'Pending Payment' && (
          <button 
            onClick={() => setPaymentStatus('Paid')}
            className="text-xs font-black text-[#017E84] hover:text-[#017E84]/80 flex items-center gap-1 hover:underline transition-all cursor-pointer"
          >
            Mark as Paid <CheckCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* RUNTIME HUD NOTIFICATION TOAST BOX */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-slate-950 border border-[#017E84]/30 shadow-2xl p-4 rounded-2xl flex items-center gap-3 animate-fade-in z-50 no-print">
          <div className="w-8 h-8 rounded-xl bg-[#017E84]/10 flex items-center justify-center text-[#017E84]">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider">Operation Registered</h4>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}

    </div>
  );
}