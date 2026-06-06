import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Briefcase, Globe, Info } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: 'Vendor',
    country: 'India',
    additionalInformation: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Payload:', formData);
    // Move to dashboard or login after successful mock registration
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 font-sans">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 relative overflow-hidden">
        
        {/* TOP THEME ACCENT STRIP */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#017E84]" />

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create Vendor Profile</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">VendorBridge ERP Directory</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* FIRST & LAST NAME FIELD GRID */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  required
                  placeholder="John"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-300 outline-none focus:border-[#017E84]"
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Last Name</label>
              <input 
                type="text" 
                required
                placeholder="Doe"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-300 outline-none focus:border-[#017E84]"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* EMAIL & PHONE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Business Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="email" 
                  required
                  placeholder="vendor@supplychain.in"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-300 outline-none focus:border-[#017E84]"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="tel" 
                  required
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-300 outline-none focus:border-[#017E84]"
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* ROLE & COUNTRY SELECTORS */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">System Role</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <select 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-700 outline-none focus:border-[#017E84] appearance-none"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="Vendor">Vendor / Supplier</option>
                  <option value="Procurement">Procurement Officer</option>
                  <option value="Admin">System Admin</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Country</label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  required
                  value={formData.country}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-800 outline-none focus:border-[#017E84]"
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* ADDITIONAL INFORMATION TEXTAREA */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Additional Operational Info</label>
            <div className="relative">
              <Info className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <textarea 
                rows="3"
                placeholder="Specify core materials, distribution zones, or manufacturing certifications..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white text-slate-800 placeholder-slate-300 outline-none focus:border-[#017E84] resize-none"
                onChange={(e) => setFormData({...formData, additionalInformation: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#017E84] hover:bg-[#016569] text-white py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md mt-2 cursor-pointer">
            Register Account Profile
          </button>
        </form>

        {/* LOG IN LINK ROUTER BRIDGE */}
        <div className="text-center mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Already registered?{' '}
            <button 
              onClick={() => navigate('/login')} 
              className="text-[#017E84] font-semibold hover:underline bg-transparent border-none cursor-pointer"
            >
              Sign In to Console
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}