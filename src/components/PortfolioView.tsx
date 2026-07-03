/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, ArrowUpRight, CheckCircle, Star, X } from 'lucide-react';
import { Button, Card, SectionHeader } from './UIElements';
import { PortfolioProject } from '../types';
import { resolveMediaUrl } from '../lib/api';

interface PortfolioViewProps {
  portfolio: PortfolioProject[];
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ portfolio }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const getTags = (project: PortfolioProject) =>
    Array.isArray(project.tags) && project.tags.length > 0 ? project.tags : ['AI Solution'];

  const getFeatures = (project: PortfolioProject) =>
    Array.isArray(project.features) && project.features.length > 0
      ? project.features
      : ['Business-ready implementation tailored to operational goals.'];

  const getRating = (project: PortfolioProject) =>
    typeof project.rating === 'number' && Number.isFinite(project.rating) ? project.rating : 4.8;

  const getClient = (project: PortfolioProject) =>
    (typeof project.client === 'string' && project.client.trim()) || 'AI-Solutions Client';

  const getImage = (project: PortfolioProject) =>
    resolveMediaUrl(
      (typeof project.image === 'string' && project.image.trim()) ||
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800'
    );

  const allTags = ['All', 'Healthcare', 'Retail', 'EdTech', 'Logistics', 'Manufacturing'];

  const filteredProjects = activeCategory === 'All'
    ? portfolio
    : portfolio.filter((project) =>
        getTags(project).some((tag) => tag.toLowerCase().includes(activeCategory.toLowerCase()))
      );

  return (
    <div className="space-y-16 py-12">
      <SectionHeader
        title="Deployed Digital Systems"
        subtitle="Review our portfolio of live machine learning integrations, computer vision edge checkers, and custom scheduling engines."
        badge="Enterprise Case Studies"
      />

      <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-2xl mx-auto">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveCategory(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider cursor-pointer transition-all border ${
              activeCategory === tag
                ? 'bg-[#2E86DE] border-[#2E86DE] text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.id}
            >
              <Card
                onClick={() => setSelectedProject(project)}
                className="overflow-hidden h-full flex flex-col justify-between group cursor-pointer border border-slate-100"
              >
                <div>
                  <div className="h-52 relative overflow-hidden bg-slate-100">
                    <img
                      src={getImage(project)}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />

                    <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-yellow-500 flex items-center gap-1 border border-white/10">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 shrink-0" />
                      {getRating(project).toFixed(1)}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {getTags(project).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-brand-50 text-[10px] font-mono text-ocean-blue font-semibold border border-brand-100">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-ocean-blue transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3 text-slate-350" />
                    {getClient(project)}
                  </span>
                  <span className="inline-flex items-center text-ocean-blue font-bold tracking-tight hover:underline gap-0.5 cursor-pointer">
                    View Case Study
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border border-slate-100"
              >
                <div className="h-64 relative bg-slate-100 font-sans">
                  <img
                    src={getImage(selectedProject)}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/45 to-transparent" />

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900/80 transition-colors cursor-pointer border border-white/10"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {getTags(selectedProject).map((tag, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[10px] font-mono font-bold text-white uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-mono text-xs">
                    <div>
                      <span className="block text-slate-400">CLIENT</span>
                      <span className="font-bold text-slate-800">{getClient(selectedProject)}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">DATE DELIVERED</span>
                      <span className="font-bold text-slate-800">{selectedProject.year}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">OUTCOME METRIC</span>
                      <span className="font-bold text-emerald-600">★ {getRating(selectedProject).toFixed(1)} / 5.0 Rating</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">CERTIFICATION</span>
                      <span className="font-bold text-ocean-blue">CET333 Compliant</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-base font-bold text-slate-800 tracking-tight">Scope Summary</h4>
                    <p className="text-sm font-normal text-slate-500 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-base font-bold text-slate-800 tracking-tight">Key Achievements & Integrations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {getFeatures(selectedProject).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                          <CheckCircle className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-600 font-medium leading-normal">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 px-6 py-4.5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <span className="text-xs text-slate-400 font-mono">Need a similar integration for your business?</span>
                  <Button
                    variant="primary"
                    size="sm"
                    icon="ArrowUpRight"
                    onClick={() => { setSelectedProject(null); }}
                  >
                    Discuss This Solution
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
