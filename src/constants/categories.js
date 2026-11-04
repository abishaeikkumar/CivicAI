export const ISSUE_CATEGORIES = [
  {
    id: 'potholes',
    label: 'Potholes',
    description: 'Crater or surface depressions posing safety risks to two-wheelers and vehicles.',
    department: 'Public Works Department (Roads)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    iconName: 'AlertTriangle',
    themeColor: 'amber'
  },
  {
    id: 'garbage-overflow',
    label: 'Garbage Overflow',
    description: 'Uncollected domestic waste, open dumping, and overflowing municipal bins.',
    department: 'Solid Waste Management (Swachh Division)',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    iconName: 'Trash2',
    themeColor: 'emerald'
  },
  {
    id: 'damaged-roads',
    label: 'Damaged Roads',
    description: 'Broken tarmac, cave-ins, eroded road edges, and uneven resurfacing.',
    department: 'Infrastructure & Urban Road Development',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    iconName: 'Hammer',
    themeColor: 'orange'
  },
  {
    id: 'broken-streetlights',
    label: 'Broken Streetlights',
    description: 'Faulty luminaires, dark public corridors, exposed wires, or damaged light poles.',
    department: 'Electrical & Municipal Lighting Wing',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    iconName: 'LightbulbOff',
    themeColor: 'indigo'
  },
  {
    id: 'water-leakage',
    label: 'Water Leakage',
    description: 'Pipeline fractures, potable water loss, and water supply disruptions.',
    department: 'Jal Board / Water Supply & Sewerage',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    iconName: 'Droplets',
    themeColor: 'sky'
  }
];

export const STATUS_TYPES = {
  PENDING: {
    key: 'Pending',
    label: 'Pending Verification',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotClass: 'bg-amber-500'
  },
  IN_PROGRESS: {
    key: 'In Progress',
    label: 'In Progress / Assigned',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    dotClass: 'bg-blue-500 animate-pulse'
  },
  RESOLVED: {
    key: 'Resolved',
    label: 'Resolved',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500'
  },
  REJECTED: {
    key: 'Rejected',
    label: 'Invalid / Rejected',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    dotClass: 'bg-rose-500'
  }
};

export const CITIES_LIST = [
  'Bengaluru',
  'New Delhi',
  'Mumbai',
  'Pune',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
  'Lucknow'
];
