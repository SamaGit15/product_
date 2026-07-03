/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, Clock, ChevronRight, X } from 'lucide-react';
import { Button, Card, SectionHeader } from './UIElements';
import { BlogPost } from '../types';
import { resolveMediaUrl } from '../lib/api';

interface BlogsViewProps {
  blogs: BlogPost[];
}

export const BlogsView: React.FC<BlogsViewProps> = ({ blogs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingBlog, setReadingBlog] = useState<BlogPost | null>(null);

  const getAuthorName = (blog: BlogPost) => {
    const author = typeof blog.author === 'string' ? blog.author.trim() : '';
    return author || 'AI-Solutions Team';
  };

  const getAuthorShortName = (blog: BlogPost) => getAuthorName(blog).split(',')[0];

  const getAuthorInitials = (blog: BlogPost) =>
    getAuthorName(blog)
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('') || 'AI';

  const getExcerpt = (blog: BlogPost) =>
    (typeof blog.excerpt === 'string' && blog.excerpt.trim()) ||
    (typeof blog.content === 'string' && blog.content.trim().slice(0, 180)) ||
    'Explore this article from the AI-Solutions team.';

  const getReadTime = (blog: BlogPost) =>
    (typeof blog.readTime === 'string' && blog.readTime.trim()) || '5 min read';

  const getCategory = (blog: BlogPost) =>
    (typeof blog.category === 'string' && blog.category.trim()) || 'Insights';

  const getImage = (blog: BlogPost) =>
    resolveMediaUrl(
      (typeof blog.image === 'string' && blog.image.trim()) ||
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800'
    );

  const categories = ['All', 'Conversational AI', 'Industrial Tech', 'UI/UX Design'];

  const filteredBlogs = blogs.filter((blog) => {
    const title = typeof blog.title === 'string' ? blog.title.toLowerCase() : '';
    const excerpt = getExcerpt(blog).toLowerCase();
    const category = getCategory(blog);

    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      excerpt.includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 py-12">
      <SectionHeader
        title="Engineering Insights & Reports"
        subtitle="Stay updated with our technical team articles covering neural architecture optimization, edge-computing wafer inspection, and HCI patterns."
        badge="Enterprise Knowledge Center"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-4xl mx-auto items-center">
        <div className="md:col-span-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider uppercase cursor-pointer border transition-all ${
                selectedCategory === cat
                  ? 'bg-midnight-blue border-midnight-blue text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="md:col-span-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search publications..."
            className="block w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-ocean-blue focus:border-ocean-blue transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.map((blog) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              key={blog.id}
            >
              <Card
                onClick={() => setReadingBlog(blog)}
                className="overflow-hidden h-full flex flex-col justify-between group cursor-pointer border border-slate-100"
              >
                <div>
                  <div className="h-48 relative overflow-hidden bg-slate-100">
                    <img
                      src={getImage(blog)}
                      alt={blog.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded bg-slate-900/80 backdrop-blur-sm text-[9px] font-mono font-bold uppercase text-sky-blue tracking-wider border border-white/5">
                        {getCategory(blog)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-semibold font-mono text-slate-400 uppercase">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {getReadTime(blog)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-ocean-blue transition-colors leading-snug">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-normal line-clamp-3">
                      {getExcerpt(blog)}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-50 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1 truncate max-w-[150px]">
                    <User className="h-3 w-3 text-slate-350" />
                    {getAuthorShortName(blog)}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-ocean-blue font-bold tracking-tight hover:underline cursor-pointer bg-brand-50 hover:bg-brand-100 px-2.5 py-1 rounded-lg">
                    Read Article
                    <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {readingBlog && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setReadingBlog(null)}
                className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full border border-slate-100"
              >
                <div className="h-60 relative bg-slate-100">
                  <img
                    src={getImage(readingBlog)}
                    alt={readingBlog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/30 to-transparent" />

                  <button
                    onClick={() => setReadingBlog(null)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900/80 transition-colors border border-white/10 cursor-pointer"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="px-2.5 py-1 rounded bg-sky-blue text-slate-900 text-[10px] uppercase font-mono font-bold tracking-wider">
                      {getCategory(readingBlog)}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-3 leading-snug tracking-tight">
                      {readingBlog.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-slate-100 font-bold text-[#1B4F72] flex items-center justify-center font-mono text-sm border-2 border-brand-100">
                      {getAuthorInitials(readingBlog)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{getAuthorName(readingBlog)}</h4>
                      <p className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                        Published {readingBlog.date} • {getReadTime(readingBlog)}
                      </p>
                    </div>
                  </div>

                  <div className="prose prose-slate max-w-none text-slate-600 text-sm font-normal leading-relaxed whitespace-pre-line space-y-4 font-sans">
                    {readingBlog.content}
                  </div>
                </div>

                <div className="bg-slate-50 px-6 py-4 sm:px-8 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs text-slate-400 font-mono">AI-Solutions Insights</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReadingBlog(null)}
                  >
                    Close Article
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
