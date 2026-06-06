import React, { useState, useEffect } from 'react';
import { 
  Download, Printer, Mail, Building, FileText, 
  Calendar, CheckCircle, CreditCard, AlertCircle, Loader2 
} from 'lucide-react';
import { apiClient } from '../services/apiClient'; // Central Gateway Import

export default function Invoices_Page() {
  // 🔄 Operational API Lifecycle State Modules
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);

  const [paymentStatus, setPaymentStatus] = useState('Pending Payment');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Baseline hardcoded entry lookup parameter matching your API Contract specifications
  const targetInvoiceId = "INV-2025-9941";

  // Grab session parameters for button validation guards
  const userRole = localStorage.getItem('userRole') || 'Procurement Officer';
  const isAuthorizedOfficer = ['Procurement Officer', 'Admin'].includes(userRole);

  // 🔮 Asynchronous Mounting Lifecycle Hook matched to Screen 9 API Contract
  useEffect(() => {
    async function loadInvoiceDocument() {
      try {
        setIsLoading(true);
        // Executes GET /api/documents/invoice/:invoiceId
        const data = await apiClient.documents.getInvoice(targetInvoiceId);
        setInvoice(data);
        setPaymentStatus(data.status); // Synchronize state tracker with server record status
        setErrorStatus(null);
      } catch (err) {
        console.error("Invoices backend endpoint unreachable. Injecting system insurance fallbacks.");
        setErrorStatus("Local Simulation Ledger Active");
        
        // Hackathon Insurance Policy: Structured precisely to match Screen 9 contract schemas
        setInvoice({
          invoiceId: "INV-2025-0068",
          poNumber: "PO-2025-0068",
          poDate: "2025-05-21",
          invoiceDate: "2025-05-22",
          dueDate: "2025-06-21",
          status: "Pending Payment",
          billTo: {
            organizationName: "Your Organization Name",
            address: "123 business park, ahmedabad",
            gstin: "253834384AFB"
          },
          vendor: {
            companyName: "Infra supplies pvt ltd",
            address: "456, industrial estate, surat",
            gstin: "343434DB4523",
            email: "billing@infrasupplies.com"
          },
          lineItems: [
            { item: "Ergonomic chair", qty: 25, unitPrice: 3500, total: 87500 },
            { item: "Tech Core LTD", qty: 10, unitPrice: 8200, total: 82000 }
          ],
          financials: {
            subtotal: 169500,
            cgstAmount: 15255,
            sgstAmount: 15255,
            grandTotal: 200010
          }
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadInvoiceDocument();
  }, []);

  // =========================================================
  // 🛠️ DOCUMENT OPERATIONS ACTION HANDLERS
  // =========================================================

  const executeBrowserPrint = (modeText) => {
    window.print();
    setToastMessage(modeText === 'pdf' ? 'PDF File Download Pipeline Triggered' : 'Document Dispatched to System Spooler');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // Triggers automated update execution targeting: POST /api/documents/invoice/:invoiceId/action
  const handleMarkAsPaidAction = async () => {
    if (!isAuthorizedOfficer) return;
    try {
      setIsLoading(true);
      const response = await apiClient.documents.executeInvoiceAction(targetInvoiceId, "MARK_AS_PAID");
      
      if (response.success) {
        setPaymentStatus(response.updatedStatus); // Sets UI state to 'Paid' smoothly
        setToastMessage(response.message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
      }
    } catch (err) {
      alert(`Ledger State Sync Exception: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailInvoiceAction = async () => {
    if (!invoice) return;
    try {
      // Trigger API log behavior tracking right before opening local client pipeline
      await apiClient.documents.executeInvoiceAction(targetInvoiceId, "EMAIL_INVOICE");
    } catch (err) {
      console.warn("Audit logger skipped tracking email execution event structural updates.");
    }

    const emailSubject = encodeURIComponent(`Invoice Processing Ledger Confirmation - ${invoice.poNumber}`);
    const emailBody = encodeURIComponent(
      `Dear ${invoice.vendor.companyName} Accounts Team,\n\n` +
      `This auto-generated report confirms processing state tracking updates for order profile: ${invoice.poNumber}.\n\n` +
      `Current Balance Parameters:\n` +
      `• Invoice Date: ${invoice.invoiceDate}\n` +
      `• Total Balance: ₹${invoice.financials.grandTotal.toLocaleString('en-IN')}\n` +
      `• Clearance Processing State: ${paymentStatus}\n\n` +
      `Regards,\nProcurement Compliance Operations Node`
    );

    window.location.href = `mailto:${invoice.vendor.email || 'billing@infrasupplies.com'}?subject=${emailSubject}&body=${emailBody}`;
    setToastMessage('System Mail Client Context Dispatched');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // Active resolution spinner matrix block
  if (isLoading || !invoice) {
    return (
      <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#017E84] animate-spin" />
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Compiling Document Calculations...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-900 text-slate-100 p-8 font-sans antialiased flex flex-col justify-between animate-fade-in relative">
      
      {/* 🖨️ PRINT INTERCEPTION MEDIA STYLES */}
      <style>{`
        @media print {
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
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white tracking-tight">Purchase Order & Invoice</h1>
              {errorStatus && (
                <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-[10px] font-black tracking-wider text-amber-400 rounded-lg uppercase">
                  {errorStatus}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5 font-mono text-[#017E84]">
              {invoice.invoiceId} — Document Manifest
            </p>
          </div>
          
          {/* Action Document Utility Triggers */}
          <div className="flex flex-wrap gap-3">
            <button 
              type="button"
              onClick={() => executeBrowserPrint('pdf')}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95 shadow-md"
            >
              <Download className="w-4 h-4 text-[#017E84]" /> Download PDF
            </button>
            <button 
              type="button"
              onClick={() => executeBrowserPrint('print')}
              className="flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95 shadow-md"
            >
              <Printer className="w-4 h-4 text-purple-400" /> Print
            </button>
            <button 
              type="button"
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
                <Building className="w-4 h-4 text-[#017E84]" /> {invoice.billTo.organizationName}
              </p>
              <p className="text-slate-400 font-medium">{invoice.billTo.address}</p>
              <p className="text-purple-400 font-mono font-bold text-[11px] mt-1">GSTIN: {invoice.billTo.gstin}</p>
            </div>
            
            {/* Vendor Entity Row */}
            <div className="space-y-1">
              <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Vendor:</span>
              <p className="text-white font-black text-sm flex items-center gap-1.5">
                <Building className="w-4 h-4 text-purple-400" /> {invoice.vendor.companyName}
              </p>
              <p className="text-slate-400 font-medium">{invoice.vendor.address}</p>
              <p className="text-purple-400 font-mono font-bold text-[11px] mt-1">GSTIN: {invoice.vendor.gstin}</p>
            </div>
          </div>

          <div className="border-t border-slate-900 my-4" />

          {/* Record Schedule Parameters Ledger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold font-mono">
            <div className="bg-slate-900/40 p-3 border border-slate-800 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans mb-0.5">PO Number:</span>
              <span className="text-white">{invoice.poNumber}</span>
            </div>
            <div className="bg-slate-900/40 p-3 border border-slate-800 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans mb-0.5">Invoice Date:</span>
              <span className="text-slate-300">{invoice.invoiceDate}</span>
            </div>
            <div className="bg-slate-900/40 p-3 border border-slate-800 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans mb-0.5">PO Date:</span>
              <span className="text-slate-300">{invoice.poDate}</span>
            </div>
            <div className="bg-slate-900/40 p-3 border border-slate-800 rounded-xl">
              <span className="block text-[9px] uppercase tracking-wider text-slate-500 font-sans mb-0.5">Due Date:</span>
              <span className="text-purple-400">{invoice.dueDate}</span>
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
                {invoice.lineItems.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#017E84]" /> {row.item}
                    </td>
                    <td className="py-4 px-4 text-center font-mono text-slate-400">{row.qty}</td>
                    <td className="py-4 px-4 text-right font-mono">₹{row.unitPrice.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-6 text-right font-mono text-white">₹{row.total.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
                
                {/* FINANCIAL COMPILATION LEDGER FIELDS */}
                <tr className="bg-slate-900/10">
                  <td colSpan="2" className="border-t border-slate-900"></td>
                  <td className="py-2 px-4 text-right text-slate-500 font-bold uppercase tracking-wider text-[9px] border-t border-slate-900">Subtotal</td>
                  <td className="py-2 px-6 text-right font-mono font-bold text-slate-300 border-t border-slate-900">₹{invoice.financials.subtotal.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-slate-900/10">
                  <td colSpan="2"></td>
                  <td className="py-2 px-4 text-right text-slate-500 font-bold uppercase tracking-wider text-[9px]">CGST (9%)</td>
                  <td className="py-2 px-6 text-right font-mono font-bold text-purple-400">+ ₹{invoice.financials.cgstAmount.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-slate-900/10">
                  <td colSpan="2"></td>
                  <td className="py-2 px-4 text-right text-slate-500 font-bold uppercase tracking-wider text-[9px]">SGST (9%)</td>
                  <td className="py-2 px-6 text-right font-mono font-bold text-purple-400">+ ₹{invoice.financials.sgstAmount.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="bg-slate-900/20">
                  <td colSpan="2" className="border-t border-slate-850"></td>
                  <td className="py-3 px-4 text-right text-slate-300 font-black uppercase tracking-wider text-[10px] border-t border-slate-850">Grand Total</td>
                  <td className="py-3 px-6 text-right font-mono font-black text-emerald-400 text-sm border-t border-slate-850">₹{invoice.financials.grandTotal.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* LOWER FOOTER WORKFLOW RECONCILIATION STRIP */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 no-print">
        
        {/* Dynamic Status Pill Badge Pair */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status:</span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all ${
            paymentStatus.toLowerCase() === 'paid' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-lg shadow-amber-950/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${paymentStatus.toLowerCase() === 'paid' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
            {paymentStatus}
          </span>
        </div>

        {/* CHANGED: Restricted settlement action execution triggers to Sourcing Officers and Admins */}
        {paymentStatus.toLowerCase() !== 'paid' && (
          isAuthorizedOfficer ? (
            <button 
              type="button"
              onClick={handleMarkAsPaidAction}
              className="text-xs font-black text-[#017E84] hover:text-[#017E84]/80 flex items-center gap-1 hover:underline transition-all cursor-pointer"
            >
              Mark as Paid <CheckCircle className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[11px] text-slate-500 italic font-medium">
              🔒 Settlement tools restricted. Invoice balance updates are exclusive to corporate Procurement Officers.
            </span>
          )
        )}
      </div>

      {/* RUNTIME HUD TOAST BOX */}
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