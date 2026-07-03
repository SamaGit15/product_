/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CornerDownRight } from 'lucide-react';
import { Card, DynamicIcon, SectionHeader } from './UIElements';
import { Service } from '../types';
import { resolveMediaUrl } from '../lib/api';

interface ServicesViewProps {
  services: Service[];
}

const serviceImageMap: Record<string, string> = {
  'AI-Powered Virtual Assistant': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
  'Affordable Prototyping': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
  'Automation Engine': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=1200',
  'Custom Software Architecture': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200'
};

const categoryImageMap: Record<string, string> = {
  'AI Solutions': 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&q=80&w=1200',
  Automation: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=1200',
  Development: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1200',
  Analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'
};

const getServiceImage = (service: Service) =>
  resolveMediaUrl(
    service.image ||
    serviceImageMap[service.title] ||
    categoryImageMap[service.category] ||
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200'
  );

export const ServicesView: React.FC<ServicesViewProps> = ({ services }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-16 py-12">
      {/* HEADER */}
      <SectionHeader
        title="Engineered Strategic Solutions"
        subtitle="Unlocking business agility using machine learning model routing, enterprise process automations, and Rapid Proof of Concepts."
        badge="Enterprise Services Catalog"
      />

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
              selectedCategory === cat
                ? 'bg-midnight-blue border-midnight-blue text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((srv) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            key={srv.id}
          >
              <Card className="h-full overflow-hidden p-0 group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={getServiceImage(srv)}
                    alt={srv.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#2E86DE] font-semibold bg-white/90 px-2.5 py-1 rounded-md border border-white/70">
                      {srv.category}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/90 text-ocean-blue shadow-sm">
                      <DynamicIcon name={srv.icon} className="h-5 w-5" />
                    </div>
                  </div>
                </div>

              <div className="flex h-[calc(100%-13rem)] flex-col justify-between p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">{srv.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal">{srv.description}</p>
                  
                  {/* Feature bullet list */}
                  <div className="space-y-2 pt-3 border-t border-slate-50">
                    <p className="text-[11px] uppercase tracking-widest font-mono text-slate-400 font-bold">Scope Capabilities</p>
                    {srv.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 font-sans">
                        <CornerDownRight className="h-3.5 w-3.5 text-[#89C2FF] shrink-0 mt-0.5" />
                        <span className="font-normal">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">CET333 Model Certified</span>
                  <div className="text-right">
                    <span className="block text-[9px] text-slate-400 font-semibold tracking-wider">ANNUAL RATING</span>
                    <span className="text-base font-extrabold text-[#1B4F72]">{srv.pricing}</span>
                  </div>
                </div>
              </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};
