import { CalendarDays, Download } from "lucide-react";

export default function ReportHeader({
  dateRange,
  onDateRangeChange,
  onExport,
}) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-medium text-slate-700">Reports</span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Reports & Analytics
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Track sales performance and understand your shop's growth.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
          <CalendarDays size={17} className="text-slate-400" />

          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value)}
            aria-label="Report date range"
            className="bg-transparent text-sm font-medium text-slate-700 outline-none"
          >
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>

        <button
          onClick={onExport}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          <Download size={17} />
          Export Report
        </button>
      </div>
    </div>
  );
}
