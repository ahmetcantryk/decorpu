"use client";

import type { ReactElement, ReactNode } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface DashboardChartsProps {
  byCategory: { name: string; value: number }[];
  byStatus: { name: string; value: number; color: string }[];
  overTime: { date: string; value: number }[];
}

function Card({ title, children, className }: { title: string; children: ReactNode; className?: string }): ReactElement {
  return (
    <section className={`rounded-lg border border-line bg-surface p-5 ${className ?? ""}`}>
      <h2 className="mb-4 text-sm font-medium text-ink-soft">{title}</h2>
      {children}
    </section>
  );
}

const AXIS = { fontSize: 11, fill: "#6b7178" };

export function DashboardCharts({ byCategory, byStatus, overTime }: DashboardChartsProps): ReactElement {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card title="Kategoriye göre ürün">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={byCategory} margin={{ top: 4, right: 8, bottom: 28, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f2" vertical={false} />
            <XAxis dataKey="name" tick={AXIS} interval={0} angle={-22} textAnchor="end" height={52} tickLine={false} axisLine={{ stroke: "#e7e9ec" }} />
            <YAxis tick={AXIS} allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip cursor={{ fill: "rgba(247,115,0,0.06)" }} contentStyle={{ borderRadius: 8, border: "1px solid #e7e9ec", fontSize: 12 }} />
            <Bar dataKey="value" name="Ürün" fill="#f77300" radius={[4, 4, 0, 0]} maxBarSize={42} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Talep durumları">
        <div className="flex items-center gap-4">
          <ResponsiveContainer width="60%" height={240}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={52} outerRadius={92} paddingAngle={2} stroke="none">
                {byStatus.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e7e9ec", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <ul className="space-y-2 text-sm">
            {byStatus.map((s) => (
              <li key={s.name} className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-ink-soft">{s.name}</span>
                <span className="ml-auto font-medium tabular-nums">{s.value}</span>
              </li>
            ))}
            {!byStatus.length ? <li className="text-muted">Talep yok</li> : null}
          </ul>
        </div>
      </Card>

      <Card title="Son 14 gün — gelen talepler" className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={overTime} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f77300" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#f77300" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef0f2" vertical={false} />
            <XAxis dataKey="date" tick={AXIS} tickLine={false} axisLine={{ stroke: "#e7e9ec" }} />
            <YAxis tick={AXIS} allowDecimals={false} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #e7e9ec", fontSize: 12 }} />
            <Area dataKey="value" name="Talep" stroke="#f77300" strokeWidth={2} fill="url(#leadGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
