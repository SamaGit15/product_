/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Facebook, Linkedin, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { ApiClient } from './lib/api';
import { BlogPost, DashboardStats, EventItem, GalleryItem, Inquiry, PortfolioProject, Service, SiteSettings, Testimonial } from './types';
import { Navbar, DashboardLayout } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { ServicesView } from './components/ServicesView';
import { PortfolioView } from './components/PortfolioView';
import { TestimonialsView } from './components/TestimonialsView';
import { GalleryView } from './components/GalleryView';
import { BlogsView } from './components/BlogsView';
import { EventsView } from './components/EventsView';
import { ContactView } from './components/ContactView';
import { AIAssistant } from './components/AIAssistant';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { AdminInquiriesView } from './components/AdminInquiriesView';
import { AdminAnalyticsView } from './components/AdminAnalyticsView';
import { AdminContentView } from './components/AdminContentView';
import { AdminSettingsView } from './components/AdminSettingsView';
import { Button } from './components/UIElements';
import { resolveMediaUrl } from './lib/api';

const pageToPath = (page: string) => {
  switch (page) {
    case 'home':
      return '/';
    case 'about':
      return '/about';
    case 'services':
      return '/services';
    case 'portfolio':
      return '/portfolio';
    case 'testimonials':
      return '/testimonials';
    case 'gallery':
      return '/gallery';
    case 'blog':
      return '/articles';
    case 'events':
      return '/events';
    case 'contact':
      return '/contact';
    case 'admin-login':
      return '/admin';
    case 'admin-dashboard':
      return '/admin/dashboard';
    case 'admin-inquiries':
      return '/admin/inquiries';
    case 'admin-analytics':
      return '/admin/analytics';
    case 'admin-content':
      return '/admin/content';
    case 'admin-settings':
      return '/admin/settings';
    default:
      return '/';
  }
};

const pathToPage = (pathname: string, loggedIn: boolean) => {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  switch (normalized) {
    case '/':
    case '/home':
      return 'home';
    case '/about':
      return 'about';
    case '/services':
      return 'services';
    case '/portfolio':
      return 'portfolio';
    case '/testimonials':
      return 'testimonials';
    case '/gallery':
      return 'gallery';
    case '/blog':
    case '/articles':
      return 'blog';
    case '/events':
      return 'events';
    case '/contact':
      return 'contact';
    case '/admin':
    case '/admin/login':
      return 'admin-login';
    case '/admin/dashboard':
      return loggedIn ? 'admin-dashboard' : 'admin-login';
    case '/admin/inquiries':
      return loggedIn ? 'admin-inquiries' : 'admin-login';
    case '/admin/analytics':
      return loggedIn ? 'admin-analytics' : 'admin-login';
    case '/admin/content':
      return loggedIn ? 'admin-content' : 'admin-login';
    case '/admin/settings':
      return loggedIn ? 'admin-settings' : 'admin-login';
    default:
      return 'home';
  }
};

interface AppProps {
  initialPathname?: string;
}

