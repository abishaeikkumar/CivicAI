import React from 'react';
import { STATUS_TYPES } from '../../constants/categories';

export default function StatusBadge({ status, size = 'sm' }) {
  const config =
    status === 'Pending'
      ? STATUS_TYPES.PENDING
      : status === 'In Progress'
      ? STATUS_TYPES.IN_PROGRESS
      : status === 'Resolved'
      ? STATUS_TYPES.RESOLVED
      : STATUS_TYPES.REJECTED;

  const sizeClasses =
    size === 'xs'
      ? 'text-xs px-2 py-0.5'
      : size === 'md'
      ? 'text-sm px-3 py-1 font-semibold'
      : 'text-xs px-2.5 py-1 font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.badgeClass} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dotClass}`} />
      <span>{config.label}</span>
    </span>
  );
}
