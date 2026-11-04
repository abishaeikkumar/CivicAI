import React from 'react';
import { ComplaintProvider } from './context/ComplaintContext';
import { useComplaints } from './context/useComplaints';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CitizenDashboard from './pages/citizen/CitizenDashboard';
import ReportIssuePage from './pages/citizen/ReportIssuePage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ComplaintDetailModal from './components/complaints/ComplaintDetailModal';
import { CheckCircle2 } from 'lucide-react';

function MainContent() {
  const {
    activeSection,
    currentPage,
    selectedComplaintId,
    setSelectedComplaintId,
    toastMessage
  } = useComplaints();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div
            className={`flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md ${
              toastMessage.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-700'
                : 'bg-slate-900/95 text-white border-slate-700'
            }`}
          >
            <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs sm:text-sm font-medium leading-snug">
              {toastMessage.message}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Render Page based on activeSection and currentPage */}
        {activeSection === 'citizen' && currentPage === 'dashboard' && (
          <CitizenDashboard onOpenDetail={(id) => setSelectedComplaintId(id)} />
        )}

        {activeSection === 'citizen' && currentPage === 'report' && (
          <ReportIssuePage />
        )}

        {(activeSection === 'admin' || currentPage === 'admin-dashboard') && (
          <AdminDashboard onOpenDetail={(id) => setSelectedComplaintId(id)} />
        )}
      </main>

      {/* Global Complaint Inspection Modal */}
      {selectedComplaintId && (
        <ComplaintDetailModal
          complaintId={selectedComplaintId}
          onClose={() => setSelectedComplaintId(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ComplaintProvider>
      <MainContent />
    </ComplaintProvider>
  );
}
