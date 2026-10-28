import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  formatCurrency,
  formatCompactCurrency,
  formatDate,
} from "../utils/reportUtils";

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
      <p className="mb-2 text-xs font-medium text-slate-500">
        {formatDate(label)}
      </p>

      {payload.map((item) => (
        <p
          key={item.dataKey}
          className="mt-1 text-sm font-semibold text-slate-800"
        >
          {item.name}:{" "}
          {item.dataKey === "revenue" ? formatCurrency(item.value) : item.value}
        </p>
      ))}
    </div>
  );
}

export default function SalesOverview({
  sales,
  reportType,
  onReportTypeChange,
  totals,
}) {
  const chartTotal = useMemo(
    () => (reportType === "revenue" ? totals.revenue : totals.orders),
    [reportType, totals],
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900">Sales Overview</h2>
          <p className="mt-1 text-sm text-slate-500">
            Revenue and order volume over time
          </p>
        </div>

        <div className="flex rounded-xl bg-slate-100 p-1">
          {[
            { value: "revenue", label: "Revenue" },
            { value: "orders", label: "Orders" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onReportTypeChange(option.value)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                reportType === option.value
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-5">
        <div>
          <p className="text-xs text-slate-500">
            {reportType === "revenue"
              ? "Revenue in period"
              : "Orders in period"}
          </p>

          <p className="mt-1 text-2xl font-bold text-slate-900">
            {reportType === "revenue"
              ? formatCurrency(chartTotal)
              : chartTotal.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
          {reportType === "revenue" ? "Sales revenue" : "Order count"}
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={sales}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="reportRevenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              minTickGap={20}
            />

            <YAxis
              tickFormatter={
                reportType === "revenue"
                  ? formatCompactCurrency
                  : (value) => value
              }
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={58}
            />

            <Tooltip content={<ChartTooltip />} />

            <Area
              type="monotone"
              dataKey={reportType}
              name={reportType === "revenue" ? "Revenue" : "Orders"}
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#reportRevenueGradient)"
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
