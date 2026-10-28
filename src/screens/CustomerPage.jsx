import { useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Repeat2,
  IndianRupee,
  Search,
  Filter,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowUpRight,
  Download,
} from "lucide-react";
import CustomerDetailsModal from "../features/customer/components/CustomerDetailsModal";
import CustomerStatus from "../features/customer/components/CustomerStatus";
import StatCard from "../features/customer/components/StatCard";

const initialCustomers = [
  {
    id: "CUS-1001",
    name: "Aarav Sharma",
    phone: "9876543210",
    email: "aarav@example.com",
    city: "Bhopal",
    joinedAt: "2026-10-20",
    orders: 8,
    totalSpent: 12450,
    status: "Active",
    lastOrder: "2026-10-25",
    address: "MP Nagar, Bhopal, Madhya Pradesh",
    orderHistory: [
      { id: "ORD-1042", date: "2026-10-25", amount: 2499, status: "Delivered" },
      { id: "ORD-1021", date: "2026-10-15", amount: 1599, status: "Delivered" },
      { id: "ORD-0998", date: "2026-10-05", amount: 3200, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1002",
    name: "Priya Verma",
    phone: "9123456780",
    email: "priya@example.com",
    city: "Indore",
    joinedAt: "2026-10-18",
    orders: 5,
    totalSpent: 7890,
    status: "Active",
    lastOrder: "2026-10-24",
    address: "Vijay Nagar, Indore, Madhya Pradesh",
    orderHistory: [
      { id: "ORD-1038", date: "2026-10-24", amount: 1890, status: "Delivered" },
      { id: "ORD-1012", date: "2026-10-12", amount: 2200, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1003",
    name: "Rahul Patel",
    phone: "9988776655",
    email: "rahul@example.com",
    city: "Bhopal",
    joinedAt: "2026-10-16",
    orders: 1,
    totalSpent: 899,
    status: "Active",
    lastOrder: "2026-10-22",
    address: "Kolar Road, Bhopal, Madhya Pradesh",
    orderHistory: [
      { id: "ORD-1030", date: "2026-10-22", amount: 899, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1004",
    name: "Sneha Gupta",
    phone: "9090909090",
    email: "sneha@example.com",
    city: "Jabalpur",
    joinedAt: "2026-10-12",
    orders: 12,
    totalSpent: 18990,
    status: "Active",
    lastOrder: "2026-10-26",
    address: "Wright Town, Jabalpur, Madhya Pradesh",
    orderHistory: [
      { id: "ORD-1045", date: "2026-10-26", amount: 3500, status: "Delivered" },
      { id: "ORD-1027", date: "2026-10-19", amount: 1800, status: "Delivered" },
    ],
  },
  {
    id: "CUS-1005",
    name: "Vikram Singh",
    phone: "9876501234",
    email: "vikram@example.com",
    city: "Ujjain",
    joinedAt: "2026-10-10",
    orders: 0,
    totalSpent: 0,
    status: "Inactive",
    lastOrder: null,
    address: "Freeganj, Ujjain, Madhya Pradesh",
    orderHistory: [],
  },
  {
    id: "CUS-1006",
    name: "Ananya Jain",
    phone: "9812345670",
    email: "ananya@example.com",
    city: "Bhopal",
    joinedAt: "2026-10-08",
    orders: 4,
    totalSpent: 5600,
    status: "Active",
    lastOrder: "2026-10-21",
    address: "Arera Colony, Bhopal, Madhya Pradesh",
    orderHistory: [
      { id: "ORD-1026", date: "2026-10-21", amount: 1600, status: "Delivered" },
      { id: "ORD-1001", date: "2026-10-08", amount: 1200, status: "Delivered" },
    ],
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date) => {
  if (!date) return "No orders yet";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const avatarColors = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-sky-100 text-sky-700",
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const pageSize = 5;

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.name.toLowerCase().includes(query) ||
        customer.phone.includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "spending") return b.totalSpent - a.totalSpent;
      if (sortBy === "orders") return b.orders - a.orders;
      return new Date(b.joinedAt) - new Date(a.joinedAt);
    });
  }, [customers, search, statusFilter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCustomers.length / pageSize),
  );
  const currentPage = Math.min(page, totalPages);

  const visibleCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const totalSpent = customers.reduce(
    (sum, customer) => sum + customer.totalSpent,
    0,
  );
  const repeatCustomers = customers.filter(
    (customer) => customer.orders > 1,
  ).length;
  const newCustomers = customers.filter((customer) => {
    const days =
      (new Date("2026-10-27T00:00:00") -
        new Date(`${customer.joinedAt}T00:00:00`)) /
      (1000 * 60 * 60 * 24);

    return days >= 0 && days <= 7;
  }).length;

  const deleteCustomer = (customer) => {
    const confirmed = window.confirm(
      `Delete ${customer.name} from this customer list?`,
    );

    if (!confirmed) return;

    setCustomers((previous) =>
      previous.filter((item) => item.id !== customer.id),
    );

    if (selectedCustomer?.id === customer.id) {
      setSelectedCustomer(null);
    }
  };

  const exportCustomers = () => {
    const headers = [
      "Customer ID",
      "Name",
      "Phone",
      "Email",
      "City",
      "Orders",
      "Total Spent",
      "Status",
      "Joined At",
    ];

    const escapeCsv = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filteredCustomers.map((customer) => [
      customer.id,
      customer.name,
      customer.phone,
      customer.email,
      customer.city,
      customer.orders,
      customer.totalSpent,
      customer.status,
      customer.joinedAt,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsv).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "customers.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="font-medium text-slate-700">Customers</span>
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Customers
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage your customers and understand their buying activity.
            </p>
          </div>

          <button
            onClick={exportCustomers}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Customers"
            value={customers.length.toLocaleString("en-IN")}
            subtitle="Customers in this shop"
            icon={Users}
            color="bg-indigo-50 text-indigo-600"
          />

          <StatCard
            title="New Customers"
            value={newCustomers.toLocaleString("en-IN")}
            subtitle="Joined in the last 7 days"
            icon={UserPlus}
            color="bg-sky-50 text-sky-600"
          />

          <StatCard
            title="Repeat Customers"
            value={repeatCustomers.toLocaleString("en-IN")}
            subtitle="More than one order"
            icon={Repeat2}
            color="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Customer Sales"
            value={formatCurrency(totalSpent)}
            subtitle="Total spend across customers"
            icon={IndianRupee}
            color="bg-amber-50 text-amber-600"
          />
        </div>

        {/* Customer table section */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Customers
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredCustomers.length} customer
                {filteredCustomers.length === 1 ? "" : "s"} found
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:w-72">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search name, phone, email..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <button
                onClick={() => setShowFilters((previous) => !previous)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  showFilters
                    ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Filter size={17} />
                Filters
              </button>
            </div>
          </div>

          {/* Filter controls */}
          {showFilters && (
            <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-end">
              <div className="w-full sm:max-w-xs">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Customer Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                >
                  <option value="All">All customers</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="w-full sm:max-w-xs">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-400"
                >
                  <option value="recent">Recently joined</option>
                  <option value="spending">Highest spending</option>
                  <option value="orders">Most orders</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setStatusFilter("All");
                  setSortBy("recent");
                  setSearch("");
                  setPage(1);
                }}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Customer
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Contact
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Orders
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Spent
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Last Order
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {visibleCustomers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                            avatarColors[index % avatarColors.length]
                          }`}
                        >
                          {getInitials(customer.name)}
                        </div>

                        <div>
                          <p className="whitespace-nowrap text-sm font-semibold text-slate-900">
                            {customer.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {customer.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {customer.phone}
                      </p>
                      <p className="mt-1 max-w-48 truncate text-xs text-slate-500">
                        {customer.email}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-slate-100 px-2.5 py-1.5 text-sm font-semibold text-slate-700">
                        {customer.orders}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {formatCurrency(customer.totalSpent)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(customer.lastOrder)}
                    </td>

                    <td className="px-5 py-4">
                      <CustomerStatus status={customer.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          title="View customer"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Eye size={17} />
                        </button>

                        <a
                          href={`https://wa.me/91${customer.phone}`}
                          target="_blank"
                          rel="noreferrer"
                          title="Message on WhatsApp"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                        >
                          <MessageCircle size={17} />
                        </a>

                        <button
                          onClick={() => deleteCustomer(customer)}
                          title="Delete customer"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {visibleCustomers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Users size={25} />
                      </div>
                      <h3 className="mt-4 font-semibold text-slate-900">
                        No customers found
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Try a different search or reset your filters.
                      </p>
                      <button
                        onClick={() => {
                          setSearch("");
                          setStatusFilter("All");
                          setPage(1);
                        }}
                        className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        Clear search and filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredCustomers.length === 0
                  ? 0
                  : (currentPage - 1) * pageSize + 1}
                {"–"}
                {Math.min(currentPage * pageSize, filteredCustomers.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {filteredCustomers.length}
              </span>{" "}
              customers
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setPage((previous) => Math.max(1, previous - 1))}
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <span className="px-2 text-sm font-medium text-slate-600">
                {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((previous) => Math.min(totalPages, previous + 1))
                }
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <p className="text-center text-xs text-slate-400">
          Customer information shown here is sample data for UI development.
        </p>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <CustomerDetailsModal
          formatDate={formatDate}
          formatCurrency={formatCurrency}
          customer={selectedCustomer}
          getInitials={getInitials}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </div>
  );
}
