import {
  X,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  CalendarDays,
  Copy,
  MessageCircle,
  IndianRupee,
} from "lucide-react";
import CustomerStatus from "./CustomerStatus";

function CustomerDetailsModal({
  customer,
  getInitials,
  onClose,
  formatCurrency,
  formatDate,
}) {
  if (!customer) return null;

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(customer.phone);
      window.alert("Phone number copied!");
    } catch {
      window.alert("Could not copy the phone number.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="my-auto flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Modal header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Customer Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Customer profile and purchase history
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal content */}
        <div className="no-scrollbar min-h-0 flex-1 space-y-6 overflow-y-auto p-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700">
              {getInitials(customer.name)}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-slate-900">
                {customer.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Customer ID: {customer.id}
              </p>
              <div className="mt-2">
                <CustomerStatus status={customer.status} />
              </div>
            </div>

            <a
              href={`https://wa.me/91${customer.phone}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-slate-900">
              Contact Information
            </h4>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 p-4">
                <Phone size={18} className="mt-0.5 shrink-0 text-slate-400" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Phone number</p>
                  <p className="mt-1 break-all text-sm font-medium text-slate-800">
                    {customer.phone}
                  </p>
                  <button
                    onClick={copyPhone}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    <Copy size={12} />
                    Copy number
                  </button>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 p-4">
                <Mail size={18} className="mt-0.5 shrink-0 text-slate-400" />
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Email address</p>
                  <p className="mt-1 break-all text-sm font-medium text-slate-800">
                    {customer.email}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 p-4 sm:col-span-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-slate-400" />
                <div>
                  <p className="text-xs text-slate-500">Address</p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {customer.address ||
                      customer.city ||
                      "Address not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-slate-900">
              Purchase Summary
            </h4>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-indigo-50 p-4">
                <ShoppingBag size={19} className="text-indigo-600" />
                <p className="mt-3 text-xl font-bold text-slate-900">
                  {customer.orders}
                </p>
                <p className="mt-1 text-xs text-slate-500">Total orders</p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-4">
                <IndianRupee size={19} className="text-emerald-600" />
                <p className="mt-3 text-xl font-bold text-slate-900">
                  {formatCurrency(customer.totalSpent)}
                </p>
                <p className="mt-1 text-xs text-slate-500">Total spent</p>
              </div>

              <div className="col-span-2 rounded-xl bg-amber-50 p-4 sm:col-span-1">
                <CalendarDays size={19} className="text-amber-600" />
                <p className="mt-3 text-sm font-bold text-slate-900">
                  {formatDate(customer.joinedAt)}
                </p>
                <p className="mt-1 text-xs text-slate-500">Customer since</p>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-semibold text-slate-900">Recent Orders</h4>
              <span className="text-xs text-slate-500">
                {customer.orderHistory.length} shown
              </span>
            </div>

            {customer.orderHistory.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center">
                <ShoppingBag className="mx-auto text-slate-300" size={28} />
                <p className="mt-2 text-sm font-medium text-slate-600">
                  No orders yet
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  This customer has not placed an order.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                {customer.orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 last:border-b-0"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {order.id}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(order.date)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">
                        {formatCurrency(order.amount)}
                      </p>
                      <span className="text-xs font-medium text-emerald-600">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex shrink-0 justify-end border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default CustomerDetailsModal;
