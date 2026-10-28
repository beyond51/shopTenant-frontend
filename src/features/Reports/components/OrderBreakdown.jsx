import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function OrderBreakdown({ data }) {
  const totalOrders = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-6">
        <h2 className="font-bold text-slate-900">Order Breakdown</h2>
        <p className="mt-1 text-sm text-slate-500">Orders by current status</p>
      </div>

      <div className="relative h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={85}
              paddingAngle={4}
              stroke="none"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">
            {totalOrders}
          </span>
          <span className="text-xs text-slate-500">Total orders</span>
        </div>
      </div>

      <div className="mt-3 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-600">{item.name}</span>
            </div>

            <span className="text-sm font-semibold text-slate-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
