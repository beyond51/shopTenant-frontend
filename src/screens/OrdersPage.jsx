import {
  CheckCircle2,
  Clock,
  Eye,
  Search,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import StatusBadge from "../features/orders/components/StatusBadge";
import SummaryCard from "../features/orders/components/SummaryCard";

export default function OrdersPage() {
  const initialOrders = [
    {
      id: "ORD-1024",
      customer: "Aman Sharma",
      phone: "9876543210",
      items: 3,
      amount: 1200,
      payment: "Paid",
      status: "pending",
      date: "16 Oct 2026",
    },
    {
      id: "ORD-1023",
      customer: "Priya Verma",
      phone: "9876543211",
      items: 2,
      amount: 850,
      payment: "COD",
      status: "confirmed",
      date: "16 Oct 2026",
    },
    {
      id: "ORD-1022",
      customer: "Rahul Jain",
      phone: "9876543212",
      items: 4,
      amount: 2100,
      payment: "Paid",
      status: "processing",
      date: "15 Oct 2026",
    },
    {
      id: "ORD-1021",
      customer: "Neha Singh",
      phone: "9876543213",
      items: 1,
      amount: 650,
      payment: "Paid",
      status: "delivered",
      date: "15 Oct 2026",
    },
    {
      id: "ORD-1020",
      customer: "Rohit Patel",
      phone: "9876543214",
      items: 2,
      amount: 1500,
      payment: "COD",
      status: "cancelled",
      date: "14 Oct 2026",
    },
    {
      id: "ORD-1019",
      customer: "Anjali Gupta",
      phone: "9876543215",
      items: 3,
      amount: 950,
      payment: "Paid",
      status: "shipped",
      date: "14 Oct 2026",
    },
  ];

  const filters = [
    { label: "All Orders", value: "all" },
    { label: "New / Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Processing", value: "processing" },
    { label: "Shipped", value: "shipped" },
    { label: "Completed", value: "delivered" },
    { label: "Rejected / Cancelled", value: "cancelled" },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesStatus =
        activeFilter === "all" || order.status === activeFilter;

      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.phone.includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [orders, activeFilter, search]);

  const updateStatus = (orderId, status) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    );

    setSelectedOrder((current) =>
      current?.id === orderId ? { ...current, status } : current,
    );
  };

  const countStatus = (status) =>
    orders.filter((order) => order.status === status).length;

  const summary = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400",
    },
    {
      title: "New / Pending",
      value: countStatus("pending"),
      icon: Clock,
      color:
        "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400",
    },
    {
      title: "Completed",
      value: countStatus("delivered"),
      icon: CheckCircle2,
      color:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
    {
      title: "Rejected / Cancelled",
      value: countStatus("cancelled"),
      icon: XCircle,
      color: "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 transition-colors dark:bg-slate-950 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Orders
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage and track all your shop orders in one place.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <SummaryCard key={item.title} {...item} />
        ))}
      </div>

      {/* Orders table */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-900">
        {/* Search and filters */}
        <div className="border-b border-slate-100 p-4 dark:border-slate-800 sm:p-5">
          <h2 className="font-bold text-slate-900 dark:text-slate-100">
            All Orders
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Search orders or filter them by their current status.
          </p>

          <div className="mt-5 flex max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors focus-within:border-[var(--accent-color)] dark:border-slate-700 dark:bg-slate-800">
            <Search size={19} className="shrink-0 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search order ID, customer or phone..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
          </div>

          {/* Status filters */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => {
              const count =
                filter.value === "all"
                  ? orders.length
                  : countStatus(filter.value);

              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "accent-background"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {filter.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/70 dark:text-slate-400">
              <tr>
                <th className="px-5 py-4 font-medium">Order</th>
                <th className="px-5 py-4 font-medium">Customer</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Items</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Payment</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900 dark:text-slate-100">
                    {order.id}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {order.customer}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {order.phone}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-slate-500 dark:text-slate-400">
                    {order.date}
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {order.items}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-800 dark:text-slate-200">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>

                  <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                    {order.payment}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      aria-label={`View ${order.id}`}
                      className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] dark:border-slate-700 dark:text-slate-400"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-slate-500 dark:text-slate-400"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order details modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="order-modal-title"
                  className="text-xl font-bold text-slate-900 dark:text-slate-100"
                >
                  Order {selectedOrder.id}
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Customer: {selectedOrder.customer}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <XCircle size={22} />
              </button>
            </div>

            <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <p>
                <span className="text-slate-500 dark:text-slate-400">
                  Phone:
                </span>{" "}
                {selectedOrder.phone}
              </p>

              <p>
                <span className="text-slate-500 dark:text-slate-400">
                  Order date:
                </span>{" "}
                {selectedOrder.date}
              </p>

              <p>
                <span className="text-slate-500 dark:text-slate-400">
                  Items:
                </span>{" "}
                {selectedOrder.items}
              </p>

              <p>
                <span className="text-slate-500 dark:text-slate-400">
                  Payment:
                </span>{" "}
                {selectedOrder.payment}
              </p>

              <p className="font-semibold text-slate-900 dark:text-slate-100">
                Amount: ₹{selectedOrder.amount.toLocaleString("en-IN")}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <span>Status:</span>
                <StatusBadge status={selectedOrder.status} />
              </div>
            </div>

            <label
              htmlFor="order-status"
              className="mt-5 block text-sm font-semibold text-slate-700 dark:text-slate-200"
            >
              Update order status
            </label>

            <select
              id="order-status"
              value={selectedOrder.status}
              onChange={(event) =>
                updateStatus(selectedOrder.id, event.target.value)
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-[var(--accent-color)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Completed / Delivered</option>
              <option value="cancelled">Rejected / Cancelled</option>
            </select>

            <button
              onClick={() => setSelectedOrder(null)}
              className="accent-background mt-5 w-full rounded-xl px-4 py-3 font-semibold transition"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
