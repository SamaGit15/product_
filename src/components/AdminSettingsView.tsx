/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ImageUp, KeyRound, ShieldCheck, Sparkles } from 'lucide-react';
import { Button, Card, FormInput } from './UIElements';
import { SiteSettings } from '../types';
import { ApiClient, resolveMediaUrl } from '../lib/api';

interface AdminSettingsViewProps {
  siteSettings: SiteSettings;
  onSaveSiteSettings: (settings: SiteSettings) => Promise<void>;
  onChangePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({
  siteSettings,
  onSaveSiteSettings,
  onChangePassword
}) => {
  const [settingsDraft, setSettingsDraft] = useState(siteSettings);
  const [passwordDraft, setPasswordDraft] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [settingsNotice, setSettingsNotice] = useState('');
  const [passwordNotice, setPasswordNotice] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSettingsDraft(siteSettings);
  }, [siteSettings]);

  const handleLogoSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    try {
      const uploaded = await ApiClient.uploadImage(file, 'branding');
      setSettingsDraft((current) => ({ ...current, logoImage: uploaded.path }));
      setSettingsNotice(`Logo uploaded successfully: ${file.name}. Save controls to publish it.`);
    } catch (error) {
      setSettingsNotice(error instanceof Error ? error.message : 'Logo upload failed.');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSaveSettings = async (event: React.FormEvent) => {
    event.preventDefault();
    setSettingsSaving(true);
    await onSaveSiteSettings(settingsDraft);
    setSettingsNotice('Site settings saved successfully.');
    setSettingsSaving(false);
  };

  const handleChangePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (passwordDraft.newPassword !== passwordDraft.confirmPassword) {
      setPasswordNotice('New password and confirmation do not match.');
      return;
    }
    setPasswordSaving(true);
    const result = await onChangePassword(passwordDraft.currentPassword, passwordDraft.newPassword);
    setPasswordNotice(result.message);
    if (result.success) {
      setPasswordDraft({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }
    setPasswordSaving(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-100 pb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform Controls</span>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-800">Admin Settings</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <Card hover={false} className="border border-slate-100 p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-ocean-blue">
              <ImageUp className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-slate-800">Site Basic Control</h3>
              <p className="text-xs text-slate-400">Manage brand text, footer copy, and contact details used across the frontend.</p>
            </div>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <FormInput label="Brand Name" value={settingsDraft.brandName} onChange={(event) => setSettingsDraft({ ...settingsDraft, brandName: event.target.value })} />
            <FormInput label="Brand Tagline" value={settingsDraft.brandTagline} onChange={(event) => setSettingsDraft({ ...settingsDraft, brandTagline: event.target.value })} />
            <FormInput label="Logo Initials" value={settingsDraft.logoInitials} onChange={(event) => setSettingsDraft({ ...settingsDraft, logoInitials: event.target.value.toUpperCase().slice(0, 3) })} />
            <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Brand Logo</label>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Upload a PNG, JPG, WEBP, or SVG logo. The website will display it in the navbar and footer after you save.
                  </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {settingsDraft.logoImage ? (
                    <img
                      src={resolveMediaUrl(settingsDraft.logoImage)}
                      alt={`${settingsDraft.brandName} logo preview`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-bold text-ocean-blue">{settingsDraft.logoInitials}</span>
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleLogoSelection}
                className="hidden"
              />

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  icon="ImageUp"
                  onClick={() => fileInputRef.current?.click()}
                  isLoading={logoUploading}
                >
                  Upload Logo
                </Button>
                {settingsDraft.logoImage && (
                  <Button
                    type="button"
                    variant="ghost"
                    icon="Trash2"
                    onClick={() => {
                      setSettingsDraft((current) => ({ ...current, logoImage: '' }));
                      setSettingsNotice('Logo removed. Save controls to apply the change.');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                  >
                    Remove Logo
                  </Button>
                )}
              </div>
            </div>
            <FormInput
              label="Footer Description"
              value={settingsDraft.footerDescription}
              onChange={(event) => setSettingsDraft({ ...settingsDraft, footerDescription: event.target.value })}
            />
            <FormInput
              label="Contact Panel Heading"
              value={settingsDraft.contactHeading}
              onChange={(event) => setSettingsDraft({ ...settingsDraft, contactHeading: event.target.value })}
            />
            <FormInput
              label="Contact Address"
              value={settingsDraft.contactAddress}
              onChange={(event) => setSettingsDraft({ ...settingsDraft, contactAddress: event.target.value })}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                label="Contact Email"
                value={settingsDraft.contactEmail}
                onChange={(event) => setSettingsDraft({ ...settingsDraft, contactEmail: event.target.value })}
              />
              <FormInput
                label="Contact Phone"
                value={settingsDraft.contactPhone}
                onChange={(event) => setSettingsDraft({ ...settingsDraft, contactPhone: event.target.value })}
              />
            </div>
            <FormInput label="Primary Timezone Label" value={settingsDraft.primaryTimezone} onChange={(event) => setSettingsDraft({ ...settingsDraft, primaryTimezone: event.target.value })} />
            <FormInput label="Contact Timezone Label" value={settingsDraft.contactTimezone} onChange={(event) => setSettingsDraft({ ...settingsDraft, contactTimezone: event.target.value })} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormInput
                label="Footer Copyright"
                value={settingsDraft.footerCopyright}
                onChange={(event) => setSettingsDraft({ ...settingsDraft, footerCopyright: event.target.value })}
              />
              <FormInput
                label="Footer CTA Label"
                value={settingsDraft.footerCtaLabel}
                onChange={(event) => setSettingsDraft({ ...settingsDraft, footerCtaLabel: event.target.value })}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">{settingsNotice}</span>
              <Button type="submit" variant="primary" icon="Save" isLoading={settingsSaving}>
                Save Controls
              </Button>
            </div>
          </form>
        </Card>

        <Card hover={false} className="border border-slate-100 p-6">
          <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight text-slate-800">Password Change / Update</h3>
              <p className="text-xs text-slate-400">Update the admin access password through the built-in Next.js API.</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <FormInput label="Current Password" type="password" value={passwordDraft.currentPassword} onChange={(event) => setPasswordDraft({ ...passwordDraft, currentPassword: event.target.value })} />
            <FormInput label="New Password" type="password" value={passwordDraft.newPassword} onChange={(event) => setPasswordDraft({ ...passwordDraft, newPassword: event.target.value })} />
            <FormInput label="Confirm New Password" type="password" value={passwordDraft.confirmPassword} onChange={(event) => setPasswordDraft({ ...passwordDraft, confirmPassword: event.target.value })} />
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-semibold text-slate-700">
                <ShieldCheck className="h-4 w-4 text-ocean-blue" />
                Secure password workflow
              </div>
              <p className="mt-2 leading-6">
                The frontend saves through the built-in API layer and gracefully falls back to demonstration mode if the data layer is unavailable.
              </p>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400">{passwordNotice}</span>
              <Button type="submit" variant="primary" icon="Save" isLoading={passwordSaving}>
                Update Password
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <Card hover={false} className="border border-slate-100 bg-slate-900 p-6 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles className="h-5 w-5 text-sky-blue" />
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-blue">Frontend to API Alignment</h3>
            <p className="mt-1 text-sm text-slate-300">
              This admin panel now saves gallery items, site controls, and password updates through the same Vercel-ready API layer used by the rest of the app.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
