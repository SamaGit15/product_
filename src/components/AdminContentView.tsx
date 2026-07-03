/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Cpu, Image, Layers, PlusSquare, Quote, Save, X } from 'lucide-react';
import { BlogPost, EventItem, GalleryItem, PortfolioProject, Service, Testimonial } from '../types';
import { Button, Card, ConfirmModal, EmptyState, FormInput } from './UIElements';
import { ApiClient, resolveMediaUrl } from '../lib/api';

interface AdminContentViewProps {
  blogs: BlogPost[];
  events: EventItem[];
  services: Service[];
  portfolio: PortfolioProject[];
  testimonials: Testimonial[];
  galleryItems: GalleryItem[];
  onSaveBlog: (blog: BlogPost) => Promise<void>;
  onDeleteBlog: (id: string) => Promise<void>;
  onSaveEvent: (event: EventItem) => Promise<void>;
  onDeleteEvent: (id: string) => Promise<void>;
  onSaveService: (service: Service) => Promise<void>;
  onDeleteService: (id: string) => Promise<void>;
  onSavePortfolio: (project: PortfolioProject) => Promise<void>;
  onDeletePortfolio: (id: string) => Promise<void>;
  onSaveTestimonial: (test: Testimonial) => Promise<void>;
  onDeleteTestimonial: (id: string) => Promise<void>;
  onSaveGalleryItem: (item: GalleryItem) => Promise<void>;
  onDeleteGalleryItem: (id: string) => Promise<void>;
}

type ContentTab = 'blogs' | 'events' | 'services' | 'portfolio' | 'testimonials' | 'gallery';

