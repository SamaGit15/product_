/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BlogPost,
  DashboardStats,
  EventItem,
  GalleryItem,
  Inquiry,
  PortfolioProject,
  Service,
  SiteSettings,
  Testimonial
} from '../types';
import {
  INITIAL_BLOGS,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_INQUIRIES,
  INITIAL_PORTFOLIO,
  INITIAL_SERVICES,
  INITIAL_SITE_SETTINGS,
  INITIAL_TESTIMONIALS
} from '../data';

const configuredBase = (process.env.NEXT_PUBLIC_API_BASE_URL || '').trim();

const canUseStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const runtimeBases = () => {
  if (configuredBase) return [configuredBase.replace(/\/$/, '')];
  return ['/api'];
};

export const API_BASE = configuredBase ? configuredBase.replace(/\/$/, '') : '/api';
export const API_ROOT = API_BASE.replace(/\/api$/, '');

const storage = {
  services: 'ai_services',
  portfolio: 'ai_portfolio',
  testimonials: 'ai_testimonials',
  blogs: 'ai_blogs',
  events: 'ai_events',
  inquiries: 'ai_inquiries',
  gallery: 'ai_gallery',
  siteSettings: 'ai_site_settings'
};

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type ContentKind = 'services' | 'portfolio' | 'testimonials' | 'blogs' | 'events' | 'gallery';

interface ApiErrorPayload {
  message?: string;
}

interface RawInquiry {
  _id?: string;
  id?: string;
  referenceId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  jobTitle?: string;
  jobDetails?: string;
  interestedService?: string;
  status?: Inquiry['status'];
  adminNotes?: string;
  createdAt?: string;
}

const normalizeId = (value: { _id?: string; id?: string }) => value.id || value._id || '';

const normalizeInquiry = (inquiry: RawInquiry): Inquiry => ({
  id: normalizeId(inquiry),
  _id: inquiry._id,
  referenceId: inquiry.referenceId,
  name: inquiry.fullName || '',
  email: inquiry.email || '',
  phone: inquiry.phone || '',
  company: inquiry.company || '',
  service: inquiry.interestedService || '',
  country: inquiry.country || '',
  jobTitle: inquiry.jobTitle || '',
  message: inquiry.jobDetails || '',
  status: inquiry.status || 'New',
  adminNotes: inquiry.adminNotes || '',
  createdAt: inquiry.createdAt || new Date().toISOString()
});

const normalizeContentItem = <T extends { _id?: string; id?: string }>(item: T) => ({
  ...item,
  id: normalizeId(item),
  _id: item._id
});

const mergeInquiries = (primary: Inquiry[], secondary: Inquiry[]) => {
  const seen = new Set<string>();
  const merged: Inquiry[] = [];

  [...primary, ...secondary].forEach((inquiry) => {
    const key = inquiry._id || inquiry.id || inquiry.referenceId || '';
    if (!key || seen.has(key)) return;
    seen.add(key);
    merged.push(inquiry);
  });

  return merged;
};

const upsertInquiryFallback = (inquiry: Inquiry) => {
  const local = handleFallback<Inquiry[]>(storage.inquiries, INITIAL_INQUIRIES);
  const index = local.findIndex((entry) =>
    entry.id === inquiry.id ||
    entry._id === inquiry._id ||
    (!!entry.referenceId && entry.referenceId === inquiry.referenceId)
  );

  if (index > -1) local[index] = inquiry;
  else local.unshift(inquiry);

  saveToFallback(storage.inquiries, local);
};

const handleFallback = <T,>(key: string, initialData: T): T => {
  if (!canUseStorage()) {
    return initialData;
  }

  const existing = localStorage.getItem(key);
  if (!existing) {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }

  try {
    return JSON.parse(existing) as T;
  } catch {
    localStorage.setItem(key, JSON.stringify(initialData));
    return initialData;
  }
};

const saveToFallback = (key: string, data: unknown) => {
  if (!canUseStorage()) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(data));
};

const normalizeSiteSettings = (settings?: Partial<SiteSettings> | null): SiteSettings => ({
  ...INITIAL_SITE_SETTINGS,
  ...(settings || {})
});

