import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

import { useLogout } from "../hooks/useLogout";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user, tenant } = useSelector((store) => store.Auth);
  const { logoutFn } = useLogout();

  const sidebar = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      to: `/${tenant.shopDomain}/dashboard`,
    },
    {
      name: "Orders",
      icon: ShoppingCart,
      to: `/${tenant.shopDomain}/orders`,
    },
    {
      name: "Products",
      icon: Package,
      to: `/${tenant.shopDomain}/products`,
    },
    {
      name: "Customers",
      icon: Users,
      to: `/${tenant.shopDomain}/customers`,
    },
    {
      name: "Reports",
      icon: BarChart3,
      to: `/${tenant.shopDomain}/reports`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      to: `/${tenant.shopDomain}/whatsapp`,
    },
    {
      name: "Settings",
      icon: Settings,
      to: `/${tenant.shopDomain}/setting`,
    },
  ];

  return (
    <aside className="sticky top-0 max-h-screen overflow-y-auto border-r border-slate-200 bg-white p-5 text-slate-900 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 lg:block">
      {/* Store information */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl">
          <img
            src={user?.logo || "/public/96865aab89de2b16d3105a134ae4c68e.jpg"}
            alt={tenant?.shopName || "Store logo"}
            className="h-12 w-12 object-cover"
          />
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-base font-bold capitalize text-slate-900 dark:text-slate-100">
            {tenant?.shopName}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Seller</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {sidebar.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.to}
              key={item.name}
              className={({ isActive }) =>
                [
                  "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "accent-soft-background accent-text accent-border"
                    : "border-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                ].join(" ")
              }
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}

        {/* Logout */}
        <button
          type="button"
          onClick={logoutFn}
          className="flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 dark:text-slate-300 dark:hover:bg-red-950/40 dark:hover:text-red-400"
        >
          <LogOut size={18} className="shrink-0" />
          <span>Log out</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
