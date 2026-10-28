import { Bell, Plus, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.Auth);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 text-slate-900 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {/* Greeting */}
      <div className="w-1/2 min-w-0">
        <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 md:text-base lg:text-xl">
          Hey {user?.sellerName}
        </h1>

        <p className="text-xs text-slate-500 dark:text-slate-400 lg:text-sm">
          Here's your store performance today
        </p>
      </div>

      {/* Actions */}
      <div className="flex w-1/2 items-center justify-end gap-3 md:gap-4">
        {/* Search */}
        {/* <div className="hidden w-72 items-center gap-2 rounded-xl border border-transparent bg-slate-100 px-4 py-2 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 dark:bg-slate-800 dark:focus-within:border-emerald-500 md:flex">
          <Search
            size={18}
            className="shrink-0 text-slate-500 dark:text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
          />
        </div> */}

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl bg-slate-100 p-3 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Add Product */}
        <button
          type="button"
          onClick={() => navigate("/home/createCatalog")}
          className="accent-background flex items-center gap-2 rounded-xl px-4 py-3 font-semibold shadow-md transition hover:shadow-lg sm:px-5"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Product</span>
        </button>

        {/* Profile */}
        <img
          src="https://i.pravatar.cc/100?img=12"
          alt="Profile"
          className="h-10 w-10 cursor-pointer rounded-full border-2 border-slate-200 object-cover transition hover:scale-105 dark:border-slate-700 sm:h-11 sm:w-11"
        />
      </div>
    </header>
  );
};

export default Navbar;
