/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Service, PortfolioProject, Testimonial, BlogPost, EventItem } from '../types';

interface HomeViewProps {
  services: Service[];
  portfolio: PortfolioProject[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  events: EventItem[];
  loading: boolean;
  onNavigate: (page: string) => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 14
    }
  }
};

const galleryItems = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1600',
    title: 'Computational Laboratory',
    prompt:
      'A high-fidelity computing cluster operating with dense fiber optical arrays, neon indicators, clean desk layout.',
    resolution: '4K UHD'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600',
    title: 'Prismatic Lattices',
    prompt:
      'An abstract holographic landscape with rolling neon waves, glass prisms, and golden geometric lattices.',
    resolution: '8K UHD'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1600',
    title: 'Quantum Mainframe',
    prompt:
      'Quantum processor mainframe glowing with deep violet and crimson laser pathways, floating nanotech components.',
    resolution: '4K UHD'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1600',
    title: 'Neural Matrix',
    prompt:
      'Fluid neural network visualization mapping glowing cybernetic nodes, glowing synapse pathways, deep space backdrop.',
    resolution: '16K UHD'
  }
];

export const HomeView: React.FC<HomeViewProps> = ({
  services,
  portfolio,
  testimonials,
  blogs,
  onNavigate
}) => {
  const [galleryIndex, setGalleryIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const nextGallery = () => {
    setDirection(1);
    setGalleryIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const prevGallery = () => {
    setDirection(-1);
    setGalleryIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const featuredServices = services.slice(0, 4);
  const featuredPortfolio = portfolio.slice(0, 3);
  const primaryProject = portfolio[0];
  const featuredBlog = blogs[0];
  const topServices = featuredServices.slice(0, 3);

  return (
    <div className="min-h-screen space-y-20 bg-white pb-20 text-slate-800">
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pb-16 pt-28">
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0">
          <div className="absolute top-1/2 right-[-25%] h-[1000px] w-[800px] -translate-y-1/2 rotate-[-40deg] flex-col gap-5 opacity-95 sm:w-[1000px] lg:right-[-12%] lg:flex lg:w-[1200px] lg:opacity-100">
            <motion.div
              initial={{ opacity: 0.85, scale: 0.98 }}
              animate={{ opacity: [0.85, 1, 0.85], scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative h-20 w-full overflow-hidden rounded-full border border-blue-400/40 bg-gradient-to-r from-blue-700/10 via-blue-600/65 to-blue-700/10 shadow-[0_0_60px_rgba(37,99,235,0.45)] backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-95"
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0.9, scale: 1 }}
              animate={{ opacity: [0.9, 1, 0.9], scale: [1, 1.04, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="relative h-28 w-full overflow-hidden rounded-full border border-sky-400/55 bg-gradient-to-r from-blue-800/10 via-sky-500/75 to-blue-800/10 shadow-[0_0_80px_rgba(56,189,248,0.55)] backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white to-transparent opacity-100"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0.8, scale: 0.97 }}
              animate={{ opacity: [0.8, 0.95, 0.8], scale: [0.97, 1.01, 0.97] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              className="relative h-16 w-full overflow-hidden rounded-full border border-blue-500/35 bg-gradient-to-r from-blue-950/20 via-blue-700/55 to-blue-950/20 shadow-[0_0_50px_rgba(29,78,216,0.35)] backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-sky-300 to-transparent opacity-90"
                animate={{ x: ['-100%', '250%'] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0.9, scale: 0.99 }}
              animate={{ opacity: [0.9, 1, 0.9], scale: [0.99, 1.03, 0.99] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              className="relative h-24 w-full overflow-hidden rounded-full border border-blue-400/45 bg-gradient-to-r from-blue-800/15 via-blue-600/70 to-blue-800/15 shadow-[0_0_70px_rgba(37,99,235,0.5)] backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-200 to-transparent opacity-95"
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0.8, scale: 0.96 }}
              animate={{ opacity: [0.8, 0.95, 0.8], scale: [0.96, 1.01, 0.96] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
              className="relative h-14 w-full overflow-hidden rounded-full border border-sky-400/30 bg-gradient-to-r from-blue-900/10 via-sky-500/50 to-blue-900/10 shadow-[0_0_40px_rgba(56,189,248,0.35)] backdrop-blur-sm"
            >
              <motion.div
                className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
              />
            </motion.div>
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/60 to-transparent" />
        </div>

        <div className="relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8 text-left lg:col-span-7"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700"
              >
                <Sparkles className="h-3.5 w-3.5 animate-spin text-brand-600" />
                Next-Gen AI Systems
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
              >
                Empowering with <br />
                <span className="bg-gradient-to-r from-brand-700 via-brand-900 to-brand-600 bg-clip-text text-transparent">
                  AI Intelligence
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="max-w-xl text-base font-normal leading-relaxed text-slate-600 sm:text-lg"
              >
                High-performance conversational models and rapid, agile prototypes engineered to optimize operations.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="cursor-pointer rounded-full bg-brand-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-100 transition-all duration-200 hover:bg-brand-700 active:scale-95"
                >
                  Consult Now
                </button>
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="cursor-pointer rounded-full border-2 border-slate-200 bg-transparent px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95"
                >
                  Explore Showcase
                </button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 items-end gap-8 border-t border-slate-100 pt-12 sm:grid-cols-2"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-slate-900">
                    <span>Innovate</span>
                    <span className="text-slate-300">•</span>
                    <span>Technology</span>
                  </div>
                  <p className="max-w-sm text-xs leading-relaxed text-slate-500">
                    AI-powered solutions tailored to your business fast, efficient, and future-ready.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3 select-none">
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-300" />
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400" />
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-3xl font-black text-slate-900">99.9%</span>
                      <span className="font-mono text-xs font-bold text-brand-600">▲</span>
                    </div>
                    <span className="mt-1 block text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      Core Model SLA
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <div className="relative mt-8 flex justify-center lg:col-span-5 lg:mt-0 lg:justify-end">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.93 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 90, damping: 15, delay: 0.5 }}
                className="w-full max-w-[320px] space-y-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    New era of AI innovation
                  </span>
                  <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-brand-600" />
                </div>

                <div className="space-y-4">
                  <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-800">Solution Snapshot</span>
                      <span className="rounded-full border border-brand-100 bg-brand-50 px-2 py-0.5 font-mono text-[9px] text-brand-700">
                        READY
                      </span>
                    </div>
                    {primaryProject ? (
                      <div className="space-y-2">
                        <p className="text-sm font-bold leading-snug text-slate-900">{primaryProject.title}</p>
                        <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                          {primaryProject.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {(primaryProject.tags || []).slice(0, 2).map((tag, index) => (
                            <span
                              key={`${tag}-${index}`}
                              className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-full rounded-full bg-slate-200" />
                        <div className="h-1.5 w-5/6 rounded-full bg-slate-200" />
                        <div className="h-1.5 w-2/3 rounded-full bg-slate-200" />
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Priority Services
                      </span>
                      <span className="text-[10px] font-bold text-brand-600">{topServices.length || 3} TRACKS</span>
                    </div>
                    <div className="space-y-2.5">
                      {(topServices.length ? topServices : featuredServices).slice(0, 3).map((service, index) => (
                        <div
                          key={service.id || `${service.title}-${index}`}
                          className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-slate-800">{service.title}</p>
                            <p className="truncate text-[10px] text-slate-500">{service.category}</p>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-600">
                            Active
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-brand-700 bg-gradient-to-r from-brand-600 to-brand-800 p-4 text-white shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">
                        Delivery Focus
                      </span>
                      <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                        {featuredBlog ? 'LATEST INSIGHT' : 'ENTERPRISE READY'}
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-snug">
                      {featuredBlog?.title || 'Rapid prototypes, applied AI systems, and measurable business outcomes.'}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/85">
                      {featuredBlog?.excerpt || 'Explore implementation-ready services, portfolio delivery, and practical next steps for your organization.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="space-y-1 text-center">
              <span className="block text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">100%</span>
              <span className="block font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
                Safe SSL Standards
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">95%</span>
              <span className="block font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
                Process Automation Rate
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">5+</span>
              <span className="block font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
                Global Case Studies
              </span>
            </div>
            <div className="space-y-1 text-center">
              <span className="block text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">$4,999</span>
              <span className="block font-mono text-xs font-bold uppercase tracking-widest text-slate-500">
                Flat Prototyping Cost
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 shadow-sm sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="space-y-8 text-left lg:col-span-7">
              <div className="space-y-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-600">
                  Case-Study Portfolios
                </span>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  From Idea to <br />
                  <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                    AI Reality
                  </span>
                </h2>
                <p className="max-w-xl text-sm font-normal leading-relaxed text-slate-500 sm:text-base">
                  Turn your vision into a powerful AI solution. From automation to custom apps, we build fast, scalable, and future-ready AI products making real waves.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-8 border-t border-slate-200/60 pt-8">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 select-none">
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-900" />
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-400" />
                    <div className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                  </div>
                  <p className="max-w-[200px] text-xs font-medium leading-tight text-slate-500">
                    Automate repetitive tasks and boost productivity
                  </p>
                </div>
                <div>
                  <span className="text-4xl font-black text-slate-950 sm:text-5xl">96%</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('portfolio')}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-brand-800 active:scale-95"
                >
                  See All Studies
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="w-full max-w-[360px] rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="w-full space-y-5 rounded-[1.5rem] border border-white/5 bg-slate-900 p-5 text-white">
                  <div className="font-mono flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span>Projects</span>
                    <span className="flex items-center gap-1 text-brand-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
                      {portfolio.length || 5} ACTIVE
                    </span>
                  </div>

                  {primaryProject ? (
                    <div className="space-y-3 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white shadow-lg shadow-brand-500/10">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="rounded-full bg-white/20 px-2 py-0.5">
                          {primaryProject.client || 'Featured Client'}
                        </span>
                        <span>{typeof primaryProject.rating === 'number' ? primaryProject.rating.toFixed(1) : '5.0'} ★</span>
                      </div>
                      <h4 className="text-sm font-bold leading-snug sm:text-base">{primaryProject.title}</h4>
                      <p className="line-clamp-2 text-[10px] leading-relaxed text-white/90">
                        {primaryProject.description}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 rounded-2xl bg-brand-600 p-4 text-white shadow-lg shadow-brand-500/10">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                        <span className="rounded-full bg-white/20 px-2 py-0.5">Sunderland</span>
                        <span>5.0 ★</span>
                      </div>
                      <h4 className="text-sm font-bold leading-snug sm:text-base">
                        Eco-friendly cottage construction
                      </h4>
                    </div>
                  )}

                  <div className="space-y-2">
                    {featuredPortfolio.slice(1, 3).map((proj) => (
                      <div
                        key={proj.id}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3"
                      >
                        <span className="truncate pr-2 text-xs font-semibold text-slate-300">{proj.title}</span>
                        <div className="h-5 w-1 rounded-full bg-brand-500" />
                      </div>
                    ))}
                  </div>

                  <div className="cursor-pointer rounded-xl border border-dashed border-white/10 p-2.5 text-center text-[10px] font-bold text-slate-500 transition-colors hover:bg-white/5">
                    New project +
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 p-8 sm:p-12 lg:p-16">
          <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
            <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Built-In{' '}
              <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                AI Visual Creator
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm font-normal leading-relaxed text-slate-500 sm:text-base">
              Built by two award-winning creative developers, our vault. Explore server arrays, research units, and active computing nodes.
            </p>
          </div>

          <div className="relative aspect-[21/9] min-h-[300px] overflow-hidden rounded-3xl border border-slate-200/50 bg-slate-950 shadow-lg sm:min-h-[340px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={galleryIndex}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? '100%' : '-100%',
                    opacity: 0,
                    scale: 0.95
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    transition: {
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.35 },
                      scale: { duration: 0.4 }
                    }
                  },
                  exit: (dir: number) => ({
                    x: dir < 0 ? '100%' : '-100%',
                    opacity: 0,
                    scale: 0.95,
                    transition: {
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.35 },
                      scale: { duration: 0.4 }
                    }
                  })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_e, info) => {
                  const swipe = info.offset.x;
                  if (swipe < -50) nextGallery();
                  else if (swipe > 50) prevGallery();
                }}
                className="absolute inset-0 h-full w-full cursor-grab select-none active:cursor-grabbing"
              >
                <img
                  src={galleryItems[galleryIndex].src}
                  className="pointer-events-none h-full w-full object-cover brightness-90 saturate-110"
                  alt={galleryItems[galleryIndex].title}
                  referrerPolicy="no-referrer"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl border border-white/10 bg-slate-950/85 p-3 text-left shadow-2xl backdrop-blur-md sm:bottom-6 sm:left-6 sm:p-4">
                  <span className="block font-mono text-[9px] font-bold uppercase tracking-wider text-brand-400 sm:text-[10px]">
                    ACTIVE PREVIEW
                  </span>
                  <h3 className="mt-0.5 text-sm font-black leading-tight text-white sm:text-lg">
                    {galleryItems[galleryIndex].title}
                  </h3>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200/60 pt-6 sm:flex-row">
            <div className="flex w-full flex-col gap-4 text-left sm:w-auto sm:flex-row sm:items-center">
              <p className="text-xs font-medium tracking-wide text-slate-500">
                Swipe image directly or navigate below:
              </p>
              <div className="flex gap-2">
                {galleryItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > galleryIndex ? 1 : -1);
                      setGalleryIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === galleryIndex ? 'w-8 bg-brand-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex w-full items-center justify-between gap-6 sm:w-auto sm:justify-end">
              <button
                onClick={() => onNavigate('gallery')}
                className="cursor-pointer rounded-full bg-brand-600 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-brand-100 transition-all duration-200 hover:bg-brand-700 active:scale-95"
              >
                View Gallery
              </button>

              <div className="flex gap-2">
                <button
                  onClick={prevGallery}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-colors hover:border-slate-400 hover:text-slate-800 active:scale-90"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextGallery}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm transition-colors hover:border-slate-400 hover:text-slate-800 active:scale-90"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-100/50 bg-gradient-to-tr from-brand-50 via-white to-brand-50/50 p-8 text-center shadow-sm sm:p-12 md:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/30 via-transparent to-transparent" />

          <div className="relative z-10 mx-auto max-w-2xl space-y-6">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Build Your AI Prototype
            </h2>
            <p className="mx-auto max-w-lg text-sm font-normal leading-relaxed text-slate-500 sm:text-base">
              Transform your business operations with a secure, high-fidelity proof of concept built in 14 days.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <button
                onClick={() => onNavigate('contact')}
                className="cursor-pointer rounded-full bg-brand-600 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-brand-100 transition-all duration-200 hover:bg-brand-700 active:scale-95"
              >
                Book Now
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="cursor-pointer rounded-full border-2 border-slate-200 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-slate-600 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
              >
                Our Method
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
