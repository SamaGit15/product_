/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Quote, Star } from 'lucide-react';
import { Card, SectionHeader } from './UIElements';
import { Testimonial } from '../types';
import { resolveMediaUrl } from '../lib/api';

interface TestimonialsViewProps {
  testimonials: Testimonial[];
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({ testimonials }) => {
  const getAvatarSrc = (avatar?: string) => {
    const resolved = resolveMediaUrl(avatar);
    return resolved || null;
  };

  const getInitials = (name?: string) =>
    String(name || '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('') || 'AI';

  const getRating = (rating?: number) => {
    const normalized = Number(rating);
    if (!Number.isFinite(normalized)) return 5;
    return Math.min(5, Math.max(1, normalized));
  };

  return (
    <div className="space-y-16 py-12">
      {/* HEADER */}
      <SectionHeader
        title="Direct Evaluator Reviews"
        subtitle="Explore verified feedback forms and execution safety metrics provided by leading business enterprise operations directors."
        badge="Executive Appraisals"
      />

      {/* HIGHLIGHT CARD */}
      <div className="bg-gradient-to-r from-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl max-w-5xl mx-auto">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#89C2FF] font-semibold bg-white/10 px-2.5 py-1 rounded-md border border-white/5">
              AVERAGE SATISFACTION INDEX
            </span>
            <h3 className="text-3xl font-extrabold tracking-tight leading-tight">100% Client Trust Rating</h3>
            <p className="text-sm text-[#D6DBDF] font-normal leading-relaxed">
              Every system deployment, machine learning integration, and localized routing script handles strict quality-assurance triggers prior to release. Our CET333 product models ensure absolute integrity in business critical parameters.
            </p>
          </div>
          <div className="md:col-span-4 text-center md:text-right border-l md:border-l-2 border-white/10 pl-0 md:pl-8 py-2">
            <div className="flex items-center justify-center md:justify-end gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="block text-4xl font-black text-white">4.9 / 5.0</span>
            <span className="block text-xs uppercase tracking-widest font-mono text-[#89C2FF] mt-1">SLA Verification</span>
          </div>
        </div>
      </div>

      {/* TESTIMONIAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((test) => (
          <Card key={test.id} className="p-8 flex flex-col justify-between border border-slate-100 relative group">
            {/* Quote watermark icon */}
            <Quote className="absolute top-6 right-8 h-10 w-10 text-brand-50/70 group-hover:text-brand-100/70 transition-colors pointer-events-none -z-10" />

            <div className="space-y-4 relative z-10">
              {/* Stars Grid */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(Math.round(getRating(test.rating)))].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  {getRating(test.rating).toFixed(1)} / 5.0
                </span>
              </div>

              {/* Message text */}
              <p className="text-slate-600 text-sm leading-relaxed italic font-normal">
                "{test.content}"
              </p>
            </div>

            {/* Profile Header */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center gap-4 relative z-10">
              {getAvatarSrc(test.avatar) ? (
                <img 
                  src={getAvatarSrc(test.avatar) || undefined} 
                  alt={test.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-200 shadow-sm"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-200 bg-brand-50 text-sm font-bold text-ocean-blue shadow-sm">
                  {getInitials(test.name)}
                </div>
              )}
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-800 tracking-tight truncate">
                  {test.name}
                </h4>
                <p className="text-xs text-slate-400 font-normal truncate">
                  {test.role?.trim()
                    ? <>{test.role} at <span className="font-semibold text-ocean-blue">{test.company}</span></>
                    : <span className="font-semibold text-ocean-blue">{test.company}</span>}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
