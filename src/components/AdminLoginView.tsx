/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Sparkles, ShieldCheck, Eye, EyeOff, KeyRound } from 'lucide-react';
import { Button, FormInput } from './UIElements';
import { ApiClient } from '../lib/api';

interface AdminLoginViewProps {
  onLoginSuccess: (token: string) => void;
  onNavigateHome: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onNavigateHome
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Admin email and password are required');
      return;
    }

    setLoading(true);
    try {
      const result = await ApiClient.login(email, password);
      if (result.success && result.token) {
        onLoginSuccess(result.token);
      } else {
        setErrorMsg(result.error || 'Authentication rejected by the API.');
      }
    } catch (err) {
      setErrorMsg('Unable to reach the API right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Dynamic background blurs */}
      <div className="absolute top-1/4 left-1/2 w-[350px] h-[350px] bg-brand-300/10 rounded-full blur-3xl -ml-[175px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        {/* LOGO AND HEADER */}
        <div className="text-center space-y-4">
          <div 
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2.5 mx-auto cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-midnight-blue via-ocean-blue to-sky-blue flex items-center justify-center shadow-lg shadow-brand-500/10">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-brand-900 tracking-tight">Admin Gatekeeper</h2>
            <p className="mt-1.5 text-xs text-slate-400 font-mono tracking-wider uppercase font-bold">
              AI-Solutions Control Console
            </p>
          </div>
        </div>

        {/* LOGIN FORM BOX */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 text-xs font-semibold text-slate-400 font-mono uppercase">
            <Lock className="h-4 w-4 text-ocean-blue" />
            <span>Secure SSL Tunnel Session</span>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-rose-500 shrink-0" />
                <span className="leading-snug">{errorMsg}</span>
              </div>
            )}

            <FormInput
              label="Admin Email"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              icon="Mail"
            />

            <div className="relative">
              <FormInput
                label="Admin Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                icon="KeyRound"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 bottom-3.5 text-slate-450 hover:text-slate-800"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button
              type="submit"
              variant="secondary"
              isLoading={loading}
              className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold tracking-tight shadow-md"
            >
              Authorize Handshake
            </Button>
          </form>

        </div>

        {/* FOOTER */}
        <div className="text-center">
          <button
            onClick={onNavigateHome}
            className="text-xs font-medium text-slate-400 hover:text-slate-700 font-mono flex items-center justify-center gap-1.5 mx-auto"
          >
            ← Back to Guest Organization view
          </button>
        </div>
      </motion.div>
    </div>
  );
};
