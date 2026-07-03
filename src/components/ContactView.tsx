/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { Button, FormInput, Card } from './UIElements';
import { ApiClient } from '../lib/api';

interface ContactViewProps {
  contactTimezone?: string;
  brandName?: string;
  contactHeading?: string;
  contactAddress?: string;
  contactEmail?: string;
  contactPhone?: string;
  onInquirySubmitted?: () => void | Promise<void>;
}

export const ContactView: React.FC<ContactViewProps> = ({
  contactTimezone,
  brandName = 'AI-Solutions',
  contactHeading,
  contactAddress,
  contactEmail,
  contactPhone,
  onInquirySubmitted
}) => {
  // Form input states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    jobTitle: '',
    message: ''
  });

  // Validation & response states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const countriesList = [
    'United States', 'Singapore', 'Germany', 'France', 'Australia', 'United Kingdom', 'Canada', 'India', 'Japan'
  ];

  // Self-contained client form validators
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Business Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid business email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+\d][\d\s()-]{6,19}$/.test(formData.phone)) {
      newErrors.phone = 'Please provide a valid phone number';
    }
    if (!formData.country.trim()) newErrors.country = 'Operating Country is required';
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please provide a descriptive inquiry message (min 15 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) return;

    setSubmitting(true);
    try {
      // Submitting through adaptive ApiClient
      const result = await ApiClient.createInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: '',
        country: formData.country,
        jobTitle: formData.jobTitle,
        message: formData.message
      });

      if (result) {
        await onInquirySubmitted?.();
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          country: '',
          jobTitle: '',
          message: ''
        });
        setErrors({});
      } else {
        throw new Error('API server returned unexpected state');
      }
    } catch (err) {
      setSubmitError('The API server is currently offline. Your inquiry has been secured in local persistent cache.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12 py-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-ocean-blue border border-brand-100 uppercase tracking-widest font-mono">
          Initiate Integration
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-900 mt-1">
          Connect with AI Engineering
        </h2>
        <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto font-normal">
          Inquire below to book a Flat-rate $4,999 Rapid Prototyping cycle or consult on full enterprise workflow automation schemas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-stretch">
        
        {/* LEFT SIDE: DESIGNED FORM CONTAINER */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleInquirySubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 tracking-tight pb-3 border-b border-slate-100">
              Inquiry Parameters
            </h3>

            {/* Success and local storage safe alerts */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs font-semibold flex items-start gap-2.5"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">Inquiry Transmitted Successfully!</p>
                    <p className="font-normal text-emerald-700/80 mt-1">Our enterprise automation specialists will review your parameters and respond with a technical brief within 24 hours.</p>
                  </div>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-xs font-semibold flex items-start gap-2.5"
                >
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-bold">Adaptive Transmission Notice</p>
                    <p className="font-normal text-amber-700/80 mt-1">{submitError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <FormInput
                label="Full Name"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                icon="User"
              />

              {/* Email */}
              <FormInput
                label="Business Email"
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                icon="Mail"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Company */}
              <FormInput
                label="Company Name"
                placeholder="Name of Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                error={errors.company}
                icon="Briefcase"
              />

              <FormInput
                label="Phone Number"
                placeholder="+00 000 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                icon="Phone"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                label="Job Title"
                placeholder="Title of Job"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                icon="User"
              />

              {/* Country Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 font-sans">Corporate Location</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className={`block w-full rounded-xl border ${
                    errors.country ? 'border-red-300' : 'border-slate-200'
                  } px-4 py-3 bg-white text-slate-800 placeholder-slate-400 text-sm font-sans focus:ring-2 focus:ring-ocean-blue focus:border-ocean-blue transition-all focus:outline-none`}
                >
                  <option value="">Select country...</option>
                  {countriesList.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.country && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.country}</p>}
              </div>
            </div>

            {/* Job details */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5 font-sans font-medium">Job Details</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe the role, responsibilities, project scope, and any details you want us to know..."
                className={`block w-full rounded-xl border ${
                  errors.message ? 'border-red-300 focus:ring-red-400 focus:border-red-400' : 'border-slate-200 focus:ring-ocean-blue focus:border-ocean-blue'
                } px-4 py-3.5 bg-white text-slate-800 placeholder-slate-400 text-sm font-sans transition-all focus:ring-2 focus:ring-offset-0 focus:outline-none leading-relaxed`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message}</p>}
            </div>

            {/* Actuators */}
            <Button
              type="submit"
              variant="primary"
              isLoading={submitting}
              className="w-full py-4 text-sm font-bold tracking-tight bg-brand-500 rounded-xl"
              icon="Send"
            >
              Request Custom Consultation Brief
            </Button>
          </form>
        </div>

        {/* RIGHT SIDE: INFORMATION SIDE PANEL */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <Card hover={false} className="p-8 bg-slate-900 border-none text-white flex-1 flex flex-col justify-between min-h-[350px]">
            <div className="space-y-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#89C2FF] font-semibold bg-white/10 px-2.5 py-1 rounded-md border border-white/5">
                Headquarters
              </span>
              <h3 className="text-xl font-bold tracking-tight text-white leading-snug">{contactHeading || `${brandName} at the University of Sunderland`}</h3>
              
              <div className="space-y-4 pt-2">
                <div className="flex gap-3 text-xs">
                  <MapPin className="h-5 w-5 text-sky-blue shrink-0" />
                  <span className="font-normal text-slate-300 leading-relaxed">
                    {contactAddress || "David Goldman Informatics Centre, University of Sunderland, St Peter's Campus, Sunderland SR6 0DD, United Kingdom."}
                  </span>
                </div>

                <div className="flex gap-3 text-xs">
                  <Phone className="h-5 w-5 text-sky-blue shrink-0" />
                  <span className="font-normal text-slate-300">{contactPhone || '+44 (0)191 515 2000'}</span>
                </div>

                <div className="flex gap-3 text-xs">
                  <Mail className="h-5 w-5 text-sky-blue shrink-0" />
                  <span className="font-normal text-slate-300">{contactEmail || 'integrations@ai-solutions.co.uk'}</span>
                </div>

                <div className="flex gap-3 text-xs">
                  <Clock className="h-5 w-5 text-sky-blue shrink-0" />
                  <span className="font-normal text-slate-300">{contactTimezone || 'Mon - Fri: 09:00 - 17:00 UK Time'}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 text-[10px] text-slate-400 font-mono flex items-center justify-between">
              <span>SSL SECURED GATEWAYS</span>
              <span>CET333 PLATFORM V2.1</span>
            </div>
          </Card>

          {/* Academic disclaimer box */}
          <div className="p-6 bg-slate-50 border border-slate-150 rounded-2xl flex items-start gap-3.5 text-xs">
            <div className="p-2.5 rounded-xl bg-brand-50 text-ocean-blue h-10 w-10 shrink-0 flex items-center justify-center">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800">Academic Verification Blueprint</p>
              <p className="font-normal text-slate-400 mt-1 leading-relaxed">
                When you submit this form, our secure client state logic intercepts the payload. If the server-side MERN database is active, it completes a direct POST call. Otherwise, it gracefully persists the record inside your browser cache so you can test updates in the Administrator panel seamlessly.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