export const AdminContentView: React.FC<AdminContentViewProps> = ({
  blogs,
  events,
  services,
  portfolio,
  testimonials,
  galleryItems,
  onSaveBlog,
  onDeleteBlog,
  onSaveEvent,
  onDeleteEvent,
  onSaveService,
  onDeleteService,
  onSavePortfolio,
  onDeletePortfolio,
  onSaveTestimonial,
  onDeleteTestimonial,
  onSaveGalleryItem,
  onDeleteGalleryItem
}) => {
  const [activeTab, setActiveTab] = useState<ContentTab>('blogs');
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingItemType, setEditingItemType] = useState<ContentTab>('blogs');
  const [editingItemData, setEditingItemData] = useState<any | null>(null);
  const [editorNotice, setEditorNotice] = useState('');
  const [deleteConf, setDeleteConf] = useState<{ id: string; type: ContentTab } | null>(null);

  const tabs = [
    { id: 'blogs', label: 'Blogs', icon: BookOpen, count: blogs.length },
    { id: 'events', label: 'Events', icon: Calendar, count: events.length },
    { id: 'services', label: 'Services', icon: Cpu, count: services.length },
    { id: 'portfolio', label: 'Portfolio', icon: Layers, count: portfolio.length },
    { id: 'testimonials', label: 'Testimonials', icon: Quote, count: testimonials.length },
    { id: 'gallery', label: 'Photos', icon: Image, count: galleryItems.length }
  ] as const;

  const getEmptyItemTemplate = (type: ContentTab) => {
    const suffix = Math.random().toString(36).slice(2, 9);
    switch (type) {
      case 'blogs':
        return {
          id: `b-new-${suffix}`,
          title: '',
          excerpt: '',
          content: '',
          category: 'Conversational AI',
          readTime: '5 min read',
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
          author: 'AI-Solutions Team',
          image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800'
        };
      case 'events':
        return {
          id: `e-new-${suffix}`,
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          type: 'Virtual',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'
        };
      case 'services':
        return {
          id: `s-new-${suffix}`,
          title: '',
          description: '',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
          icon: 'Cpu',
          features: ['Feature one', 'Feature two'],
          pricing: 'Custom pricing',
          category: 'AI Solutions'
        };
      case 'portfolio':
        return {
          id: `p-new-${suffix}`,
          title: '',
          description: '',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
          tags: ['AI'],
          features: ['Key benefit'],
          rating: 4.8,
          client: '',
          year: '2026'
        };
      case 'testimonials':
        return {
          id: `t-new-${suffix}`,
          name: '',
          role: '',
          company: '',
          content: '',
          rating: 5,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
        };
      case 'gallery':
        return {
          id: `gal-new-${suffix}`,
          title: '',
          category: 'Infrastructure',
          description: '',
          date: '',
          location: '',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800'
        };
    }
  };

  const handleOpenEditor = (type: ContentTab, item: any | null = null) => {
    setEditingItemType(type);
    setEditingItemData(item ? { ...item } : getEmptyItemTemplate(type));
    setEditorNotice('');
    setEditorOpen(true);
  };

  const handleSaveEditor = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingItemData) return;
    setSaving(true);
    try {
      if (editingItemType === 'blogs') await onSaveBlog(editingItemData);
      if (editingItemType === 'events') await onSaveEvent(editingItemData);
      if (editingItemType === 'services') await onSaveService(editingItemData);
      if (editingItemType === 'portfolio') await onSavePortfolio(editingItemData);
      if (editingItemType === 'testimonials') await onSaveTestimonial(editingItemData);
      if (editingItemType === 'gallery') await onSaveGalleryItem(editingItemData);
      setEditorNotice('');
      setEditorOpen(false);
      setEditingItemData(null);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConf) return;
    if (deleteConf.type === 'blogs') await onDeleteBlog(deleteConf.id);
    if (deleteConf.type === 'events') await onDeleteEvent(deleteConf.id);
    if (deleteConf.type === 'services') await onDeleteService(deleteConf.id);
    if (deleteConf.type === 'portfolio') await onDeletePortfolio(deleteConf.id);
    if (deleteConf.type === 'testimonials') await onDeleteTestimonial(deleteConf.id);
    if (deleteConf.type === 'gallery') await onDeleteGalleryItem(deleteConf.id);
    setDeleteConf(null);
  };

  const activeItems =
    activeTab === 'blogs'
      ? blogs
      : activeTab === 'events'
        ? events
        : activeTab === 'services'
          ? services
          : activeTab === 'portfolio'
            ? portfolio
            : activeTab === 'testimonials'
              ? testimonials
              : galleryItems;

  const renderCard = (item: any, type: ContentTab) => {
    const title =
      type === 'testimonials'
        ? item.name
        : item.title;
    const meta =
      type === 'blogs'
        ? item.category
        : type === 'events'
          ? `${item.date} | ${item.location}`
          : type === 'services'
            ? item.pricing
            : type === 'portfolio'
              ? `${item.client} | ${item.year}`
              : type === 'testimonials'
                ? `${item.role} | ${item.company}`
                : `${item.category} | ${item.location}`;
    const description =
      type === 'blogs'
        ? item.excerpt
        : type === 'testimonials'
          ? item.content
          : item.description;
    const image =
      type === 'testimonials'
          ? item.avatar
          : item.image;

    return (
      <Card key={item.id} hover={false} className="flex flex-col justify-between border border-slate-100 p-5">
        <div className="space-y-3">
          {image ? (
            <div className="h-36 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <img src={resolveMediaUrl(image)} alt={title} referrerPolicy="no-referrer" className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-ocean-blue">
              <Cpu className="h-6 w-6" />
            </div>
          )}
          <h4 className="text-sm font-extrabold tracking-tight text-slate-800">{title}</h4>
          <p className="text-[11px] font-mono text-slate-400">{meta}</p>
          <p className="line-clamp-3 text-[11px] leading-relaxed text-slate-500">{description}</p>
        </div>
        <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            onClick={() => handleOpenEditor(type, item)}
            className="rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ocean-blue transition hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            onClick={() => setDeleteConf({ id: item._id || item.id, type })}
            className="rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-600 transition hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      </Card>
    );
  };

  const updateField = (field: string, value: any) =>
    setEditingItemData((current: any) => ({ ...current, [field]: value }));

  const getImageField = (type: ContentTab) => (type === 'testimonials' ? 'avatar' : 'image');

  const getUploadFolder = (type: ContentTab) => {
    switch (type) {
      case 'blogs':
        return 'blogs';
      case 'events':
        return 'events';
      case 'services':
        return 'services';
      case 'portfolio':
        return 'portfolio';
      case 'testimonials':
        return 'testimonials';
      case 'gallery':
        return 'gallery';
    }
  };

  const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploaded = await ApiClient.uploadImage(file, getUploadFolder(editingItemType));
      updateField(getImageField(editingItemType), uploaded.path);
      setEditorNotice(`Image uploaded successfully: ${file.name}`);
    } catch (error) {
      setEditorNotice(error instanceof Error ? error.message : 'Image upload failed.');
    } finally {
      setUploadingImage(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Content Modifiers</span>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-800">Content Management System</h2>
        </div>
        <Button variant="primary" size="sm" icon="PlusSquare" onClick={() => handleOpenEditor(activeTab)}>
          Add Item
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === tab.id
                ? 'border-midnight-blue bg-midnight-blue text-white'
                : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            <span className={`rounded px-1.5 py-0.5 text-[10px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {!activeItems.length ? (
        <EmptyState
          title="No content items yet"
          description="Create the first item for this section using the Add Item button."
          icon="FolderOpen"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeItems.map((item: any) => renderCard(item, activeTab))}
        </div>
      )}

      <AnimatePresence>
        {editorOpen && editingItemData && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 py-10">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditorOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-2xl"
              >
                <form onSubmit={handleSaveEditor}>
                  <div className="bg-slate-900 p-6 text-white">
                    <button type="button" onClick={() => setEditorOpen(false)} className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10">
                      <X className="h-4 w-4" />
                    </button>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-sky-blue">CMS Editor</p>
                    <h3 className="mt-2 text-xl font-bold tracking-tight">
                      {editingItemData.title || editingItemData.name || 'Create content item'}
                    </h3>
                  </div>

                  <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
                    {(editingItemType === 'blogs' || editingItemType === 'events' || editingItemType === 'services' || editingItemType === 'portfolio' || editingItemType === 'gallery') && (
                      <FormInput
                        label="Title"
                        value={editingItemData.title}
                        onChange={(event) => updateField('title', event.target.value)}
                        required
                      />
                    )}

                    {editingItemType === 'testimonials' && (
                      <FormInput
                        label="Customer Name"
                        value={editingItemData.name}
                        onChange={(event) => updateField('name', event.target.value)}
                        required
                      />
                    )}

                    {(editingItemType === 'blogs' || editingItemType === 'events' || editingItemType === 'services' || editingItemType === 'portfolio' || editingItemType === 'gallery' || editingItemType === 'testimonials') && (
                      <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700">
                              {editingItemType === 'testimonials' ? 'Profile Image' : 'Content Image'}
                            </label>
                            <p className="mt-1 text-xs leading-5 text-slate-400">
                              Upload the image to Cloudinary. Its saved URL will be stored in MongoDB automatically.
                            </p>
                          </div>
                          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            {editingItemData[getImageField(editingItemType)] ? (
                              <img
                                src={resolveMediaUrl(editingItemData[getImageField(editingItemType)])}
                                alt="Preview"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Image className="h-6 w-6 text-slate-300" />
                            )}
                          </div>
                        </div>

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/svg+xml"
                          onChange={handleImageSelection}
                          className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-ocean-blue"
                        />

                        {editingItemData[getImageField(editingItemType)] && (
                          <p className="break-all text-[11px] text-slate-500">
                            Saved path: {editingItemData[getImageField(editingItemType)]}
                          </p>
                        )}
                      </div>
                    )}

                    {editingItemType === 'blogs' && (
                      <>
                        <FormInput label="Excerpt" value={editingItemData.excerpt} onChange={(event) => updateField('excerpt', event.target.value)} required />
                        <FormInput label="Category" value={editingItemData.category} onChange={(event) => updateField('category', event.target.value)} />
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput label="Read Time" value={editingItemData.readTime} onChange={(event) => updateField('readTime', event.target.value)} />
                          <FormInput label="Author" value={editingItemData.author} onChange={(event) => updateField('author', event.target.value)} />
                        </div>
                        <FormInput label="Date" value={editingItemData.date} onChange={(event) => updateField('date', event.target.value)} />
                      </>
                    )}

                    {editingItemType === 'events' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput label="Date" value={editingItemData.date} onChange={(event) => updateField('date', event.target.value)} />
                          <FormInput label="Time" value={editingItemData.time} onChange={(event) => updateField('time', event.target.value)} />
                        </div>
                        <FormInput label="Location" value={editingItemData.location} onChange={(event) => updateField('location', event.target.value)} />
                        <FormInput label="Type" value={editingItemData.type} onChange={(event) => updateField('type', event.target.value)} />
                      </>
                    )}

                    {editingItemType === 'services' && (
                      <>
                        <FormInput label="Category" value={editingItemData.category} onChange={(event) => updateField('category', event.target.value)} />
                        <FormInput label="Pricing" value={editingItemData.pricing} onChange={(event) => updateField('pricing', event.target.value)} />
                        <FormInput label="Icon Name" value={editingItemData.icon} onChange={(event) => updateField('icon', event.target.value)} />
                      </>
                    )}

                    {editingItemType === 'portfolio' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput label="Client" value={editingItemData.client} onChange={(event) => updateField('client', event.target.value)} />
                          <FormInput label="Year" value={editingItemData.year} onChange={(event) => updateField('year', event.target.value)} />
                        </div>
                        <FormInput label="Rating" type="number" step="0.1" value={editingItemData.rating} onChange={(event) => updateField('rating', Number(event.target.value) || 0)} />
                        <FormInput label="Tags (comma separated)" value={editingItemData.tags.join(', ')} onChange={(event) => updateField('tags', event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean))} />
                        <FormInput label="Benefits (comma separated)" value={editingItemData.features.join(', ')} onChange={(event) => updateField('features', event.target.value.split(',').map((feature) => feature.trim()).filter(Boolean))} />
                      </>
                    )}

                    {editingItemType === 'testimonials' && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput label="Role" value={editingItemData.role} onChange={(event) => updateField('role', event.target.value)} />
                          <FormInput label="Company" value={editingItemData.company} onChange={(event) => updateField('company', event.target.value)} />
                        </div>
                        <FormInput
                          label="Rating"
                          type="number"
                          min="0"
                          max="5"
                          step="0.1"
                          value={editingItemData.rating}
                          onChange={(event) => updateField('rating', Number(event.target.value) || 0)}
                        />
                      </>
                    )}

                    {editingItemType === 'gallery' && (
                      <>
                        <FormInput label="Category" value={editingItemData.category} onChange={(event) => updateField('category', event.target.value)} />
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput label="Date" value={editingItemData.date} onChange={(event) => updateField('date', event.target.value)} />
                          <FormInput label="Location" value={editingItemData.location} onChange={(event) => updateField('location', event.target.value)} />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        {editingItemType === 'blogs'
                          ? 'Content'
                          : editingItemType === 'testimonials'
                            ? 'Testimonial'
                            : 'Description'}
                      </label>
                      <textarea
                        rows={5}
                        value={
                          editingItemType === 'blogs'
                            ? editingItemData.content
                            : editingItemType === 'testimonials'
                              ? editingItemData.content
                              : editingItemData.description
                        }
                        onChange={(event) =>
                          updateField(
                            editingItemType === 'blogs' || editingItemType === 'testimonials' ? 'content' : 'description',
                            event.target.value
                          )
                        }
                        className="block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-ocean-blue focus:ring-1 focus:ring-ocean-blue"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
                    <span className="text-[10px] font-mono text-slate-400">{editorNotice || 'Changes save through the Next.js API when available and fall back locally if needed.'}</span>
                    <div className="flex items-center gap-2">
                      <Button type="submit" variant="primary" isLoading={saving || uploadingImage} icon="Save">
                        Save
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setEditorOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmModal
        isOpen={deleteConf !== null}
        onClose={() => setDeleteConf(null)}
        onConfirm={handleDelete}
        title="Delete content item"
        message="This item will be removed from the active list and local fallback cache if the API is unavailable."
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </div>
  );
};
