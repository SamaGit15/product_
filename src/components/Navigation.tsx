/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Sparkles, LayoutDashboard, Inbox, LineChart, 
  Settings, LogOut, ChevronRight, User, Globe, ArrowUpRight
} from 'lucide-react';
import { Button, DynamicIcon } from './UIElements';
import { ApiClient, resolveMediaUrl } from '../lib/api';

// --- NAVBAR FOR PUBLIC PAGES ---
interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  brandName?: string;
  brandTagline?: string;
  logoInitials?: string;
  logoImage?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  brandName = 'AI-Solutions',
  brandTagline = 'Applied Intelligence',
  logoInitials = 'AI',
  logoImage = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll spy for glass transience
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Events', id: 'events' },
    { label: 'Articles', id: 'blog' },
  ];

  const handleLinkClick = (id: string) => {
    onPageChange(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLoggedIn = ApiClient.isLoggedIn();

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => handleLinkClick('home')}
              className="flex items-center gap-2.5 cursor-pointer origin-left hover:scale-[1.02] transition-transform"
            >
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-tr from-midnight-blue via-ocean-blue to-sky-blue shadow-md shadow-brand-500/10">
                {logoImage ? (
                  <img
                    src={resolveMediaUrl(logoImage)}
                    alt={`${brandName} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-white">{logoInitials}</span>
                )}
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-midnight-blue via-ocean-blue to-brand-600 bg-clip-text text-transparent tracking-tight">
                  {brandName}
                </span>
                <span className="block text-[9px] text-slate-400 font-mono tracking-widest mt-0.5 font-bold">
                  {brandTagline}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive ? 'text-ocean-blue bg-brand-50/50' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-ocean-blue rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {isLoggedIn && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  icon="LayoutDashboard"
                  onClick={() => handleLinkClick('admin-dashboard')}
                >
                  Dashboard
                </Button>
              )}
              <Button 
                variant="primary" 
                size="sm" 
                icon="ArrowUpRight"
                onClick={() => handleLinkClick('contact')}
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900 z-45 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-white z-46 p-6 shadow-2xl flex flex-col justify-between lg:hidden border-l border-slate-100"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-ocean-blue" />
                    <span className="text-lg font-bold text-slate-800">Menu</span>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>

                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const isActive = currentPage === link.id;
                    return (
                      <button
                        key={link.id}
                        onClick={() => handleLinkClick(link.id)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium transition-all ${
                          isActive 
                            ? 'bg-brand-50 text-ocean-blue font-semibold' 
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                      >
                        {link.label}
                        <ChevronRight className={`h-4 w-4 opacity-50 ${isActive ? 'text-ocean-blue' : 'text-slate-300'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                {isLoggedIn && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-center" 
                    icon="LayoutDashboard"
                    onClick={() => handleLinkClick('admin-dashboard')}
                  >
                    Dashboard
                  </Button>
                )}
                <Button 
                  variant="primary" 
                  className="w-full justify-center" 
                  icon="ArrowUpRight"
                  onClick={() => handleLinkClick('contact')}
                >
                  Schedule Consultation
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};


// --- DASHBOARD LAYOUT & SIDEBAR FOR ADMIN AREA ---
interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  brandName?: string;
  brandTagline?: string;
  logoInitials?: string;
  logoImage?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  currentPage,
  onPageChange,
  onLogout,
  brandName = 'AI-Solutions',
  brandTagline = 'Applied Intelligence',
  logoInitials = 'AI',
  logoImage = ''
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const adminMenu = [
    { label: 'KPI Dashboard', id: 'admin-dashboard', icon: 'LayoutDashboard' },
    { label: 'Inquiry Box', id: 'admin-inquiries', icon: 'Inbox' },
    { label: 'Telemetry Graphs', id: 'admin-analytics', icon: 'LineChart' },
    { label: 'Content Manager', id: 'admin-content', icon: 'Settings' },
    { label: 'Platform Settings', id: 'admin-settings', icon: 'ShieldCheck' },
  ];

  const handlePageSelect = (id: string) => {
    onPageChange(id);
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-midnight-blue text-white shadow-md z-30">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white/10">
            {logoImage ? (
              <img
                src={resolveMediaUrl(logoImage)}
                alt={`${brandName} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <Sparkles className="h-4.5 w-4.5 text-sky-blue" />
            )}
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight">{brandName}</span>
            <span className="block text-[8px] text-sky-blue/80 font-mono uppercase tracking-widest">
              {brandTagline || 'ADMIN WORKSPACE'}
            </span>
          </div>
        </div>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
        >
          {mobileOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
        </button>
      </div>

      {/* Admin Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-midnight-blue text-slate-300 border-r border-slate-850 shrink-0 select-none">
        {/* Brand Banner */}
        <div className="p-6 border-b border-brand-900 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 shadow-inner">
            {logoImage ? (
              <img
                src={resolveMediaUrl(logoImage)}
                alt={`${brandName} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold text-sky-blue">{logoInitials}</span>
            )}
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight block">{brandName}</span>
            <span className="text-[10px] text-brand-300 font-mono tracking-widest uppercase font-bold">
              {brandTagline || 'Admin workspace'}
            </span>
          </div>
        </div>

        {/* User context */}
        <div className="p-4 mx-4 my-3 bg-brand-950/40 rounded-xl border border-brand-900/40 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-brand-800 text-sky-blue">
            <User className="h-4 w-4" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs text-brand-300 font-medium">Active Evaluator</p>
            <p className="text-sm font-semibold text-white truncate">Swornim Moktan</p>
          </div>
        </div>

        {/* Nav list */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="px-3 py-2 text-[10px] font-semibold text-brand-400 uppercase tracking-wider font-mono">
            Navigation Rail
          </div>
          {adminMenu.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handlePageSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-brand-500 text-white font-semibold shadow-md shadow-brand-500/10' 
                    : 'hover:bg-brand-950/40 hover:text-white'
                }`}
              >
                <DynamicIcon name={item.icon} className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-brand-300'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-brand-900 space-y-2">
          <button
            onClick={() => handlePageSelect('home')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-brand-300 hover:text-white hover:bg-brand-950/35 transition-all text-left"
          >
            <Globe className="h-4 w-4" />
            Go to Public Portal
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-all text-left"
          >
            <LogOut className="h-4 w-4" />
            Secure Logout
          </button>
        </div>
      </aside>

      {/* Admin Sidebar - Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-midnight-blue border-b border-brand-900 text-slate-300 flex flex-col overflow-hidden z-20"
          >
            <div className="px-4 py-3 space-y-1">
              {adminMenu.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handlePageSelect(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium cursor-pointer ${
                      isActive ? 'bg-brand-500 text-white' : 'hover:bg-brand-950/50 hover:text-white'
                    }`}
                  >
                    <DynamicIcon name={item.icon} className="h-4.5 w-4.5" />
                    {item.label}
                  </button>
                );
              })}
              <div className="h-px bg-brand-900 my-2" />
              <button
                onClick={() => handlePageSelect('home')}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm text-brand-300 hover:text-white cursor-pointer"
              >
                <Globe className="h-4.5 w-4.5" />
                Public Portal
              </button>
              <button
                onClick={() => { setMobileOpen(false); onLogout(); }}
                className="w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm text-rose-400 hover:text-rose-300 cursor-pointer"
              >
                <LogOut className="h-4.5 w-4.5" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Upper Topbar Admin */}
        <header className="hidden md:flex items-center justify-between h-16 bg-white px-8 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-800 capitalize tracking-tight">
              {currentPage.replace('admin-', '').replace('-', ' ')}
            </h1>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-widest font-mono">
              v2.1 SSL
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="block text-xs font-semibold text-slate-800">Swornim Moktan</span>
              <span className="block text-[10px] text-slate-400 font-mono">Senior Product Evaluator</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-ocean-blue flex items-center justify-center font-bold text-base shadow-inner">
              SO
            </div>
          </div>
        </header>

        {/* Content Node Panel */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

