import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  RefreshCw,
  Building,
  MapPin,
  TrendingUp,
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';
import { useComplaints } from '../../context/useComplaints';
import { ISSUE_CATEGORIES, CITIES_LIST } from '../../constants/categories';
import StatusBadge from '../../components/common/StatusBadge';
import CategoryBadge from '../../components/common/CategoryBadge';
import StatCard from '../../components/common/StatCard';

export default function AdminDashboard({ onOpenDetail }) {
  const { complaints, stats, updateComplaintStatus, resetDemoData } = useComplaints();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  // Filter complaints
  const filteredComplaints = complaints.filter((item) => {
    const matchesStatus =
      selectedStatus === 'all' || item.status === selectedStatus;
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesCity =
      selectedCity === 'all' || item.city === selectedCity;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.citizenName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCategory && matchesCity && matchesSearch;
  });

  // Export CSV function (pure client-side)
  const handleExportCSV = () => {
    const headers = [
      'Grievance ID',
      'Title',
      'Category',
      'Status',
      'Priority',
      'Location',
      'Ward',
      'City',
      'Citizen Name',
      'Reported Date',
      'Department'
    ];

    const rows = filteredComplaints.map((c) => [
      `"${c.id}"`,
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.category}"`,
      `"${c.status}"`,
      `"${c.priority}"`,
      `"${c.location.replace(/"/g, '""')}"`,
      `"${c.ward}"`,
      `"${c.city}"`,
      `"${c.citizenName}"`,
      `"${c.createdAt}"`,
      `"${c.department}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CivicConnect_Grievances_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resolutionRate =
    stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0;

  return (
    <div className="space-y-8 pb-16">
      {/* Admin Top Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Municipal Authority Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Civic Operations & Grievance Control Room
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Live municipal issue tracking, department assignment, and resolution validation across urban wards.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-2xs"
            title="Download CSV report of complaints"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={resetDemoData}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
            title="Reload initial dataset"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Dataset</span>
          </button>
        </div>
      </div>

      {/* Primary Statistics */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Logged"
          value={stats.total}
          subtitle="All municipal cases"
          icon={Building}
          colorScheme="slate"
        />
        <StatCard
          title="Pending Action"
          value={stats.pending}
          subtitle="Awaiting triage"
          icon={Clock}
          colorScheme="amber"
        />
        <StatCard
          title="Under Resolution"
          value={stats.inProgress}
          subtitle="Active work orders"
          icon={AlertCircle}
          colorScheme="blue"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          subtitle="Citizen verified"
          icon={CheckCircle2}
          colorScheme="emerald"
        />
        <StatCard
          title="Resolution Rate"
          value={`${resolutionRate}%`}
          subtitle="Compliance SLA target >80%"
          icon={TrendingUp}
          colorScheme={resolutionRate >= 50 ? 'emerald' : 'orange'}
        />
      </section>

      {/* Category Distribution Overview */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Departmental Grievance Distribution
            </h2>
            <p className="text-xs text-slate-500">
              Distribution of incoming complaints by civic infrastructure category
            </p>
          </div>
          <span className="text-xs font-medium text-slate-500">
            {stats.total} Total Registered
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {ISSUE_CATEGORIES.map((cat) => {
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

            const percentage =
              stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;

            return (
              <div
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.id ? 'all' : cat.id)
                }
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800">
                    {cat.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {count}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      cat.id === 'potholes'
                        ? 'bg-amber-500'
                        : cat.id === 'garbage-overflow'
                        ? 'bg-emerald-500'
                        : cat.id === 'damaged-roads'
                        ? 'bg-orange-500'
                        : cat.id === 'broken-streetlights'
                        ? 'bg-indigo-500'
                        : 'bg-sky-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2">
                  <span>{cat.department.split('(')[0]}</span>
                  <span className="font-semibold text-slate-700">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Complaints List Section */}
      <section className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden space-y-0">
        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/60 space-y-3">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaints by ID, title, ward, landmark, citizen name..."
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Quick Filter Selects */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {ISSUE_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>

              {/* City Filter */}
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Cities</option>
                {CITIES_LIST.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              {(selectedStatus !== 'all' ||
                selectedCategory !== 'all' ||
                selectedCity !== 'all' ||
                searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedStatus('all');
                    setSelectedCategory('all');
                    setSelectedCity('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 px-2 py-2"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              Showing <strong>{filteredComplaints.length}</strong> of <strong>{complaints.length}</strong> grievances
            </span>
            <span className="hidden sm:inline">
              Click any complaint row to inspect photo & execute status updates
            </span>
          </div>
        </div>

        {/* Complaints Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-4">Grievance ID</th>
                <th className="py-3.5 px-4">Issue Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Location / Ward</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Quick Officer Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                    onClick={() => onOpenDetail(item.id)}
                  >
                    {/* ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                      {item.id}
                    </td>

                    {/* Title & Photo Thumbnail */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        {item.photoUrl && (
                          <img
                            src={item.photoUrl}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80';
                            }}
                          />
                        )}
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-700 line-clamp-1">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            Reported by {item.citizenName}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <CategoryBadge categoryId={item.category} size="xs" />
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <p className="text-slate-800 font-medium truncate">
                        {item.location}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {item.ward}, {item.city}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={item.status} size="xs" />
                    </td>

                    {/* Quick Officer Actions */}
                    <td
                      className="py-3.5 px-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="inline-flex items-center gap-1.5">
                        {item.status === 'Pending' && (
                          <button
                            onClick={() =>
                              updateComplaintStatus(
                                item.id,
                                'In Progress',
                                'Field engineer dispatched to site.'
                              )
                            }
                            className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-md font-semibold transition-colors"
                          >
                            Assign Crew
                          </button>
                        )}
                        {item.status === 'In Progress' && (
                          <button
                            onClick={() =>
                              updateComplaintStatus(
                                item.id,
                                'Resolved',
                                'Repair complete and verified on-ground.'
                              )
                            }
                            className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Mark Resolved
                          </button>
                        )}
                        <button
                          onClick={() => onOpenDetail(item.id)}
                          className="text-xs text-slate-500 hover:text-slate-800 p-1.5 hover:bg-slate-100 rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No complaints matching the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Complaints Mobile Cards View (Responsive) */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredComplaints.length > 0 ? (
            filteredComplaints.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenDetail(item.id)}
                className="p-4 space-y-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {item.id}
                  </span>
                  <StatusBadge status={item.status} size="xs" />
                </div>

                <div className="flex gap-3">
                  {item.photoUrl && (
                    <img
                      src={item.photoUrl}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <CategoryBadge categoryId={item.category} size="xs" />
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2 mt-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 truncate">
                      <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                      <span>{item.location}, {item.city}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetail(item.id);
                    }}
                    className="text-blue-600 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs">
              No complaints matching the selected filter criteria.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
