/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, Clock, MapPin, Video, Users, Layers, Award } from 'lucide-react';
import { Card, SectionHeader } from './UIElements';
import { EventItem } from '../types';
import { resolveMediaUrl } from '../lib/api';

interface EventsViewProps {
  events: EventItem[];
}

export const EventsView: React.FC<EventsViewProps> = ({ events }) => {
  return (
    <div className="space-y-16 py-12">
      {/* HEADER */}
      <SectionHeader
        title="Upcoming & Past Events"
        subtitle="Reserve seats at upcoming masterclasses, technical galas, and developer summiteers organized by AI-Solutions."
        badge="Events Registry"
      />

      {/* UPCOMING TIMELINE */}
      <div className="max-w-4xl mx-auto space-y-8 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-slate-200/60 pb-10">
        
        {events.map((ev, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={ev.id} className={`flex flex-col sm:flex-row items-start sm:items-center relative ${
              isEven ? 'sm:flex-row-reverse' : ''
            }`}>
              {/* Timeline Center Bullet Pin */}
              <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-ocean-blue border-4 border-slate-50 transform -translate-x-1.5 sm:-translate-x-2 z-10 animate-ping" />
              <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-ocean-blue border-2 border-white transform -translate-x-1 sm:-translate-x-1.5 z-10" />

              {/* Event Card Content Wrap */}
              <div className="w-full sm:w-[46%] pl-10 sm:pl-0">
                <Card className={`p-6 border border-slate-100 ${
                  isEven ? 'sm:mr-6' : 'sm:ml-6'
                } group`}>
                  <div className="space-y-4">
                    {/* Thumbnail banner */}
                    <div className="h-40 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                      <img 
                        src={resolveMediaUrl(ev.image)} 
                        alt={ev.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                          ev.type === 'Virtual' ? 'bg-indigo-50 border border-indigo-100 text-indigo-700' :
                          ev.type === 'Hybrid' ? 'bg-amber-50 border border-amber-100 text-amber-700' :
                          'bg-emerald-50 border border-emerald-100 text-emerald-700'
                        }`}>
                          {ev.type}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-800 group-hover:text-ocean-blue transition-colors leading-snug tracking-tight">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-slate-400 font-normal leading-relaxed line-clamp-2">
                      {ev.description}
                    </p>

                    {/* Metadata items list */}
                    <div className="grid grid-cols-1 gap-2 pt-3 border-t border-slate-50 text-[11px] font-medium text-slate-500 font-mono">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        {ev.type === 'Virtual' ? (
                          <Video className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        ) : (
                          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        )}
                        <span className="truncate">{ev.location}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAST PROMOTIONAL GALLERY ROW */}
      <section className="bg-white py-12 rounded-3xl border border-slate-150/40 p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 font-mono">Community History</span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800">Past Conferences & Roadshows</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'APAC AI DevCon 2025',
              attendees: '2,500+ Engineers',
              role: 'Keynote Speaker Block',
              location: 'Marina Bay Sands, SG'
            },
            {
              title: 'Open Source AI Summit',
              attendees: '1,200+ Core Devs',
              role: 'Track Organizer Panel',
              location: 'Palais Congress, FR'
            },
            {
              title: 'MLOps Global Expo 25',
              attendees: '4,000+ DevOps',
              role: 'Sponsor Booth Live',
              location: 'Moscone West, SF'
            },
            {
              title: 'Intellectual Health Devs',
              attendees: '800+ Caregivers',
              role: 'Clinical Deployments MVP',
              location: 'Euston Quad, UK'
            }
          ].map((past, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-col justify-between text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-brand-50 text-ocean-blue flex items-center justify-center mx-auto shadow-inner">
                <Award className="h-5 w-5" />
              </div>
              <div className="space-y-1.5 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 truncate">{past.title}</h4>
                <p className="text-[10px] text-slate-400 font-mono truncate">{past.role}</p>
                <p className="text-[10px] font-semibold text-ocean-blue font-mono truncate">{past.attendees}</p>
              </div>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200/60 font-mono flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{past.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
