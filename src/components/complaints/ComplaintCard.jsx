import React from 'react';
import { MapPin, Calendar, ThumbsUp, ArrowRight, ShieldAlert } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import CategoryBadge from '../common/CategoryBadge';
import { useComplaints } from '../../context/useComplaints';

export default function ComplaintCard({ complaint, onSelect }) {
  const { upvoteComplaint } = useComplaints();

  const formattedDate = new Date(complaint.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short'
  });

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">
      {/* Top Image Preview if available */}
      {complaint.photoUrl && (
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={complaint.photoUrl}
            alt={complaint.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute top-2.5 left-2.5">
            <CategoryBadge categoryId={complaint.category} size="xs" />
          </div>
          <div className="absolute top-2.5 right-2.5">
            <StatusBadge status={complaint.status} size="xs" />
          </div>
          {complaint.priority === 'Urgent' && (
            <div className="absolute bottom-2 left-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1 uppercase tracking-wider">
              <ShieldAlert className="w-3 h-3" />
              High Urgency
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {!complaint.photoUrl && (
            <div className="flex items-center justify-between mb-2">
              <CategoryBadge categoryId={complaint.category} size="xs" />
              <StatusBadge status={complaint.status} size="xs" />
            </div>
          )}

          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono mb-1">
            <span>{complaint.id}</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-sans">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>

          <h3
            onClick={() => onSelect(complaint.id)}
            className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer mb-2"
          >
            {complaint.title}
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 mb-3">
            {complaint.description}
          </p>
        </div>

        {/* Footer info */}
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{complaint.location}, {complaint.city}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                upvoteComplaint(complaint.id);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-orange-600 hover:bg-orange-50 px-2 py-1 rounded transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{complaint.upvotes}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelect(complaint.id)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span>View Issue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
