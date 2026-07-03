/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Inbox,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  MapPin,
  PlusSquare,
  ArrowRight,
  Activity,
  Globe,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { Card, StatCard, StatusBadge, Button, EmptyState } from './UIElements';
import { Inquiry, DashboardStats } from '../types';

interface AdminDashboardViewProps {
  inquiries: Inquiry[];
  stats: DashboardStats;
  onPageChange: (page: string) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

const formatDay = (value: Date) =>
  value.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const chartPalette = ['#2E86DE', '#89C2FF', '#10B981', '#F59E0B', '#6366F1'];

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  inquiries,
  stats,
  onPageChange,
  onRefresh,
  isRefreshing
}) => {
  const recentInquiries = inquiries.slice(0, 5);

  const statusData = [
    { label: 'New', value: stats.newInquiries, color: 'bg-emerald-500' },
    { label: 'In Progress', value: stats.inProgressInquiries, color: 'bg-amber-500' },
    { label: 'Closed', value: stats.closedInquiries, color: 'bg-slate-700' }
  ];

  const maxStatusValue = Math.max(...statusData.map((item) => item.value), 1);

  const countryCounts: Record<string, number> = inquiries.reduce((acc: Record<string, number>, inquiry) => {
    const key = inquiry.country || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const topCountries: Array<[string, number]> = Object.entries(countryCounts)
    .map(([country, count]) => [country, Number(count)] as [string, number])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxCountryCount = Math.max(...topCountries.map(([, count]) => count), 1);

  const now = new Date();
  const dailyCounts = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(now);
    day.setHours(0, 0, 0, 0);
    day.setDate(now.getDate() - (6 - index));

    const count = inquiries.filter((inquiry) => {
      const created = new Date(inquiry.createdAt);
      return (
        created.getFullYear() === day.getFullYear() &&
        created.getMonth() === day.getMonth() &&
        created.getDate() === day.getDate()
      );
    }).length;

    return {
      label: formatDay(day),
      count
    };
  });

  const maxDailyCount = Math.max(...dailyCounts.map((item) => item.count), 1);
  const totalStatus = statusData.reduce((sum, item) => sum + item.value, 0) || 1;
  const totalCountryCount = topCountries.reduce((sum, [, count]) => sum + count, 0) || 1;

  const activeWorkload = stats.totalInquiries
    ? Math.round(((stats.newInquiries + stats.inProgressInquiries) / stats.totalInquiries) * 100)
    : 0;

  const linePoints = dailyCounts.map((day, index) => {
    const x = dailyCounts.length === 1 ? 150 : (index / (dailyCounts.length - 1)) * 300;
    const y = 120 - ((day.count / maxDailyCount) * 100);
    return `${x},${Math.max(y, 8)}`;
  }).join(' ');

  const donutSegments = topCountries.reduce<Array<{ country: string; count: number; percent: number; offset: number; color: string }>>(
    (acc, [country, count], index) => {
      const previousOffset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].percent : 0;
      const percent = (count / totalCountryCount) * 100;
      acc.push({
        country,
        count,
        percent,
        offset: previousOffset,
        color: chartPalette[index % chartPalette.length]
      });
      return acc;
    },
    []
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 font-mono uppercase tracking-wider">Operational overview</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-800">Admin dashboard</h2>
          <p className="mt-2 text-sm text-slate-500">
            Track inquiry volume, workload status, location trends, and the latest submissions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            isLoading={isRefreshing}
            icon="RefreshCw"
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon="PlusSquare"
            onClick={() => onPageChange('admin-content')}
          >
            Manage content
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total inquiries"
          value={stats.totalInquiries}
          icon="Inbox"
          trend={`${activeWorkload}% active`}
          trendType="up"
          color="bg-brand-50 text-ocean-blue"
        />

        <StatCard
          title="New inquiries"
          value={stats.newInquiries}
          icon="AlertCircle"
          trend="Needs review"
          trendType="up"
          color="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="In progress"
          value={stats.inProgressInquiries}
          icon="Activity"
          trend="Open work"
          trendType="up"
          color="bg-amber-50 text-amber-600"
        />

        <StatCard
          title="Closed"
          value={stats.closedInquiries}
          icon="CheckCircle2"
          trend="Resolved"
          trendType="up"
          color="bg-slate-100 text-slate-700"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card hover={false} className="xl:col-span-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Graph 1</p>
              <h3 className="mt-1 text-base font-bold text-slate-800">Inquiry status breakdown</h3>
            </div>
            <BarChart3 className="h-5 w-5 text-ocean-blue" />
          </div>
          <div className="mt-6">
            <div className="flex h-52 items-end justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-5">
              {statusData.map((item) => {
                const height = item.value === 0 ? 10 : Math.max((item.value / maxStatusValue) * 100, 16);
                const share = Math.round((item.value / totalStatus) * 100);

                return (
                  <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">{item.value}</span>
                    <div className="flex h-36 w-full items-end justify-center">
                      <div
                        className={`w-14 max-w-full rounded-t-2xl ${item.color} shadow-sm`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-center text-[11px] font-semibold leading-tight text-slate-600">{item.label}</span>
                    <span className="text-[10px] font-mono text-slate-400">{share}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card hover={false} className="xl:col-span-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Graph 2</p>
              <h3 className="mt-1 text-base font-bold text-slate-800">Country distribution</h3>
            </div>
            <PieChart className="h-5 w-5 text-ocean-blue" />
          </div>

          <div className="mt-6">
            {topCountries.length === 0 ? (
              <p className="text-sm text-slate-400">No location data yet.</p>
            ) : (
              <div className="flex flex-col items-center gap-6">
                <div className="relative flex h-48 w-48 items-center justify-center">
                  <svg viewBox="0 0 160 160" className="h-48 w-48 -rotate-90">
                    <circle cx="80" cy="80" r="54" fill="none" stroke="#E2E8F0" strokeWidth="18" />
                    {donutSegments.map((segment) => (
                      <circle
                        key={segment.country}
                        cx="80"
                        cy="80"
                        r="54"
                        fill="none"
                        stroke={segment.color}
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeDasharray={`${(segment.percent / 100) * 339.292} 339.292`}
                        strokeDashoffset={-((segment.offset / 100) * 339.292)}
                      />
                    ))}
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-2xl font-bold text-slate-800">{topCountries.length}</div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Countries</div>
                  </div>
                </div>
                <div className="w-full space-y-2.5">
                  {donutSegments.map((segment) => (
                    <div key={segment.country} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 truncate font-semibold text-slate-700">
                        <span
                          className="h-2.5 w-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: segment.color }}
                        />
                        {segment.country}
                      </span>
                      <span className="font-mono text-slate-500">
                        {segment.count} ({Math.round(segment.percent)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card hover={false} className="xl:col-span-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Graph 3</p>
              <h3 className="mt-1 text-base font-bold text-slate-800">Last 7 days</h3>
            </div>
            <LineChart className="h-5 w-5 text-ocean-blue" />
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <svg viewBox="0 0 320 160" className="h-40 w-full overflow-visible">
              <line x1="10" y1="120" x2="310" y2="120" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="10" y1="80" x2="310" y2="80" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="10" y1="40" x2="310" y2="40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
              <polyline
                fill="none"
                stroke="#2E86DE"
                strokeWidth="4"
                strokeLinejoin="round"
                strokeLinecap="round"
                points={linePoints}
              />
              {dailyCounts.map((day, index) => {
                const x = dailyCounts.length === 1 ? 150 : (index / (dailyCounts.length - 1)) * 300;
                const y = Math.max(120 - ((day.count / maxDailyCount) * 100), 8);
                return (
                  <g key={day.label}>
                    <circle cx={x} cy={y} r="5" fill="#89C2FF" stroke="#2E86DE" strokeWidth="2" />
                    <text x={x} y={y - 10} textAnchor="middle" className="fill-slate-500 text-[10px] font-mono">
                      {day.count}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="mt-3 flex justify-between gap-2">
              {dailyCounts.map((day) => (
                <span key={day.label} className="flex-1 text-center text-[10px] text-slate-400">
                  {day.label}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Card hover={false} className="xl:col-span-8 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold tracking-tight text-slate-800">Recent inquiries</h3>
              <p className="mt-1 text-sm text-slate-500">The latest submissions that may need follow-up.</p>
            </div>
            <button
              onClick={() => onPageChange('admin-inquiries')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-ocean-blue hover:underline"
            >
              Open inbox
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {recentInquiries.length === 0 ? (
            <EmptyState
              title="No inquiries yet"
              description="Once visitors submit the contact form, recent entries will appear here."
              icon="Inbox"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                    <th className="pb-3">Lead</th>
                    <th className="pb-3">Job title</th>
                    <th className="pb-3">Country</th>
                    <th className="pb-3">Created</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-slate-50/70">
                      <td className="py-4">
                        <div className="font-semibold text-slate-800">{inquiry.name}</div>
                        <div className="text-[11px] text-slate-500">{inquiry.company || inquiry.email}</div>
                      </td>
                      <td className="py-4 text-slate-600">{inquiry.jobTitle || 'Not provided'}</td>
                      <td className="py-4 text-slate-600">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-slate-400" />
                          {inquiry.country || 'Unknown'}
                        </span>
                      </td>
                      <td className="py-4 text-slate-500">
                        {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4 text-right">
                        <StatusBadge status={inquiry.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <div className="xl:col-span-4 space-y-6">
          <Card hover={false} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Highlights</p>
                <h3 className="mt-1 text-base font-bold text-slate-800">Useful summary</h3>
              </div>
              <PieChart className="h-5 w-5 text-ocean-blue" />
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-slate-500">Top country</p>
                <p className="mt-1 font-semibold text-slate-800">{stats.topCountry || 'Not available yet'}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-slate-500">Most requested service</p>
                <p className="mt-1 font-semibold text-slate-800">{stats.mostRequestedService || 'Not captured'}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-slate-500">Open workload</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {stats.newInquiries + stats.inProgressInquiries} inquiries need attention
                </p>
              </div>
            </div>
          </Card>

          <Card hover={false} className="p-6 bg-slate-900 text-white border-none">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sky-blue font-mono">
              <Activity className="h-4 w-4" />
              Quick actions
            </h3>

            <div className="mt-5 space-y-2.5">
              <button
                onClick={() => onPageChange('admin-inquiries')}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3.5 text-left text-sm text-slate-200 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-sky-blue" />
                  Review inquiries
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </button>

              <button
                onClick={() => onPageChange('admin-content')}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3.5 text-left text-sm text-slate-200 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <PlusSquare className="h-4 w-4 text-sky-blue" />
                  Update content
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </button>

              <button
                onClick={() => onPageChange('admin-settings')}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3.5 text-left text-sm text-slate-200 transition hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-sky-blue" />
                  Site settings
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
