/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Inbox, Search, Filter, MapPin, Eye, X, CheckSquare, 
  Clock, AlertCircle, FileSpreadsheet, Loader2, Save
} from 'lucide-react';
import { StatusBadge, Button, EmptyState } from './UIElements';
import { Inquiry, InquiryStatus } from '../types';

interface AdminInquiriesViewProps {
  inquiries: Inquiry[];
  onUpdateInquiry: (id: string, updates: Partial<Inquiry>) => Promise<void>;
  onDeleteInquiry: (id: string) => Promise<void>;
  loading: boolean;
}

export const AdminInquiriesView: React.FC<AdminInquiriesViewProps> = ({
  inquiries,
  onUpdateInquiry,
  onDeleteInquiry,
  loading
}) => {
  // Query state filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  
  // Selected inquiry details view modal
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [noteText, setNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const statuses = ['All', 'New', 'In Progress', 'Closed'];

  // Compound filtrator logic
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch = inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inq.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inq.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectInquiry = (inq: Inquiry) => {
    setSelectedInquiry(inq);
    setNoteText(inq.adminNotes || '');
  };

  const handleStatusUpdate = async (status: InquiryStatus) => {
    if (!selectedInquiry) return;
    const oldId = selectedInquiry.id || selectedInquiry._id;
    if (!oldId) return;

    try {
      await onUpdateInquiry(oldId, { status });
      // Update local state copy
      setSelectedInquiry(prev => prev ? { ...prev, status } : null);
    } catch (e) {
      alert('Handshake failed while saving status.');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    const oldId = selectedInquiry.id || selectedInquiry._id;
    if (!oldId) return;

    setSavingNote(true);
    try {
      await onUpdateInquiry(oldId, { adminNotes: noteText });
      setSelectedInquiry(prev => prev ? { ...prev, adminNotes: noteText } : null);
    } catch (e) {
      alert('Failed to save notes.');
    } finally {
      setSavingNote(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans relative">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400">Database CRM Logs</span>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight mt-0.5">Guest Inquiries Box</h2>
        </div>
        <span className="text-xs font-mono text-slate-400 font-medium">Record Count: {filteredInquiries.length} listings</span>
      </div>

      {/* FILTER CONTROL SHELF */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-xs">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search name, company, email, or content..."
            className="block w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-700 placeholder-slate-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue transition-all"
          />
        </div>

        {/* Status Pill Filters */}
        <div className="flex items-center gap-1 shrink-0 w-full sm:w-auto overflow-x-auto">
          <Filter className="h-4 w-4 text-slate-400 mr-2 shrink-0 hidden sm:block" />
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all border ${
                statusFilter === st
                  ? 'bg-midnight-blue border-midnight-blue text-white shadow-inner'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* INBOX TABLE LAYOUT */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin h-10 w-10 text-ocean-blue" />
            <p className="text-xs font-semibold text-slate-400 mt-4 animate-pulse">Establishing secure handshake tunnel...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <EmptyState
            title="Inquiry Inbox Empty"
            description="There are currently no active customer inquiry records matching the current parameters in the MERN database."
            icon="Inbox"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 uppercase font-mono text-[9px] font-bold">
                  <th className="py-3.5 pl-6">Company & Lead</th>
                  <th className="py-3.5">Job Title</th>
                  <th className="py-3.5">Location</th>
                  <th className="py-3.5">Date Created</th>
                  <th className="py-3.5 pl-2">Status</th>
                  <th className="py-3.5 pr-6 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.map((inq) => (
                  <tr 
                    key={inq.id || inq._id} 
                    className="hover:bg-slate-50/40 transition-all cursor-pointer group"
                    onClick={() => handleSelectInquiry(inq)}
                  >
                    <td className="py-4 pl-6">
                      <div className="font-bold text-slate-800 tracking-tight group-hover:text-ocean-blue transition-colors">
                        {inq.name}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-none">
                        {inq.company} • <span className="font-mono text-[9px]">{inq.email}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-500 font-medium">
                      <span className="block max-w-[170px] truncate">{inq.jobTitle || 'Not provided'}</span>
                    </td>
                    <td className="py-4 text-slate-400 font-normal">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {inq.country}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400 font-mono text-[10px]">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                    <td className="py-4">
                      <StatusBadge status={inq.status} />
                    </td>
                    <td className="py-4 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleSelectInquiry(inq)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-ocean-blue hover:bg-slate-100 cursor-pointer"
                        title="View Message Parameters"
                      >
                        <Eye className="h-4.5 w-4.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL DRAWER INSIDE INQUIRIES VIEW */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedInquiry(null)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              />

              {/* Panel sheet */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-slate-100"
              >
                {/* Header */}
                <div className="bg-slate-900 text-white p-6 relative border-none">
                  {/* Exit Close */}
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/15 transition-colors text-slate-300 border border-white/5 cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-sky-blue uppercase font-bold tracking-widest leading-none mb-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Inquiry Metadata Audit</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white leading-none">
                    {selectedInquiry.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal mt-2 leading-none">
                    Lead from <span className="font-bold text-slate-350">{selectedInquiry.company}</span> ({selectedInquiry.country})
                  </p>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-6">
                  {/* Meta specifications */}
                  <div className="grid grid-cols-1 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs sm:grid-cols-2">
                    <div>
                      <span className="block text-slate-450 font-bold font-mono text-[10px]">EMAIL ADDRESS</span>
                      <span className="font-bold text-slate-800 text-xs block mt-0.5">{selectedInquiry.email}</span>
                    </div>

                    <div>
                      <span className="block text-slate-450 font-bold font-mono text-[10px]">PHONE NUMBER</span>
                      <span className="font-bold text-slate-800 text-xs block mt-0.5">{selectedInquiry.phone || 'Not provided'}</span>
                    </div>

                    <div>
                      <span className="block text-slate-450 font-bold font-mono text-[10px]">COMPANY NAME</span>
                      <span className="font-bold text-slate-800 text-xs block mt-0.5">{selectedInquiry.company || 'Not provided'}</span>
                    </div>

                    <div>
                      <span className="block text-slate-450 font-bold font-mono text-[10px]">COUNTRY</span>
                      <span className="font-bold text-slate-800 text-xs block mt-0.5">{selectedInquiry.country || 'Not provided'}</span>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="block text-slate-450 font-bold font-mono text-[10px]">JOB TITLE</span>
                      <span className="font-bold text-ocean-blue text-xs block mt-0.5">{selectedInquiry.jobTitle || 'Not provided'}</span>
                    </div>
                  </div>

                  {/* Message content */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold text-slate-450 font-mono uppercase tracking-wider">Job Details</span>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 leading-relaxed font-sans font-normal whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </div>
                  </div>

                  {/* Realtime Status modifier */}
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold text-slate-450 font-mono uppercase tracking-wider">Modify Record Status</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {(['New', 'In Progress', 'Closed'] as InquiryStatus[]).map((st) => {
                        const isCurrent = selectedInquiry.status === st;
                        return (
                          <button
                            key={st}
                            onClick={() => handleStatusUpdate(st)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
                              isCurrent
                                ? st === 'New' ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' :
                                  st === 'In Progress' ? 'bg-amber-500 text-white border-amber-500 shadow-sm' :
                                  'bg-slate-700 text-white border-slate-700 shadow-sm'
                                : 'bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 border-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Custom supervisor notes area */}
                  <div className="space-y-2.5 pt-3 border-t border-slate-100">
                    <span className="block text-[10px] font-bold text-slate-450 font-mono uppercase tracking-wider">Supervisor Notes Checklist</span>
                    <textarea
                      rows={3}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Type custom internal instructions, checklist details, or operational updates here..."
                      className="block w-full rounded-xl border border-slate-200 text-xs px-4 py-3 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-ocean-blue focus:border-ocean-blue transition-colors font-sans leading-relaxed"
                    />
                    <div className="flex items-center justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleSaveNotes}
                        isLoading={savingNote}
                        icon="Save"
                        className="rounded-xl px-4 py-2 bg-slate-900 border-none font-semibold text-xs py-2 shadow"
                      >
                        {savingNote ? 'Commiting Notes...' : 'Save Notes'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Footer status indicators */}
                <div className="bg-slate-50 px-6 py-4.5 sm:px-8 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>SSL HANDSHAKE SYSTEM v2.1</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedInquiry(null)}
                  >
                    Close Sheet
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
