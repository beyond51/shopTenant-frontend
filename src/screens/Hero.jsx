import {
  IndianRupee,
  ShoppingBag,
  Clock,
  Package,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Today's Sales",
    value: "₹4,500",
    icon: IndianRupee,
    color:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    title: "Total Orders",
    value: "128",
    icon: ShoppingBag,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    title: "Pending Orders",
    value: "8",
    icon: Clock,
    color:
      "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  },
  {
    title: "Total Products",
    value: "46",
    icon: Package,
    color:
      "bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  },
];

const recentOrders = [
  {
    id: "#ORD-1024",
    customer: "Aman Sharma",
    amount: "₹1,200",
    status: "Pending",
  },
  {
    id: "#ORD-1023",
    customer: "Priya Verma",
    amount: "₹850",
    status: "Confirmed",
  },
  {
    id: "#ORD-1022",
    customer: "Rahul Jain",
    amount: "₹2,100",
    status: "Shipped",
  },
  {
    id: "#ORD-1021",
    customer: "Neha Singh",
    amount: "₹650",
    status: "Delivered",
  },
];

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={21} />
        </div>

        <ArrowUpRight
          size={18}
          className="text-slate-400 dark:text-slate-500"
        />
      </div>

      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{title}</p>

      <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100">
        {value}
      </h2>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="min-h-screen bg-slate-50 p-5 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:p-8">
      {/* Shop status */}
      <div className="mt-7 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/50">
        <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />

        <div>
          <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            Your shop is live
          </p>

          <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
            Your store is ready to accept orders.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent orders */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 p-5 dark:border-slate-800">
          <div>
            <h2 className="font-bold text-slate-900 dark:text-slate-100">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Keep track of your latest customer orders.
            </p>
          </div>

          <button
            type="button"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th className="px-5 py-4 font-medium">Order ID</th>
                <th className="px-5 py-4 font-medium">Customer</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/70"
                >
                  <td className="px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                    {order.id}
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {order.customer}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-800 dark:text-slate-200">
                    {order.amount}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : order.status === "Pending"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                            : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                              : "bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
