import React, { useState, useEffect } from 'react';
import { ComplaintContext } from './complaintContextDef';
import { INITIAL_COMPLAINTS } from '../data/initialComplaints';

const STORAGE_KEY = 'civicconnect_complaints_v1';

export function ComplaintProvider({ children }) {
  const [complaints, setComplaints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial dataset', e);
    }
    return INITIAL_COMPLAINTS;
  });

  // Navigation & Role State
  // Active Section: 'citizen' | 'admin'
  const [activeSection, setActiveSection] = useState('citizen');
  // Current Page: 'dashboard' | 'report' | 'track' | 'admin-dashboard'
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  }, [complaints]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add new complaint
  const addComplaint = (complaintData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CC-2026-${randomNum}`;

    const newRecord = {
      id: newId,
      title: complaintData.title.trim(),
      description: complaintData.description.trim(),
      category: complaintData.category,
      status: 'Pending',
      priority: complaintData.priority || 'Medium',
      location: complaintData.location.trim(),
      landmark: complaintData.landmark?.trim() || 'N/A',
      ward: complaintData.ward?.trim() || 'Ward General',
      city: complaintData.city || 'Bengaluru',
      pincode: complaintData.pincode?.trim() || '',
      latitude: complaintData.latitude || null,
      longitude: complaintData.longitude || null,
      photoUrl: complaintData.photoUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      citizenName: complaintData.citizenName?.trim() || 'Citizen User',
      citizenPhone: complaintData.citizenPhone?.trim() || '+91 98000 00000',
      department: complaintData.department || 'Municipal Corporation General Services',
      assignedOfficer: 'Unassigned (Under Review)',
      resolutionNotes: '',
      upvotes: 1
    };

    setComplaints((prev) => [newRecord, ...prev]);
    showToast(`Issue ${newId} submitted successfully! Municipal team notified.`);
    return newRecord;
  };

  // Update complaint status (used by Admin)
  const updateComplaintStatus = (id, newStatus, resolutionNotes = '', assignedOfficer = '') => {
    setComplaints((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: newStatus,
            updatedAt: new Date().toISOString(),
            resolutionNotes: resolutionNotes || item.resolutionNotes,
            assignedOfficer: assignedOfficer || item.assignedOfficer
          };
        }
        return item;
      })
    );
    showToast(`Complaint ${id} updated to "${newStatus}".`);
  };

  // Upvote complaint
  const upvoteComplaint = (id) => {
    setComplaints((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, upvotes: item.upvotes + 1 };
        }
        return item;
      })
    );
    showToast(`Upvoted complaint ${id}!`);
  };

  // Reset to initial mock data if needed
  const resetDemoData = () => {
    setComplaints(INITIAL_COMPLAINTS);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Demo civic data re-initialized.');
  };

  // Computed statistics
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === 'Pending').length,
    inProgress: complaints.filter((c) => c.status === 'In Progress').length,
    resolved: complaints.filter((c) => c.status === 'Resolved').length,
    potholes: complaints.filter((c) => c.category === 'potholes').length,
    garbage: complaints.filter((c) => c.category === 'garbage-overflow').length,
    roads: complaints.filter((c) => c.category === 'damaged-roads').length,
    streetlights: complaints.filter((c) => c.category === 'broken-streetlights').length,
    water: complaints.filter((c) => c.category === 'water-leakage').length
  };

  return (
    <ComplaintContext.Provider
      value={{
        complaints,
        stats,
        activeSection,
        setActiveSection,
        currentPage,
        setCurrentPage,
        selectedComplaintId,
        setSelectedComplaintId,
        toastMessage,
        showToast,
        addComplaint,
        updateComplaintStatus,
        upvoteComplaint,
        resetDemoData
      }}
    >
      {children}
    </ComplaintContext.Provider>
  );
}