export default function App({ initialPathname = '/' }: AppProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => pathToPage(initialPathname, false));
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    brandName: 'AI-Solutions',
    brandTagline: 'Applied Intelligence',
    logoInitials: 'AI',
    logoImage: '',
    primaryTimezone: 'UK Time',
    contactTimezone: 'Mon - Fri: 09:00 - 17:00 UK Time',
    footerDescription: 'AI-Solutions creates intelligent products, automation workflows, analytics experiences, and custom software designed to help organizations modernize with confidence.',
    contactHeading: 'AI-Solutions at the University of Sunderland',
    contactAddress: "David Goldman Informatics Centre, University of Sunderland, St Peter's Campus, Sunderland SR6 0DD, United Kingdom.",
    contactEmail: 'integrations@ai-solutions.co.uk',
    contactPhone: '+44 (0)191 515 2000',
    footerCopyright: '© 2026 AI-Solutions. Built as a polished AI SaaS demonstration experience.',
    footerCtaLabel: 'Start a conversation'
  });
  const [dbStats, setDbStats] = useState<DashboardStats>({
    totalInquiries: 0,
    newInquiries: 0,
    inProgressInquiries: 0,
    closedInquiries: 0,
    topCountry: 'United States',
    mostRequestedService: 'AI-Powered Virtual Assistant'
  });
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const goToPage = (page: string, options?: { replace?: boolean }) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const nextPath = pageToPath(page);
      const currentPath = window.location.pathname;
      if (nextPath !== currentPath) {
        const method = options?.replace ? 'replaceState' : 'pushState';
        window.history[method]({}, '', nextPath);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const syncRepository = async () => {
    setSyncing(true);
    try {
      const [srvs, ports, tests, blgs, evs, gallery, settings] = await Promise.all([
        ApiClient.getServices(),
        ApiClient.getPortfolio(),
        ApiClient.getTestimonials(),
        ApiClient.getBlogs(),
        ApiClient.getEvents(),
        ApiClient.getGallery(),
        ApiClient.getSiteSettings()
      ]);
      setServices(srvs);
      setPortfolio(ports);
      setTestimonials(tests);
      setBlogs(blgs);
      setEvents(evs);
      setGalleryItems(gallery);
      setSiteSettings((current) => ({ ...current, ...settings }));
    } catch (error) {
      console.error('Public content synchronization aborted due to network conditions.', error);
    }

    try {
      const inqs = await ApiClient.getInquiries();
      setInquiries(inqs);
      setDbStats(await ApiClient.getDashboardStats(inqs));
    } catch (error) {
      console.error('Admin synchronization skipped because authentication is unavailable.', error);
      setInquiries([]);
      setDbStats({
        totalInquiries: 0,
        newInquiries: 0,
        inProgressInquiries: 0,
        closedInquiries: 0,
        topCountry: 'United States',
        mostRequestedService: 'AI-Powered Virtual Assistant'
      });
      if (ApiClient.isLoggedIn()) {
        ApiClient.logout();
        setIsLoggedIn(false);
        if (currentPage.startsWith('admin-')) {
          goToPage('admin-login', { replace: true });
        }
      }
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  useEffect(() => {
    const loggedIn = ApiClient.isLoggedIn();
    setIsLoggedIn(loggedIn);
    setCurrentPage(pathToPage(window.location.pathname, loggedIn));
    syncRepository();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(pathToPage(window.location.pathname, ApiClient.isLoggedIn()));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoginSuccess = (_token: string) => {
    setIsLoggedIn(true);
    goToPage('admin-dashboard', { replace: true });
    syncRepository();
  };

  const handleLogout = () => {
    ApiClient.logout();
    setIsLoggedIn(false);
    goToPage('home', { replace: true });
  };

  const handleUpdateInquiry = async (id: string, updates: Partial<Inquiry>) => {
    const updatedInquiry = await ApiClient.updateInquiry(id, updates);
    setInquiries((current) => {
      const next = current.map((inquiry) =>
        (inquiry.id === id || inquiry._id === id) ? { ...inquiry, ...updatedInquiry } : inquiry
      );
      void ApiClient.getDashboardStats(next).then(setDbStats);
      return next;
    });
  };
  const handleDeleteInquiry = async (id: string) => {
    await ApiClient.deleteInquiry(id);
    await syncRepository();
  };
  const handleSaveBlog = async (blog: BlogPost) => {
    await ApiClient.saveBlog(blog);
    await syncRepository();
  };
  const handleDeleteBlog = async (id: string) => {
    await ApiClient.deleteBlog(id);
    await syncRepository();
  };
  const handleSaveEvent = async (event: EventItem) => {
    await ApiClient.saveEvent(event);
    await syncRepository();
  };
  const handleDeleteEvent = async (id: string) => {
    await ApiClient.deleteEvent(id);
    await syncRepository();
  };
  const handleSaveGalleryItem = async (item: GalleryItem) => {
    await ApiClient.saveGalleryItem(item);
    await syncRepository();
  };
  const handleDeleteGalleryItem = async (id: string) => {
    await ApiClient.deleteGalleryItem(id);
    await syncRepository();
  };
  const handleSaveService = async (service: Service) => {
    await ApiClient.saveService(service);
    await syncRepository();
  };
  const handleDeleteService = async (id: string) => {
    await ApiClient.deleteService(id);
    await syncRepository();
  };
  const handleSavePortfolio = async (project: PortfolioProject) => {
    await ApiClient.savePortfolio(project);
    await syncRepository();
  };
  const handleDeletePortfolio = async (id: string) => {
    await ApiClient.deletePortfolio(id);
    await syncRepository();
  };
  const handleSaveTestimonial = async (testimonial: Testimonial) => {
    await ApiClient.saveTestimonial(testimonial);
    await syncRepository();
  };
  const handleDeleteTestimonial = async (id: string) => {
    await ApiClient.deleteTestimonial(id);
    await syncRepository();
  };
  const handleSaveSiteSettings = async (settings: SiteSettings) => {
    const saved = await ApiClient.saveSiteSettings(settings);
    setSiteSettings((current) => ({ ...current, ...saved }));
  };
  const handleChangePassword = async (currentPassword: string, newPassword: string) =>
    ApiClient.changePassword(currentPassword, newPassword);

  const isAdminPage = currentPage.startsWith('admin-') && currentPage !== 'admin-login';

  useEffect(() => {
    if (isAdminPage && !isLoggedIn) {
      goToPage('admin-login', { replace: true });
    }
  }, [currentPage, isLoggedIn, isAdminPage]);

  const activePageRenderer = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView services={services} portfolio={portfolio} testimonials={testimonials} blogs={blogs} events={events} loading={loading} onNavigate={goToPage} />;
      case 'about':
        return <AboutView />;
      case 'services':
        return <ServicesView services={services} />;
      case 'portfolio':
        return <PortfolioView portfolio={portfolio} />;
      case 'testimonials':
        return <TestimonialsView testimonials={testimonials} />;
      case 'gallery':
        return <GalleryView galleryItems={galleryItems} />;
      case 'blog':
        return <BlogsView blogs={blogs} />;
      case 'events':
        return <EventsView events={events} />;
      case 'contact':
        return (
          <ContactView
            contactTimezone={siteSettings.contactTimezone}
            brandName={siteSettings.brandName}
            contactHeading={siteSettings.contactHeading}
            contactAddress={siteSettings.contactAddress}
            contactEmail={siteSettings.contactEmail}
            contactPhone={siteSettings.contactPhone}
            onInquirySubmitted={syncRepository}
          />
        );
      case 'admin-login':
        return <AdminLoginView onLoginSuccess={handleLoginSuccess} onNavigateHome={() => goToPage('home')} />;
      case 'admin-dashboard':
        return <AdminDashboardView inquiries={inquiries} stats={dbStats} onPageChange={goToPage} onRefresh={syncRepository} isRefreshing={syncing} />;
      case 'admin-inquiries':
        return <AdminInquiriesView inquiries={inquiries} onUpdateInquiry={handleUpdateInquiry} onDeleteInquiry={handleDeleteInquiry} loading={loading} />;
      case 'admin-analytics':
        return <AdminAnalyticsView inquiries={inquiries} />;
      case 'admin-content':
        return <AdminContentView blogs={blogs} events={events} services={services} portfolio={portfolio} testimonials={testimonials} galleryItems={galleryItems} onSaveBlog={handleSaveBlog} onDeleteBlog={handleDeleteBlog} onSaveEvent={handleSaveEvent} onDeleteEvent={handleDeleteEvent} onSaveService={handleSaveService} onDeleteService={handleDeleteService} onSavePortfolio={handleSavePortfolio} onDeletePortfolio={handleDeletePortfolio} onSaveTestimonial={handleSaveTestimonial} onDeleteTestimonial={handleDeleteTestimonial} onSaveGalleryItem={handleSaveGalleryItem} onDeleteGalleryItem={handleDeleteGalleryItem} />;
      case 'admin-settings':
        return <AdminSettingsView siteSettings={siteSettings} onSaveSiteSettings={handleSaveSiteSettings} onChangePassword={handleChangePassword} />;
      default:
        return <AboutView />;
    }
  };

  const guestContent = (
    <AnimatePresence mode="wait">
      <motion.div key={currentPage} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease: 'easeInOut' }}>
        {activePageRenderer()}
      </motion.div>
    </AnimatePresence>
  );

  const footerLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Services', page: 'services' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Events', page: 'events' },
    { label: 'Articles', page: 'blog' },
    { label: 'Contact', page: 'contact' }
  ];

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-slate-50 font-sans text-slate-800 antialiased selection:bg-brand-100 selection:text-brand-900">
      {isAdminPage ? (
        <DashboardLayout
          currentPage={currentPage}
          onPageChange={goToPage}
          onLogout={handleLogout}
          brandName={siteSettings.brandName}
          brandTagline={siteSettings.brandTagline}
          logoInitials={siteSettings.logoInitials}
          logoImage={siteSettings.logoImage}
        >
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }}>
              {activePageRenderer()}
            </motion.div>
          </AnimatePresence>
        </DashboardLayout>
      ) : (
        <>
          <Navbar
            currentPage={currentPage}
            onPageChange={goToPage}
            brandName={siteSettings.brandName}
            brandTagline={siteSettings.brandTagline}
            logoInitials={siteSettings.logoInitials}
            logoImage={siteSettings.logoImage}
          />
          <main className="flex-grow pt-6"> 
            {currentPage === 'home' ? guestContent : <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{guestContent}</div>}
          </main>
          <AIAssistant
            currentPage={currentPage}
            onNavigate={goToPage}
          />

          <footer className="border-t border-slate-200 bg-[#0f2443] text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/10">
                    {siteSettings.logoImage ? (
                      <img
                        src={resolveMediaUrl(siteSettings.logoImage)}
                        alt={`${siteSettings.brandName} logo`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-sky-blue">{siteSettings.logoInitials}</span>
                    )}
                  </div>
                  <div><p className="text-xl font-semibold">{siteSettings.brandName}</p><p className="text-xs uppercase tracking-[0.22em] text-brand-200">{siteSettings.brandTagline}</p></div>
                </div>
                <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{siteSettings.footerDescription}</p>
                <div className="mt-6 flex items-center gap-3">
                  {[
                    { Icon: Facebook, href: 'https://www.facebook.com/sunderlanduniversity', label: 'Facebook' },
                    { Icon: Linkedin, href: 'https://uk.linkedin.com/school/university-of-sunderland/?original_referer=https%3A%2F%2Fwww.google.com%2F', label: 'LinkedIn' },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-white/20 hover:bg-white/10"
                      aria-label={label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-200">Quick Links</p>
                <div className="mt-5 space-y-3 text-sm text-slate-300">
                  {footerLinks.map((link) => <button key={link.page} onClick={() => goToPage(link.page)} className="block transition hover:text-white">{link.label}</button>)}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-200">Contact Information</p>
                <div className="mt-5 space-y-4 text-sm text-slate-300">
                  <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-sky-blue" /><span>{siteSettings.contactAddress}</span></div>
                  <div className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-sky-blue" /><span>{siteSettings.contactEmail}</span></div>
                  <div className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-sky-blue" /><span>{siteSettings.contactPhone} | {siteSettings.primaryTimezone}</span></div>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10">
              <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <p>{siteSettings.footerCopyright}</p>
                <Button variant="ghost" size="sm" onClick={() => goToPage('contact')} className="justify-start px-0 text-slate-300 hover:bg-transparent hover:text-white">{siteSettings.footerCtaLabel}</Button>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}
