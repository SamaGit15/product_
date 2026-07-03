/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Target, Award, Eye, Zap, Group, Users, Layers } from 'lucide-react';
import { Card, SectionHeader } from './UIElements';

export const AboutView: React.FC = () => {
  const values = [
    {
      title: 'Adaptive Learning',
      desc: 'We optimize systems continuously by reviewing client datasets to ensure accuracy is optimized at runtime.',
      icon: 'Zap',
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Architectural Transparency',
      desc: 'All our models and prototyping parameters are fully documented on Github and secure cloud infrastructure.',
      icon: 'Layers',
      color: 'bg-brand-50 text-ocean-blue'
    },
    {
      title: 'Ethical Engineering',
      desc: 'We follow robust, clean security patterns (e.g. SSL, SSL certificates, HIPAA compliance checks).',
      icon: 'ShieldCheck',
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Client Synergies',
      desc: 'We partner directly with academic, institutional, and enterprise teams to resolve critical bottlenecks.',
      icon: 'Users',
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <div className="space-y-16 py-12">
      {/* HEADER */}
      <SectionHeader
        title="We engineer intelligent workflows"
        subtitle="Unlocking business speed and operational scale through custom-tailored artificial intelligence models."
        badge="About AI-Solutions"
      />

      {/* CONCEPT GRID OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-brand-900 tracking-tight">Our Organization & Methodology</h3>
          <p className="text-sm font-normal text-slate-500 leading-relaxed">
            AI-Solutions is a forward-thinking software start-up originally conceptualized for the CET333 Product Development module. We specialize in producing production-ready custom software configurations, automated workflows, and rapid high-fidelity software prototypes.
          </p>
          <p className="text-sm font-normal text-slate-500 leading-relaxed">
            Instead of overpromising with high-latency generic chatbots, we engineer custom workflows built on top of robust frameworks, sub-second relational search, and highly structured telemetry outputs.
          </p>
          <div className="p-4 bg-brand-50 rounded-xl border border-brand-100/50 flex gap-3 text-xs text-brand-900 font-semibold">
            <Award className="h-5 w-5 text-ocean-blue shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">CET333 Product Prototype Sandbox</p>
              <p className="font-normal text-slate-500 mt-1">This website serves as an elite evaluation proof of concept showcasing modern telemetry dashboards, real-time reactive filters, and custom API connections.</p>
            </div>
          </div>
        </div>

        {/* Vision Mission Side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
            <Target className="h-8 w-8 text-rose-500 mb-4" />
            <h4 className="text-base font-bold text-slate-800 tracking-tight">Mission</h4>
            <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
              To deliver scalable, transparent, and responsive artificial intelligence layers that integrate into active corporate database servers within 14 days.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden">
            <Eye className="h-8 w-8 text-[#2E86DE] mb-4" />
            <h4 className="text-base font-bold text-slate-800 tracking-tight">Vision</h4>
            <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed">
              To democratize machine learning frameworks for small and medium enterprises using flat-rate prototyping modules and clear KPI scorecards.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US VALUES */}
      <section className="space-y-10">
        <div className="text-center">
          <span className="text-xs font-semibold text-ocean-blue uppercase tracking-widest font-mono">Operations Culture</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-brand-900">Our Core Pillars</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <Card hover={true} key={i} className="p-6">
              <div className="space-y-4">
                <div className={`p-3 rounded-xl w-12 h-12 flex items-center justify-center ${v.color}`}>
                  {v.icon === 'Zap' && <Zap className="h-6 w-6" />}
                  {v.icon === 'Layers' && <Layers className="h-6 w-6" />}
                  {v.icon === 'ShieldCheck' && <ShieldCheck className="h-6 w-6" />}
                  {v.icon === 'Users' && <Users className="h-6 w-6" />}
                </div>
                <h4 className="text-base font-bold text-slate-850 tracking-tight">{v.title}</h4>
                <p className="text-xs font-normal text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* TEAM MEMBERS (SUBSECTION) */}
      <section className="bg-slate-900 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          <div className="md:col-span-4 text-center md:text-left space-y-3">
            <span className="text-xs font-mono text-sky-blue uppercase tracking-wider font-bold">Academic Core</span>
            <h3 className="text-2xl font-bold tracking-tight">Project Architect</h3>
            <p className="text-xs text-slate-350 leading-relaxed font-normal">
              Designed as a premium client integration wrapper under university specifications for CET333 Product Development.
            </p>
          </div>
          
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sky-blue text-slate-900 flex items-center justify-center font-bold font-mono text-xs">
                SM
              </div>
              <div>
                <h4 className="text-sm font-bold truncate">Swornim Moktan</h4>
                <p className="text-[10px] text-slate-400 font-mono">Lead Frontend Architect</p>
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold font-mono text-xs">
                SM
              </div>
              <div>
                <h4 className="text-sm font-bold truncate">Sama</h4>
                <p className="text-[10px] text-slate-400 font-mono">Virtual Code Companion</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
