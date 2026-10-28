
import { Bell, Save } from "lucide-react";

const notificationOptions = [
  {
    key: "newOrders",
    title: "New orders",
    description: "Get notified when a customer places an order.",
  },
  {
    key: "lowStock",
    title: "Low stock alerts",
    description: "Get notified when a product's stock is running low.",
  },
  {
    key: "orderUpdates",
    title: "Order status updates",
    description: "Get notified when an order status changes.",
  },
  {
    key: "marketing",
    title: "Product and platform updates",
    description: "Receive optional announcements and product updates.",
  },
];

export default function NotificationSettings({
  notifications,
  setNotifications,
  onSave,
}) {
  const toggleNotification = (key) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
          <Bell size={22} />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">Notifications</h2>
          <p className="text-sm text-gray-500">
            Choose the notifications you want to receive.
          </p>
        </div>
      </div>

      <form onSubmit={onSave}>
        <div className="divide-y divide-gray-100">
          {notificationOptions.map((option) => (
            <label
              key={option.key}
              className="flex cursor-pointer items-start justify-between gap-4 py-4"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {option.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {option.description}
                </p>
              </div>

              <input
                type="checkbox"
                checked={notifications[option.key]}
                onChange={() => toggleNotification(option.key)}
                className="mt-1 h-4 w-4 shrink-0 accent-gray-900"
              />
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
        >
          <Save size={17} />
          Save preferences
        </button>
      </form>
    </section>
  );
}
