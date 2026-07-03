/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type InquiryStatus = 'New' | 'In Progress' | 'Closed';

export interface Inquiry {
  id: string;
  _id?: string; // MongoDB compatibility
  referenceId?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  country: string;
  jobTitle?: string;
  message: string;
  status: InquiryStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  _id?: string;
  title: string;
  description: string;
  image?: string;
  icon: string; // Lucide icon name
  features: string[];
  pricing: string;
  category: string;
}

export interface PortfolioProject {
  id: string;
  _id?: string;
  title: string;
  description: string;
  image: string; // URL or placeholder prompt
  tags: string[];
  features: string[];
  rating: number;
  client: string;
  year: string;
}

export interface Testimonial {
  id: string;
  _id?: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: string;
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
}

export interface EventItem {
  id: string;
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'In-Person' | 'Virtual' | 'Hybrid';
  image: string;
}

export interface GalleryItem {
  id: string;
  _id?: string;
  title: string;
  category: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

export interface SiteSettings {
  brandName: string;
  brandTagline: string;
  logoInitials: string;
  logoImage: string;
  footerDescription: string;
  contactHeading: string;
  contactAddress: string;
  contactEmail: string;
  contactPhone: string;
  primaryTimezone: string;
  contactTimezone: string;
  footerCopyright: string;
  footerCtaLabel: string;
}

export interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  inProgressInquiries: number;
  closedInquiries: number;
  topCountry: string;
  mostRequestedService: string;
}
