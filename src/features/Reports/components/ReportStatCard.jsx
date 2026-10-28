import { TrendingDown, TrendingUp } from "lucide-react";

export default function ReportStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconClass,
  trend,
  positive = true,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {trend && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
              positive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {trend}
          </span>
        )}

        <span className="text-xs text-slate-500">{subtitle}</span>
      </div>
    </div>
  );
}
