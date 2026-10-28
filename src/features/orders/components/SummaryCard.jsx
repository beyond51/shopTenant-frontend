import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Eye,
} from "lucide-react";

export default function SummaryCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className={`mb-4 inline-flex rounded-xl p-3 ${color}`}>
        <Icon size={21} />
      </div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
