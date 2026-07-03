/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, BarChart2, PieChart, Info, HelpCircle, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';
import { Card, SectionHeader } from './UIElements';
import { Inquiry } from '../types';

interface AdminAnalyticsViewProps {
  inquiries: Inquiry[];
}

export const AdminAnalyticsView: React.FC<AdminAnalyticsViewProps> = ({ inquiries }) => {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Statistics Compilation logic
  const serviceCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};

  inquiries.forEach((inq) => {
    serviceCounts[inq.service] = (serviceCounts[inq.service] || 0) + 1;
    countryCounts[inq.country] = (countryCounts[inq.country] || 0) + 1;
  });

  const serviceData = Object.entries(serviceCounts).map(([name, count]) => ({ name, count }));
  const countryData = Object.entries(countryCounts).map(([name, count]) => ({ name, count }));

  // Sort helper
  const maxServiceCount = Math.max(...serviceData.map((d) => d.count), 1);
  const maxCountryCount = Math.max(...countryData.map((d) => d.count), 1);

  return (
    <div className="space-y-8 pb-12 font-sans">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">KPI Analytics Telemetry</span>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight mt-0.5">Statistical BI Models Dashboard</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider bg-brand-50 text-ocean-blue border border-brand-100 uppercase uppercase shrink-0">
          <Sparkles className="h-3 w-3 animate-spin" />
          Real-time Engine Active
        </span>
      </div>

      {/* CORE STAT OVERVIEWS PILL CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* SERVICES INQUIRIES FREQUENCY BAR CHART */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <h3 className="text-xs font-bold text-slate-450 uppercase font-mono tracking-wider flex items-center gap-2">
              <BarChart2 className="h-4.5 w-4.5 text-ocean-blue shrink-0" />
              Service Demand Index (CRM Requests)
            </h3>
            <span className="text-[10px] font-semibold font-mono text-slate-400">Y-AXIS: Count of Submissions</span>
          </div>

          <div className="space-y-5 pt-2">
            {serviceData.map((item, idx) => {
              const pct = (item.count / maxServiceCount) * 100;
              const isHovered = hoveredBar === item.name;

              return (
                <div 
                  key={idx} 
                  className="space-y-1.5"
                  onMouseEnter={() => setHoveredBar(item.name)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-700 truncate max-w-[280px]">{item.name}</span>
                    <span className="font-mono font-bold text-ocean-blue bg-brand-50/70 px-2 py-0.5 rounded-md border border-brand-100/30">
                      {item.count} inquiries ({Math.round(pct)}%)
                    </span>
                  </div>

                  {/* Visual Bar gauge container */}
                  <div className="h-7 w-full bg-slate-50 rounded-xl overflow-hidden border border-slate-200/50 flex relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className={`h-full min-w-[15px] bg-gradient-to-r ${
                        isHovered ? 'from-brand-600 to-sky-blue' : 'from-ocean-blue to-brand-300'
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <span className="text-[9px] font-mono text-slate-400 font-bold">MODEL-{idx+1}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-50 text-[10px] text-slate-400 font-mono flex items-center gap-2">
            <Info className="h-4 w-4 text-slate-400 shrink-0" />
            <span>Interactive graph monitors total CRM submissions matching localized databases. Hover on bars to highlight paths.</span>
          </div>
        </div>

        {/* REGIONAL FOOTPRINT DISPERSION PIE DONUT */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <h3 className="text-xs font-bold text-slate-450 uppercase font-mono tracking-wider flex items-center gap-2">
              <PieChart className="h-4.5 w-4.5 text-ocean-blue shrink-0" />
              Regional Dispersion (Country Weights)
            </h3>
            <span className="text-[10px] font-semibold font-mono text-slate-400">Total Countries: {countryData.length}</span>
          </div>

          {/* Interactive visual Donut segment mockup */}
          <div className="flex-1 flex flex-col items-center justify-center py-6 min-h-[220px]">
            <div className="relative w-40 h-40 rounded-full border-8 border-slate-50 flex flex-col items-center justify-center bg-transparent shadow-inner">
              <div className="w-24 h-24 rounded-full bg-brand-50 flex flex-col items-center justify-center border border-brand-100/30">
                <TrendingUp className="h-6 w-6 text-ocean-blue animate-bounce" />
                <span className="text-xl font-extrabold text-brand-900 mt-1 font-mono">{inquiries.length}</span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-slate-400 mt-0.5">Records Total</span>
              </div>

              {/* Minimal SVG decorative circle ring */}
              <svg className="absolute inset-0 -mr-2 -mt-2 w-[176px] h-[176px] -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" stroke="#2E86DE" strokeWidth="8" fill="transparent" strokeDasharray="264" strokeDashoffset="66" className="opacity-80" />
                <circle cx="50" cy="50" r="42" stroke="#89C2FF" strokeWidth="8" fill="transparent" strokeDasharray="264" strokeDashoffset="200" className="opacity-90" />
              </svg>
            </div>
          </div>

          {/* Color mapping flags */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50 text-xs">
            {countryData.slice(0, 4).map((country, i) => {
              const countryPct = (country.count / inquiries.length) * 100;
              const pillColors = ['border-ocean-blue text-brand-700 bg-brand-50', 'border-sky-blue text-indigo-700 bg-indigo-50/40', 'border-emerald-500 text-emerald-700 bg-emerald-50', 'border-amber-500 text-amber-700 bg-amber-50'];
              return (
                <div key={i} className={`p-2 rounded-xl border flex items-center justify-between font-bold ${pillColors[i % 4]}`}>
                  <span className="truncate">{country.name}</span>
                  <span className="font-mono text-[10px] font-black">{Math.round(countryPct)}%</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ADDITIONAL BI GAUGE CHECKLIST */}
      <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-inner shrink-0">
            <LineChart className="h-5 w-5 text-sky-blue animate-pulse" />
          </div>
          <div>
            <span className="block text-sm font-bold tracking-tight text-white leading-none">Database Synchronization Telemetry</span>
            <span className="block text-xs font-normal text-slate-350 mt-1">
              Showing aggregated performance indices direct from localized database tunnel hosts.
            </span>
          </div>
        </div>
        <div className="p-3.5 bg-white/5 border border-white/5 rounded-xl font-mono text-[10px] text-right text-[#89C2FF] font-bold">
          LATENCY: 0.02s • INDEX_SPS: 450
        </div>
      </div>
    </div>
  );
};
