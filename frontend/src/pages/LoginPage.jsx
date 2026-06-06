import React, { useState } from 'react';
import { useNavigate as useAppNavigator } from 'react-router-dom';
import { ShieldCheck, UserCheck, Mail, Lock, Eye } from 'lucide-react';

export default function LoginPage() {
  const navigate = useAppNavigator();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 transition-colors duration-500">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 relative overflow-hidden">
        
        {/* BRAND IDENTITY TOP STRIP ACCENT DYNAMIC SWITCHER */}
        <div 
          className="absolute top-0 left-0 right-0 h-2 transition-colors duration-500" 
          style={{ backgroundColor: isAdmin ? '#714B67' : '#017E84' }}
        />
        
        {/* UPPER LOCK BRAND LOGO PANEL */}
        <div className="flex justify-center mb-4">
          <div 
            className="p-3 rounded-xl transition-all duration-500"
            style={{ 
              backgroundColor: isAdmin ? '#714B6715' : '#017E8415',
              color: isAdmin ? '#714B67' : '#017E84'
            }}
          >
            <ShieldCheck className="h-6 w-6" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">VendorBridge Gateway</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Unified Authentication Core</p>
        </div>

        {/* ROLE SELECTION TAB CONSOLE PILLS */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6 border border-slate-200">
          <button
            onClick={() => setIsAdmin(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              !isAdmin 
                ? 'bg-white text-[#017E84] shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" />
            Procurement Team
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isAdmin 
                ? 'bg-white text-[#714B67] shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Third-Party Vendor
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="space-y-4">
          {/* EMAIL FIELDS */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Corporate Identity Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="email" 
                required 
                placeholder="officer@vendorbridge.in"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-800 placeholder-slate-300 outline-none focus:bg-white transition-all focus:border-slate-400"
                style={{ '--tw-border-opacity': '1' }}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Security Passkey</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-800 placeholder-slate-300 outline-none focus:bg-white transition-all focus:border-slate-400"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
              >
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* EXECUTIVE SIGN-IN RUNTIME TRIGGER */}
          <button 
            type="submit" 
            className="w-full text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md mt-2 cursor-pointer tracking-wide"
            style={{ backgroundColor: isAdmin ? '#714B67' : '#017E84' }}
          >
            {isAdmin ? 'Launch Vendor Console' : 'Launch Procurement Portal'}
          </button>
        </form>

        {/* REGISTER DIRECTORY LINK MATRIX */}
        <div className="text-center mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            New corporate supplier?{' '}
            <button 
              onClick={() => navigate('/register')} 
              className="font-semibold hover:underline bg-transparent border-none cursor-pointer transition-all"
              style={{ color: isAdmin ? '#714B67' : '#017E84' }}
            >
              Request Access Account
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}