const authHeaders = () => {
  if (!canUseStorage()) {
    return {};
  }

  const token = localStorage.getItem('admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const resolveMediaUrl = (value?: string | null) => {
  const source = String(value || '').trim();
  if (!source) return undefined;
  if (/^(https?:)?\/\//i.test(source) || source.startsWith('data:') || source.startsWith('blob:')) {
    return source;
  }

  return source.startsWith('/') ? source : `/${source}`;
};

const parseErrorMessage = async (response: Response) => {
  try {
    const payload = (await response.json()) as ApiErrorPayload;
    return payload.message || `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

const requestOneOf = async <T,>(paths: string[], init?: RequestInit): Promise<T> => {
  let lastError: Error | null = null;

  for (const path of paths) {
    try {
      return await request<T>(path, init);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Request failed');
    }
  }

  throw lastError || new Error('Unable to reach the backend API.');
};

const request = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  let lastError: Error | null = null;
  const isFormDataBody = typeof FormData !== 'undefined' && init?.body instanceof FormData;

  for (const base of runtimeBases()) {
    try {
      const response = await fetch(`${base}${path}`, {
        ...init,
        headers: {
          ...(init?.body && !isFormDataBody ? { 'Content-Type': 'application/json' } : {}),
          ...authHeaders(),
          ...init?.headers
        }
      });

      if (!response.ok) {
        throw new Error(await parseErrorMessage(response));
      }

      if (response.status === 204) return undefined as T;
      return (await response.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Request failed');
    }
  }

  throw lastError || new Error('Unable to reach the backend API.');
};

const getPublicCollection = async <T extends { _id?: string; id?: string }>(
  path: string,
  storageKey: string,
  fallback: T[]
): Promise<T[]> => {
  try {
    const data = ApiClient.isLoggedIn()
      ? await requestOneOf<T[]>([`/admin${path}`, path])
      : await request<T[]>(path);
    return data.map(normalizeContentItem);
  } catch {
    return handleFallback(storageKey, fallback);
  }
};

const saveAdminCollectionItem = async <T extends { id: string; _id?: string }>(
  kind: ContentKind,
  item: T,
  storageKey: string,
  fallback: T[]
): Promise<T> => {
  const id = item._id || item.id;
  const isNew = !id || item.id.includes('-new-');
  const path = `/admin/${kind}${isNew ? '' : `/${id}`}`;
  const method: Method = isNew ? 'POST' : 'PUT';

  try {
    const saved = await request<T>(path, {
      method,
      body: JSON.stringify(item)
    });
    return normalizeContentItem(saved) as T;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Save failed';
    if (localStorage.getItem('admin_token')) throw new Error(message);

    const local = handleFallback<T[]>(storageKey, fallback);
    const index = local.findIndex((entry) => entry.id === item.id);
    if (index > -1) local[index] = item;
    else local.unshift(item);
    saveToFallback(storageKey, local);
    return item;
  }
};

const deleteAdminCollectionItem = async <T extends { id: string; _id?: string }>(
  kind: ContentKind,
  id: string,
  storageKey: string,
  fallback: T[]
) => {
  try {
    await request<{ message: string }>(`/admin/${kind}/${id}`, { method: 'DELETE' });
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Delete failed';
    if (localStorage.getItem('admin_token')) throw new Error(message);

    const local = handleFallback<T[]>(storageKey, fallback);
    saveToFallback(storageKey, local.filter((entry) => entry.id !== id && entry._id !== id));
    return true;
  }
};

export const ApiClient = {
  initFallback() {
    handleFallback(storage.services, INITIAL_SERVICES);
    handleFallback(storage.portfolio, INITIAL_PORTFOLIO);
    handleFallback(storage.testimonials, INITIAL_TESTIMONIALS);
    handleFallback(storage.blogs, INITIAL_BLOGS);
    handleFallback(storage.events, INITIAL_EVENTS);
    handleFallback(storage.inquiries, INITIAL_INQUIRIES);
    handleFallback(storage.gallery, INITIAL_GALLERY);
    handleFallback(storage.siteSettings, INITIAL_SITE_SETTINGS);
  },

  async login(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const data = await request<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (canUseStorage()) {
        localStorage.setItem('admin_token', data.token);
      }
      return { success: true, token: data.token };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unable to sign in'
      };
    }
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const data = await request<{ message: string }>('/admin/password', {
        method: 'PATCH',
        body: JSON.stringify({ currentPassword, newPassword })
      });
      return { success: true, message: data.message || 'Password updated successfully.' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unable to update password.'
      };
    }
  },

  logout() {
    if (canUseStorage()) {
      localStorage.removeItem('admin_token');
    }
  },

  isLoggedIn() {
    return canUseStorage() ? !!localStorage.getItem('admin_token') : false;
  },

  async getInquiries(): Promise<Inquiry[]> {
    if (this.isLoggedIn()) {
      const data = await request<RawInquiry[]>('/admin/inquiries');
      const backendInquiries = data.map(normalizeInquiry);
      const localInquiries = handleFallback<Inquiry[]>(storage.inquiries, INITIAL_INQUIRIES);
      return mergeInquiries(localInquiries, backendInquiries);
    }

    return handleFallback(storage.inquiries, INITIAL_INQUIRIES);
  },

  async createInquiry(inquiry: Omit<Inquiry, 'id' | '_id' | 'referenceId' | 'createdAt' | 'status'>) {
    const payload = {
      fullName: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      company: inquiry.company,
      country: inquiry.country,
      jobTitle: inquiry.jobTitle || '',
      jobDetails: inquiry.message,
      interestedService: inquiry.service || ''
    };

    try {
      const result = await request<{ id: string; referenceId: string; message: string }>('/inquiries', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      return result;
    } catch {
      const localInquiry: Inquiry = {
        id: `inq-${Date.now()}`,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        company: inquiry.company,
        service: inquiry.service || '',
        country: inquiry.country,
        jobTitle: inquiry.jobTitle || '',
        message: inquiry.message,
        status: 'New',
        createdAt: new Date().toISOString()
      };
      const local = handleFallback<Inquiry[]>(storage.inquiries, INITIAL_INQUIRIES);
      saveToFallback(storage.inquiries, [localInquiry, ...local]);
      return { id: localInquiry.id, referenceId: localInquiry.id, message: 'Stored locally' };
    }
  },

  async updateInquiry(id: string, updates: Partial<Inquiry>): Promise<Inquiry> {
    if (!this.isLoggedIn()) {
      throw new Error('Please sign in to update inquiries.');
    }

    if (typeof updates.status === 'string') {
      try {
        const updated = await request<RawInquiry>(`/admin/inquiries/${id}/status`, {
          method: 'PATCH',
          body: JSON.stringify({ status: updates.status })
        });
        const normalized = normalizeInquiry(updated);
        upsertInquiryFallback(normalized);
        return normalized;
      } catch (error) {
        const local = handleFallback<Inquiry[]>(storage.inquiries, INITIAL_INQUIRIES);
        const index = local.findIndex((entry) => entry.id === id || entry._id === id);
        if (index > -1) {
          const updatedLocal = { ...local[index], status: updates.status };
          local[index] = updatedLocal;
          saveToFallback(storage.inquiries, local);
          return updatedLocal;
        }
        throw error;
      }
    }

    if (typeof updates.adminNotes === 'string') {
      try {
        const updated = await request<RawInquiry>(`/admin/inquiries/${id}/notes`, {
          method: 'PATCH',
          body: JSON.stringify({ adminNotes: updates.adminNotes })
        });
        const normalized = normalizeInquiry(updated);
        upsertInquiryFallback(normalized);
        return normalized;
      } catch (error) {
        const local = handleFallback<Inquiry[]>(storage.inquiries, INITIAL_INQUIRIES);
        const index = local.findIndex((entry) => entry.id === id || entry._id === id);
        if (index > -1) {
          const updatedLocal = { ...local[index], adminNotes: updates.adminNotes };
          local[index] = updatedLocal;
          saveToFallback(storage.inquiries, local);
          return updatedLocal;
        }
        throw error;
      }
    }

    throw new Error('Unsupported inquiry update.');
  },

  async deleteInquiry(id: string) {
    if (!this.isLoggedIn()) {
      throw new Error('Please sign in to delete inquiries.');
    }

    await request<{ message: string }>(`/admin/inquiries/${id}`, { method: 'DELETE' });
    return true;
  },

  async getServices() {
    return getPublicCollection<Service>('/services', storage.services, INITIAL_SERVICES);
  },

  async saveService(service: Service) {
    return saveAdminCollectionItem('services', service, storage.services, INITIAL_SERVICES);
  },

  async deleteService(id: string) {
    return deleteAdminCollectionItem('services', id, storage.services, INITIAL_SERVICES);
  },

  async getPortfolio() {
    return getPublicCollection<PortfolioProject>('/portfolio', storage.portfolio, INITIAL_PORTFOLIO);
  },

  async savePortfolio(project: PortfolioProject) {
    return saveAdminCollectionItem('portfolio', project, storage.portfolio, INITIAL_PORTFOLIO);
  },

  async deletePortfolio(id: string) {
    return deleteAdminCollectionItem('portfolio', id, storage.portfolio, INITIAL_PORTFOLIO);
  },

  async getTestimonials() {
    return getPublicCollection<Testimonial>('/testimonials', storage.testimonials, INITIAL_TESTIMONIALS);
  },

  async saveTestimonial(testimonial: Testimonial) {
    return saveAdminCollectionItem('testimonials', testimonial, storage.testimonials, INITIAL_TESTIMONIALS);
  },

  async deleteTestimonial(id: string) {
    return deleteAdminCollectionItem('testimonials', id, storage.testimonials, INITIAL_TESTIMONIALS);
  },

  async getBlogs() {
    return getPublicCollection<BlogPost>('/blogs', storage.blogs, INITIAL_BLOGS);
  },

  async saveBlog(blog: BlogPost) {
    return saveAdminCollectionItem('blogs', blog, storage.blogs, INITIAL_BLOGS);
  },

  async deleteBlog(id: string) {
    return deleteAdminCollectionItem('blogs', id, storage.blogs, INITIAL_BLOGS);
  },

  async getEvents() {
    return getPublicCollection<EventItem>('/events', storage.events, INITIAL_EVENTS);
  },

  async saveEvent(event: EventItem) {
    return saveAdminCollectionItem('events', event, storage.events, INITIAL_EVENTS);
  },

  async deleteEvent(id: string) {
    return deleteAdminCollectionItem('events', id, storage.events, INITIAL_EVENTS);
  },

  async getGallery() {
    return getPublicCollection<GalleryItem>('/gallery', storage.gallery, INITIAL_GALLERY);
  },

  async saveGalleryItem(item: GalleryItem) {
    return saveAdminCollectionItem('gallery', item, storage.gallery, INITIAL_GALLERY);
  },

  async deleteGalleryItem(id: string) {
    return deleteAdminCollectionItem('gallery', id, storage.gallery, INITIAL_GALLERY);
  },

  async getSiteSettings() {
    try {
      const settings = await requestOneOf<Partial<SiteSettings>>(
        ['/site-settings', '/settings/site']
      );
      return normalizeSiteSettings(settings);
    } catch {
      return handleFallback(storage.siteSettings, INITIAL_SITE_SETTINGS);
    }
  },

  async saveSiteSettings(settings: SiteSettings) {
    try {
      const saved = await requestOneOf<Partial<SiteSettings>>(['/admin/site-settings', '/admin/settings/site'], {
        method: 'PUT',
        body: JSON.stringify(settings)
      });
      return normalizeSiteSettings(saved);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Save failed';
      if (this.isLoggedIn()) throw new Error(message);
      saveToFallback(storage.siteSettings, settings);
      return settings;
    }
  },

  async uploadImage(file: File, folder = 'general') {
    if (!this.isLoggedIn()) {
      throw new Error('Please sign in to upload images.');
    }

    const formData = new FormData();
    formData.append('folder', folder);
    formData.append('image', file);

    return request<{ path: string; filename: string; originalName: string; message: string }>('/admin/uploads/image', {
      method: 'POST',
      body: formData
    });
  },

  async getDashboardStats(inquiries: Inquiry[]): Promise<DashboardStats> {
    if (this.isLoggedIn()) {
      return request<DashboardStats>('/admin/dashboard');
    }

    const totalInquiries = inquiries.length;
    const newInquiries = inquiries.filter((inquiry) => inquiry.status === 'New').length;
    const inProgressInquiries = inquiries.filter((inquiry) => inquiry.status === 'In Progress').length;
    const closedInquiries = inquiries.filter((inquiry) => inquiry.status === 'Closed').length;

    const countries: Record<string, number> = {};
    const services: Record<string, number> = {};

    inquiries.forEach((inquiry) => {
      countries[inquiry.country] = (countries[inquiry.country] || 0) + 1;
      if (inquiry.service) {
        services[inquiry.service] = (services[inquiry.service] || 0) + 1;
      }
    });

    return {
      totalInquiries,
      newInquiries,
      inProgressInquiries,
      closedInquiries,
      topCountry: Object.entries(countries).sort((a, b) => b[1] - a[1])[0]?.[0] || 'United Kingdom',
      mostRequestedService:
        Object.entries(services).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Not captured'
    };
  }
};

if (canUseStorage()) {
  ApiClient.initFallback();
}
