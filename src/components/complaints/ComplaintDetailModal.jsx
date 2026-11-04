import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Building2,
  CheckCircle2,
  ThumbsUp
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import CategoryBadge from '../common/CategoryBadge';
import { useComplaints } from '../../context/useComplaints';

export default function ComplaintDetailModal({ complaintId, onClose }) {
  const { complaints, updateComplaintStatus, upvoteComplaint, activeSection } = useComplaints();
  const [selectedStatus, setSelectedStatus] = useState('');
  const [officerNote, setOfficerNote] = useState('');

  const complaint = complaints.find((c) => c.id === complaintId);

  if (!complaint) return null;

  const handleStatusUpdate = (e) => {
    e.preventDefault();
    if (!selectedStatus) return;
    updateComplaintStatus(
      complaint.id,
      selectedStatus,
      officerNote || `Status updated to ${selectedStatus} by Municipal Admin.`
    );
    setSelectedStatus('');
    setOfficerNote('');
  };

  const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const updatedDate = new Date(complaint.updatedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-200/80 px-2 py-1 rounded">
              {complaint.id}
            </span>
            <StatusBadge status={complaint.status} />
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 p-1.5 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
          {/* Title & Badges */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CategoryBadge categoryId={complaint.category} />
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Reported {formattedDate}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">
              {complaint.title}
            </h2>
          </div>

          {/* Photo */}
          {complaint.photoUrl && (
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group max-h-72">
              <img
                src={complaint.photoUrl}
                alt={complaint.title}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5">
                <span>Civic Evidence Photo</span>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Issue Description
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {complaint.description}
            </p>
          </div>

          {/* Location & Authority Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                Location & Ward
              </h4>
              <p className="text-sm font-medium text-slate-900">{complaint.location}</p>
              {complaint.landmark && (
                <p className="text-xs text-slate-600">Landmark: {complaint.landmark}</p>
              )}
              <div className="flex flex-wrap gap-2 text-xs text-slate-500 pt-1">
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                  {complaint.ward || 'Central Ward'}
                </span>
                <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                  {complaint.city} - {complaint.pincode}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                Jurisdiction & Department
              </h4>
              <p className="text-sm font-medium text-slate-900">{complaint.department}</p>
              <p className="text-xs text-slate-600">
                Assigned Officer: <span className="font-semibold text-slate-800">{complaint.assignedOfficer || 'Pending Assignment'}</span>
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-500">Citizen:</span>
                <span className="text-xs font-medium text-slate-700">{complaint.citizenName}</span>
              </div>
            </div>
          </div>

          {/* Resolution Notes / Status Trail */}
          {complaint.resolutionNotes && (
            <div className="bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Department Resolution Update
              </h4>
              <p className="text-sm text-emerald-950 font-medium">{complaint.resolutionNotes}</p>
              <p className="text-xs text-emerald-700/80 mt-1">Updated on {updatedDate}</p>
            </div>
          )}

          {/* Admin Status Update Form (if in Admin Section) */}
          {activeSection === 'admin' && (
            <form onSubmit={handleStatusUpdate} className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Officer Actions (Municipal Portal)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Update Resolution Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select status...</option>
                    <option value="In Progress">In Progress (Dispatch Work Order)</option>
                    <option value="Resolved">Resolved (Work Completed)</option>
                    <option value="Rejected">Rejected (Out of Municipal Scope)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Department Remarks
                  </label>
                  <input
                    type="text"
                    value={officerNote}
                    onChange={(e) => setOfficerNote(e.target.value)}
                    placeholder="e.g. Patching crew dispatched, task done"
                    className="w-full text-sm bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  disabled={!selectedStatus}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  Save Status Update
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => upvoteComplaint(complaint.id)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
            >
              <ThumbsUp className="w-3.5 h-3.5 text-orange-600" />
              <span>Support / Upvote ({complaint.upvotes})</span>
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
