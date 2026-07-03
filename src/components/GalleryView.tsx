/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Maximize2,
  X,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';
import { EmptyState } from './UIElements';
import { GalleryItem } from '../types';
import { resolveMediaUrl } from '../lib/api';

interface GalleryViewProps {
  galleryItems: GalleryItem[];
}

export const GalleryView: React.FC<GalleryViewProps> = ({ galleryItems }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxItem, setCurrentLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', ...Array.from(new Set(galleryItems.map((item) => item.category)))];
  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const currentIndex = currentLightboxItem
    ? filteredItems.findIndex((item) => item.id === currentLightboxItem.id)
    : -1;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (event.key === 'Escape') {
        setLightboxOpen(false);
        setCurrentLightboxItem(null);
      }
      if (event.key === 'ArrowRight' && currentIndex !== -1) {
        setCurrentLightboxItem(filteredItems[(currentIndex + 1) % filteredItems.length]);
      }
      if (event.key === 'ArrowLeft' && currentIndex !== -1) {
        setCurrentLightboxItem(
          filteredItems[(currentIndex - 1 + filteredItems.length) % filteredItems.length]
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, filteredItems, currentIndex]);

  if (!galleryItems.length) {
    return (
      <div className="py-24">
        <EmptyState
          title="Gallery content unavailable"
          description="Photo items will appear here once they are added through the admin panel or loaded from the API."
          icon="Image"
        />
      </div>
    );
  }

  return (
    <div className="space-y-16 py-24">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ocean-blue">
          <ImageIcon className="h-3 w-3" />
          Photo Chronicle
        </span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-brand-900 sm:text-5xl">
          Operational Gallery
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Explore the visual side of AI-Solutions across labs, presentations, collaboration sessions,
          and infrastructure snapshots.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-xl border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              selectedCategory === category
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                setCurrentLightboxItem(item);
                setLightboxOpen(true);
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 text-left shadow-sm transition hover:shadow-xl"
            >
              <img
                src={resolveMediaUrl(item.image)}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-950/45 opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-sky-blue backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="mt-2 text-sm font-bold text-white">{item.title}</h3>
              </div>
              <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/20 text-white opacity-0 transition group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {lightboxOpen && currentLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.92 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setLightboxOpen(false);
                setCurrentLightboxItem(null);
              }}
              className="fixed inset-0 bg-slate-950"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/5 bg-slate-900 text-white shadow-2xl md:flex-row"
            >
              <div className="relative h-64 bg-black/40 md:h-[500px] md:w-3/5">
                <img
                  src={resolveMediaUrl(currentLightboxItem.image)}
                  alt={currentLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-sky-blue">
                      {currentLightboxItem.category}
                    </span>
                    <button
                      onClick={() => {
                        setLightboxOpen(false);
                        setCurrentLightboxItem(null);
                      }}
                      className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="mt-6 text-2xl font-black tracking-tight">{currentLightboxItem.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{currentLightboxItem.description}</p>

                  <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-sky-blue" />
                      {currentLightboxItem.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-sky-blue" />
                      {currentLightboxItem.location}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-[10px] font-mono text-slate-500">
                    Image {currentIndex + 1} of {filteredItems.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentLightboxItem(
                          filteredItems[(currentIndex - 1 + filteredItems.length) % filteredItems.length]
                        )
                      }
                      className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentLightboxItem(filteredItems[(currentIndex + 1) % filteredItems.length])
                      }
                      className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
