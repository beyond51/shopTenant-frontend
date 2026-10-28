import { useMemo, useState } from "react";
import { Package } from "lucide-react";
import { formatCurrency } from "../utils/reportUtils";

const BAR_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#a855f7"];

export default function TopSellingProducts({ products }) {
  const [sortBy, setSortBy] = useState("revenue");

  const sortedProducts = useMemo(
    () =>
      [...products].sort((a, b) =>
        sortBy === "sold" ? b.sold - a.sold : b.revenue - a.revenue,
      ),
    [products, sortBy],
  );

  const maxValue = Math.max(
    1,
    ...sortedProducts.map((product) =>
      sortBy === "sold" ? product.sold : product.revenue,
    ),
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-bold text-slate-900">Top-Selling Products</h2>
          <p className="mt-1 text-sm text-slate-500">
            Best performers in your catalogue
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort products"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none focus:border-indigo-400"
        >
          <option value="revenue">By revenue</option>
          <option value="sold">By units sold</option>
        </select>
      </div>

      <div className="space-y-5">
        {sortedProducts.map((product, index) => {
          const value = sortBy === "sold" ? product.sold : product.revenue;
          const percentage = (value / maxValue) * 100;

          return (
            <div key={product.id}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <Package size={19} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {product.sold} units sold · {product.category}
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-sm font-bold text-slate-900">
                  {sortBy === "sold"
                    ? `${product.sold} units`
                    : formatCurrency(product.revenue)}
                </p>
              </div>

              <div className="ml-[52px] h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: BAR_COLORS[index % BAR_COLORS.length],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
