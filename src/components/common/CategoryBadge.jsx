import React from 'react';
import {
  AlertTriangle,
  Trash2,
  Hammer,
  LightbulbOff,
  Droplets,
  HelpCircle
} from 'lucide-react';
import { ISSUE_CATEGORIES } from '../../constants/categories';

export default function CategoryBadge({ categoryId, showIcon = true, size = 'sm' }) {
  const cat = ISSUE_CATEGORIES.find((c) => c.id === categoryId) || {
    id: categoryId,
    label: categoryId || 'Other',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const renderIcon = () => {
    const iconProps = { className: size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5' };
    switch (cat.id) {
      case 'potholes':
        return <AlertTriangle {...iconProps} className={`${iconProps.className} text-amber-600`} />;
      case 'garbage-overflow':
        return <Trash2 {...iconProps} className={`${iconProps.className} text-emerald-600`} />;
      case 'damaged-roads':
        return <Hammer {...iconProps} className={`${iconProps.className} text-orange-600`} />;
      case 'broken-streetlights':
        return <LightbulbOff {...iconProps} className={`${iconProps.className} text-indigo-600`} />;
      case 'water-leakage':
        return <Droplets {...iconProps} className={`${iconProps.className} text-sky-600`} />;
      default:
        return <HelpCircle {...iconProps} className={`${iconProps.className} text-slate-500`} />;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border font-medium ${cat.badgeColor} ${
        size === 'xs' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
    >
      {showIcon && renderIcon()}
      <span>{cat.label}</span>
    </span>
  );
}
