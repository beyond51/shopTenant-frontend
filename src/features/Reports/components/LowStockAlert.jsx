import { ArrowUpRight, Package } from "lucide-react";

export default function LowStockAlert({ products, threshold = 10 }) {
  const lowStockProducts = products.filter(
    (product) => product.stock < threshold,
  );

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
          <Package size={21} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">Low-stock products</h3>
          <p className="mt-1 text-sm text-slate-600">
            {lowStockProducts.length} products have fewer than {threshold} units
            remaining.
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          if (lowStockProducts.length === 0) {
            window.alert("No low-stock products.");
            return;
          }

          window.alert(
            lowStockProducts
              .map((product) => `${product.name}: ${product.stock} left`)
              .join("\n"),
          );
        }}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-sm font-semibold text-amber-800 transition hover:bg-amber-100"
      >
        View products
        <ArrowUpRight size={16} />
      </button>
    </div>
  );
}
