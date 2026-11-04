import React from 'react';
import { Building2, Shield, PhoneCall } from 'lucide-react';
import { useComplaints } from '../../context/useComplaints';

export default function Footer() {
  const { resetDemoData } = useComplaints();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Civic<span className="text-orange-400">Connect</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering Indian citizens to report civic grievances directly to municipal authorities for prompt, accountable, and transparent resolution.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Smart Cities Mission Inspired</span>
            </div>
          </div>

          {/* Quick Civic Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Core Issue Areas
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Potholes & Road Depressions</li>
              <li>Garbage Overflow & Waste Dumps</li>
              <li>Damaged Roads & Broken Curbs</li>
              <li>Non-functional Streetlights</li>
              <li>Water Leakage & Pipeline Bursts</li>
            </ul>
          </div>

          {/* National Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              Emergency Citizen Helplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <span className="text-white font-semibold">112</span> : National Emergency Response
              </li>
              <li>
                <span className="text-white font-semibold">1916</span> : Swachh Bharat Helpline
              </li>
              <li>
                <span className="text-white font-semibold">1912</span> : Power / Electricity Complaints
              </li>
              <li>
                <span className="text-white font-semibold">1031</span> : Municipal Grievance Helpline
              </li>
            </ul>
          </div>

          {/* Development / Stage Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Platform Status
            </h4>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-white">Stage 1: Frontend Prototype</span>
              </div>
              <p className="text-[11px] text-slate-400">
                React + Vite responsive client structure. Ready for Supabase database & auth integration in Stage 2.
              </p>
              <button
                onClick={resetDemoData}
                className="text-[11px] text-orange-400 hover:text-orange-300 underline font-mono"
              >
                Reset Demo Data
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 CivicConnect India. Developed for cleaner, safer, and smarter Indian neighborhoods.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Citizen Rights</span>
            <span className="hover:text-slate-400 cursor-pointer">MCD / BBMP / BMC Zones</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
