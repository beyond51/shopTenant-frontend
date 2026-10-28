export default function StatusBadge({ product }) {
  const status = product.stock === 0 ? "Out of stock" : product.status;

  const styles =
    status === "Out of stock"
      ? "bg-red-50 text-red-600"
      : "bg-green-50 text-green-700";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
}
