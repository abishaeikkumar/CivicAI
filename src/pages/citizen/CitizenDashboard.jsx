import React, { useState } from 'react';
import {
  PlusCircle,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useComplaints } from '../../context/useComplaints';
import { ISSUE_CATEGORIES } from '../../constants/categories';
import ComplaintCard from '../../components/complaints/ComplaintCard';
import StatCard from '../../components/common/StatCard';

export default function CitizenDashboard({ onOpenDetail }) {
  const { complaints, stats, setCurrentPage } = useComplaints();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter complaints
  const filteredComplaints = complaints.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' || item.status === selectedStatus;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
        {/* Background glow & civic pattern */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>Civic Grievance Redressal Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            See a civic problem? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400">
              Report it. Track it. Get it fixed.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
            From dangerous potholes and overflowing garbage to broken streetlights and water leakages — connect directly with municipal corporations across India for swift on-ground action.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setCurrentPage('report')}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Report a New Issue</span>
            </button>

            <button
              onClick={() => {
                const feed = document.getElementById('complaints-feed');
                feed?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-5 py-3.5 rounded-xl border border-white/15 backdrop-blur-xs transition-colors"
            >
              <span>Explore Public Grievances</span>
              <ArrowRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Citizen Key Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Reports"
          value={stats.total}
          subtitle="Community grievances logged"
          icon={TrendingUp}
          colorScheme="blue"
        />
        <StatCard
          title="Pending Action"
          value={stats.pending}
          subtitle="Awaiting department review"
          icon={Clock}
          colorScheme="amber"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          subtitle="Crews dispatched / active"
          icon={AlertCircle}
          colorScheme="orange"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          subtitle="Verified by civic inspectors"
          icon={CheckCircle}
          colorScheme="emerald"
          trend={`${stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}% resolved`}
        />
      </section>

      {/* Quick Category Jump Buttons */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Select Civic Category
            </h2>
            <p className="text-xs text-slate-500">
              Filter public reports or quickly inspect issues by municipal department
            </p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Clear Category Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {ISSUE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count =
              cat.id === 'potholes'
                ? stats.potholes
                : cat.id === 'garbage-overflow'
                ? stats.garbage
                : cat.id === 'damaged-roads'
                ? stats.roads
                : cat.id === 'broken-streetlights'
                ? stats.streetlights
                : stats.water;

            return (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(isSelected ? 'all' : cat.id)
                }
                className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                  {cat.label}
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {cat.department.split('(')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Public Complaints Feed */}
      <section id="complaints-feed" className="space-y-4">
        {/* Controls Bar: Search & Status Filter */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by issue title, landmark, area, or tracking ID (e.g., CC-2026-8901)..."
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-slate-50/50"
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {['all', 'Pending', 'In Progress', 'Resolved'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedStatus === st
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'all' ? 'All Statuses' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Complaints Grid */}
        {filteredComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map((item) => (
              <ComplaintCard
                key={item.id}
                complaint={item}
                onSelect={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No matching civic complaints found
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search keywords, clearing your category filter, or report a new issue in your neighborhood.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedStatus('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* How CivicConnect Works */}
      <section className="bg-gradient-to-r from-blue-50/60 via-slate-50 to-orange-50/60 rounded-2xl border border-slate-200/80 p-6 sm:p-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Transparent Redressal
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            How CivicConnect Solves Neighborhood Problems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Spot & Capture Photo
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Take a photo of the pothole, garbage, or leaking pipe. Upload with auto GPS location tag.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Routed to Ward Officer
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your report is categorized and sent straight to the responsible municipal department (PWD, Jal Board, Swachh Bharat Cell).
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              On-Ground Resolution
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Municipal maintenance crew fixes the issue and updates status with resolution remarks for citizens to verify.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
