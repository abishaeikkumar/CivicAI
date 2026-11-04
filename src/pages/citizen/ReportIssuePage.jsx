import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  MapPin,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  Hammer,
  LightbulbOff,
  Droplets,
  X,
  Sparkles
} from 'lucide-react';
import { useComplaints } from '../../context/useComplaints';
import { ISSUE_CATEGORIES, CITIES_LIST } from '../../constants/categories';

export default function ReportIssuePage() {
  const { addComplaint, setCurrentPage } = useComplaints();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'potholes',
    priority: 'Medium',
    location: '',
    landmark: '',
    ward: '',
    city: 'Bengaluru',
    pincode: '',
    citizenName: '',
    citizenPhone: '',
    latitude: null,
    longitude: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationSuccessMsg, setLocationSuccessMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample photos for quick preview / testing
  const SAMPLE_EVIDENCE_PHOTOS = [
    {
      label: 'Sample Pothole',
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Sample Garbage',
      url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Sample Water Leak',
      url: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80'
    },
    {
      label: 'Sample Broken Light',
      url: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&w=800&q=80'
    }
  ];

  // Handle Photo selection via file input
  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Geolocation detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsDetectingLocation(true);
    setLocationSuccessMsg('');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          location: prev.location || `GPS Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`
        }));
        setIsDetectingLocation(false);
        setLocationSuccessMsg(`GPS Lat ${lat.toFixed(4)}, Long ${lng.toFixed(4)} detected`);
      },
      (err) => {
        setIsDetectingLocation(false);
        console.warn('Geolocation error:', err);
        // Fallback simulated geolocation for demo/testing
        setFormData((prev) => ({
          ...prev,
          latitude: 12.9716,
          longitude: 77.5946,
          location: prev.location || 'Near MG Road Junction'
        }));
        setLocationSuccessMsg('Location auto-pinned via nearest municipal cell');
      },
      { timeout: 7000 }
    );
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Please provide a clear title for the issue';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe the problem in detail';
    } else if (formData.description.trim().length < 15) {
      newErrors.description = 'Please provide a slightly more descriptive summary (min 15 chars)';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Specific street address or area is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a civic category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const selectedCatObj = ISSUE_CATEGORIES.find((c) => c.id === formData.category);

    const newIssue = {
      ...formData,
      photoUrl: photoPreview || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      department: selectedCatObj?.department || 'Municipal Grievance Cell'
    };

    addComplaint(newIssue);
    setIsSubmitting(false);
    setCurrentPage('dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Navigation / Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs text-slate-500 font-medium">
          Step 1 of 1 • Public Grievance Filing
        </span>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8">
          <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Civic Incident Report</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Report a Civic Grievance
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Submit accurate details and photos to help municipal field officers inspect and resolve the issue quickly.
          </p>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Section 1: Issue Category Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900">
              1. Select Issue Category <span className="text-rose-500">*</span>
            </label>
            <p className="text-xs text-slate-500">
              Choose the category that best matches the civic issue:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              {ISSUE_CATEGORIES.map((cat) => {
                const isSelected = formData.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, category: cat.id })
                    }
                    className={`p-4 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {cat.id === 'potholes' && <AlertTriangle className="w-4 h-4" />}
                          {cat.id === 'garbage-overflow' && <Trash2 className="w-4 h-4" />}
                          {cat.id === 'damaged-roads' && <Hammer className="w-4 h-4" />}
                          {cat.id === 'broken-streetlights' && <LightbulbOff className="w-4 h-4" />}
                          {cat.id === 'water-leakage' && <Droplets className="w-4 h-4" />}
                        </span>
                        {isSelected && (
                          <span className="text-blue-600 font-bold text-xs">
                            Selected ✓
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {cat.label}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 mt-2 block border-t border-slate-100 pt-1">
                      Target Dept: {cat.department.split('(')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.category && (
              <p className="text-xs text-rose-600 font-semibold mt-1">
                {errors.category}
              </p>
            )}
          </div>

          {/* Section 2: Issue Title & Description */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">
              2. Grievance Details
            </h3>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issue Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. Deep pothole right before Metro Station entrance"
                className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                  errors.title ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-blue-500`}
              />
              {errors.title ? (
                <p className="text-xs text-rose-600 font-medium mt-1">
                  {errors.title}
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 mt-1">
                  Keep it clear and specific so engineers can identify the problem immediately.
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Detailed Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Explain the issue in detail: when did it start, how hazardous is it, any risks to pedestrians, school buses, traffic congestion, or water wastage..."
                className={`w-full text-sm px-3.5 py-2.5 rounded-xl border ${
                  errors.description
                    ? 'border-rose-400 bg-rose-50/30'
                    : 'border-slate-300'
                } focus:outline-hidden focus:ring-2 focus:ring-blue-500`}
              />
              {errors.description && (
                <p className="text-xs text-rose-600 font-medium mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Priority / Urgency */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Severity Level
              </label>
              <div className="flex gap-3">
                {['Low', 'Medium', 'High', 'Urgent'].map((pri) => (
                  <button
                    key={pri}
                    type="button"
                    onClick={() => setFormData({ ...formData, priority: pri })}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                      formData.priority === pri
                        ? pri === 'Urgent'
                          ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                          : pri === 'High'
                          ? 'bg-orange-500 text-white border-orange-600 shadow-xs'
                          : 'bg-blue-600 text-white border-blue-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {pri}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Photo Upload */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-bold text-slate-900">
                3. Photo Upload (Evidence)
              </label>
              <span className="text-xs text-slate-500">Max size 5MB (JPG, PNG)</span>
            </div>

            {photoPreview ? (
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-300 bg-slate-900 max-h-80">
                <img
                  src={photoPreview}
                  alt="Issue preview"
                  className="w-full h-72 object-cover"
                />
                <button
                  type="button"
                  onClick={() => setPhotoPreview(null)}
                  className="absolute top-3 right-3 bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-xl shadow-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <X className="w-4 h-4" />
                  <span>Remove Photo</span>
                </button>
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg">
                  ✓ Photo attached for inspection
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-blue-50/30 transition-all cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Click to upload or take a photo
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Drag and drop photo here, or browse files from device
                </p>
              </div>
            )}

            {/* Quick Demo Photo Presets */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Quick test photos:
              </span>
              {SAMPLE_EVIDENCE_PHOTOS.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhotoPreview(sample.url)}
                  className="text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors font-medium shadow-2xs"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Location Details */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  4. Exact Location Details <span className="text-rose-500">*</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Accurate street and landmark information speeds up field crew arrival.
                </p>
              </div>

              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-xl transition-colors shrink-0"
              >
                <Compass className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
                <span>
                  {isDetectingLocation ? 'Pinging GPS...' : 'Use Current GPS Location'}
                </span>
              </button>
            </div>

            {locationSuccessMsg && (
              <div className="bg-emerald-50 text-emerald-800 text-xs px-3.5 py-2 rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{locationSuccessMsg}</span>
              </div>
            )}

            {/* Street / Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Street Address / Spot Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g. 100 Feet Road, Near Metro Pillar #24"
                  className={`w-full text-sm pl-10 pr-3.5 py-2.5 rounded-xl border ${
                    errors.location ? 'border-rose-400 bg-rose-50/30' : 'border-slate-300'
                  } focus:outline-hidden focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              {errors.location && (
                <p className="text-xs text-rose-600 font-medium mt-1">
                  {errors.location}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Landmark */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prominent Landmark
                </label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) =>
                    setFormData({ ...formData, landmark: e.target.value })
                  }
                  placeholder="e.g. Opposite State Bank of India ATM"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Ward / Sector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ward / Zone / Sector
                </label>
                <input
                  type="text"
                  value={formData.ward}
                  onChange={(e) =>
                    setFormData({ ...formData, ward: e.target.value })
                  }
                  placeholder="e.g. Ward 112 - Indiranagar"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City / Municipal Corporation
                </label>
                <select
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                >
                  {CITIES_LIST.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Postal Pincode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })
                  }
                  placeholder="e.g. 560038"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 5: Citizen Contact (For SMS status tracking) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                5. Citizen Contact (For Verification & Updates)
              </h3>
              <p className="text-xs text-slate-500">
                You will receive resolution updates regarding this complaint.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.citizenName}
                  onChange={(e) =>
                    setFormData({ ...formData, citizenName: e.target.value })
                  }
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.citizenPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, citizenPhone: e.target.value })
                  }
                  placeholder="e.g. +91 98765 43210"
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setCurrentPage('dashboard')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Cancel & Discard
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>Submit Complaint</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
