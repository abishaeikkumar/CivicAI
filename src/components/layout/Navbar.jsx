import React, { useState } from 'react';
import {
  Building2,
  PlusCircle,
  LayoutDashboard,
  ShieldCheck,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useComplaints } from '../../context/useComplaints';

export default function Navbar() {
  const {
    activeSection,
    setActiveSection,
    currentPage,
    setCurrentPage,
    stats
  } = useComplaints();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page, section = activeSection) => {
    setActiveSection(section);
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      {/* Top National Civic Banner */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Indian tricolor accent dot sequence */}
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#FF9933]" />
              <span className="w-2 h-2 rounded-full bg-white" />
              <span className="w-2 h-2 rounded-full bg-[#138808]" />
            </div>
            <span className="font-medium text-slate-200">
              National Civic Tech Initiative • Municipal Public Services Portal
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-400">
            <span>Toll-Free Helpline: <strong className="text-white">1916</strong> (Swachhata)</span>
            <span>Emergency: <strong className="text-white">112</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('dashboard', 'citizen')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-orange-500 p-0.5 shadow-xs">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-700 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-slate-900">
                    Civic<span className="text-orange-600">Connect</span>
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-blue-200">
                    INDIA
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  नागरिक समस्या निवारण मंच
                </p>
              </div>
            </button>
          </div>

          {/* Section Switcher Pill (Citizen vs Admin) */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => navigateTo('dashboard', 'citizen')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === 'citizen'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Citizen Portal</span>
            </button>

            <button
              onClick={() => navigateTo('admin-dashboard', 'admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSection === 'admin'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin / Municipal Officer</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeSection === 'admin' ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 text-slate-700'
              }`}>
                {stats.pending} pending
              </span>
            </button>
          </div>

          {/* Right Navigation CTA */}
          <div className="hidden md:flex items-center gap-3">
            {activeSection === 'citizen' ? (
              <>
                <button
                  onClick={() => navigateTo('dashboard', 'citizen')}
                  className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors ${
                    currentPage === 'dashboard'
                      ? 'text-blue-700 bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigateTo('report', 'citizen')}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs hover:shadow transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Report New Issue</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  Officer Mode: <strong className="text-slate-800">Zone-1 Central</strong>
                </span>
                <button
                  onClick={() => navigateTo('report', 'citizen')}
                  className="text-xs text-slate-600 hover:text-blue-700 font-semibold px-2 py-1"
                >
                  + New Test Entry
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() =>
                navigateTo(
                  activeSection === 'citizen' ? 'report' : 'admin-dashboard',
                  activeSection
                )
              }
              className="bg-orange-500 text-white p-2 rounded-lg text-xs"
              title="Report Issue"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          {/* Section Selector in Mobile */}
          <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
            <button
              onClick={() => navigateTo('dashboard', 'citizen')}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
                activeSection === 'citizen'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              Citizen Portal
            </button>
            <button
              onClick={() => navigateTo('admin-dashboard', 'admin')}
              className={`flex-1 py-2 text-center text-xs font-bold rounded-lg ${
                activeSection === 'admin'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              Admin Dashboard
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => navigateTo('dashboard', 'citizen')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                Citizen Dashboard
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('report', 'citizen')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-orange-600" />
                Report New Issue
              </span>
              <ChevronRight className="w-4 h-4 text-orange-400" />
            </button>

            <button
              onClick={() => navigateTo('admin-dashboard', 'admin')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Admin Overview & Grievances
              </span>
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-mono">
                {stats.total}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
