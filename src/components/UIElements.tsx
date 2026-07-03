/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';

// Dynamic helper to render any Lucide icon dynamically by name
export const DynamicIcon = ({ name, className = "h-5 w-5", ...props }: { name: string; className?: string; [key: string]: any }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    return <Icons.HelpCircle className={className} {...props} />;
  }
  return <IconComponent className={className} {...props} />;
};

// --- BUTTON ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95";
  
  const variants = {
    primary: "bg-ocean-blue hover:bg-brand-600 text-white shadow-md shadow-brand-500/15 focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue",
    secondary: "bg-midnight-blue hover:bg-brand-950 text-white shadow-md shadow-brand-950/10 focus:ring-2 focus:ring-offset-2 focus:ring-midnight-blue",
    outline: "border-2 border-slate-200 hover:border-brand-300 bg-white text-slate-700 hover:text-brand-600 focus:ring-2 focus:ring-offset-2 focus:ring-brand-200",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/15 focus:ring-2 focus:ring-offset-2 focus:ring-red-400",
    ghost: "text-slate-600 hover:text-brand-600 hover:bg-brand-50"
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Icons.Loader2 className="animate-spin h-4 w-4" />
      ) : icon ? (
        <DynamicIcon name={icon} className="h-4 w-4 shrink-0" />
      ) : null}
      {children}
    </button>
  );
};

// --- CARD ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hover = true }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 ${
        hover ? 'hover:-translate-y-1 hover:shadow-lg hover:border-slate-200/80' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

// --- SECTION HEADER ---
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  className = ''
}) => {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-ocean-blue mb-3 border border-brand-100 uppercase tracking-widest">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-brand-900 mt-1">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto md:mx-0 inline-block">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// --- STAT CARD ---
interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendType = 'up',
  color = 'bg-brand-50 text-ocean-blue'
}) => {
  const trendColor = trendType === 'up' ? 'text-emerald-600 bg-emerald-50' : trendType === 'down' ? 'text-rose-600 bg-rose-50' : 'text-slate-500 bg-slate-50';
  const trendIcon = trendType === 'up' ? 'ArrowUpRight' : trendType === 'down' ? 'ArrowDownLeft' : 'Minus';

  return (
    <Card hover={false} className="p-6 relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h4 className="text-2xl md:text-3xl font-bold text-slate-850 mt-2 tracking-tight">{value}</h4>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <DynamicIcon name={icon} className="h-6 w-6" />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1.5 mt-4 text-xs font-medium">
          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${trendColor}`}>
            <DynamicIcon name={trendIcon} className="h-3 w-3" />
            {trend}
          </span>
          <span className="text-slate-400">vs last month</span>
        </div>
      )}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-100/10 to-transparent rounded-full -mr-6 -mb-6 transition-transform duration-300 group-hover:scale-125" />
    </Card>
  );
};

// --- FORM INPUT ---
interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <div className="relative rounded-xl shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <DynamicIcon name={icon} className="h-4 w-4" />
          </div>
        )}
        <input
          className={`block w-full rounded-xl border ${
            error ? 'border-red-300 focus:ring-red-400 focus:border-red-400' : 'border-slate-200 focus:ring-ocean-blue focus:border-ocean-blue'
          } ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-white text-slate-800 placeholder-slate-400 text-sm font-sans transition-all focus:ring-2 focus:ring-offset-0 focus:outline-none`}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500 font-medium ">{error}</p>}
    </div>
  );
};

// --- STATUS BADGE ---
export const StatusBadge: React.FC<{ status: 'New' | 'In Progress' | 'Closed' }> = ({ status }) => {
  const styles = {
    'New': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-100',
    'Closed': 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
        status === 'New' ? 'bg-emerald-500' : status === 'In Progress' ? 'bg-amber-500' : 'bg-slate-400'
      }`} />
      {status}
    </span>
  );
};

// --- LOADING SPINNER ---
export const LoadingSpinner: React.FC<{ label?: string }> = ({ label = 'Loading analytics telemetry...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-12 h-12 border-4 border-slate-200 border-t-ocean-blue rounded-full mb-4"
      />
      <p className="text-sm font-medium text-slate-400 animate-pulse">{label}</p>
    </div>
  );
};

// --- EMPTY STATE ---
interface EmptyStateProps {
  title: string;
  description: string;
  icon: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionLabel,
  onAction
}) => {
  return (
    <div className="text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-5 border border-slate-100">
        <DynamicIcon name={icon} className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-400 mt-2 font-normal leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

// --- CONFIRM MODAL ---
interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDanger = true
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-slate-100"
            >
              <div className="bg-white px-6 pt-6 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start gap-4">
                  <div className={`mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 ${
                    isDanger ? 'bg-rose-50 text-rose-600' : 'bg-brand-50 text-ocean-blue'
                  }`}>
                    <DynamicIcon name={isDanger ? 'AlertTriangle' : 'Info'} className="h-6 w-6" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
                    <p className="text-sm text-slate-400 mt-2 font-normal leading-relaxed">{message}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
                <Button
                  variant={isDanger ? 'danger' : 'primary'}
                  size="sm"
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="mt-2 sm:mt-0"
                >
                  {cancelLabel}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
