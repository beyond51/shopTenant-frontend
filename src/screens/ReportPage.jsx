import { useMemo, useState } from "react";
import { IndianRupee, ShoppingBag, CreditCard, Users } from "lucide-react";

import ReportHeader from "../features/reports/components/ReportHeader";
import ReportStatCard from "../features/reports/components/ReportStatCard";
import SalesOverview from "../features/reports/components/SalesOverview";
import OrderBreakdown from "../features/reports/components/OrderBreakdown";
import TopSellingProducts from "../features/reports/components/TopSellingProducts";
import LowStockAlert from "../features/reports/components/LowStockAlert";

import {
  salesData,
  products,
  orderBreakdown,
  customerCount,
} from "../features/reports/data/ReportData";

import {
  formatCurrency,
  downloadSalesCsv,
} from "../features/reports/utils/ReportUtils";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("7");
  const [reportType, setReportType] = useState("revenue");

  const filteredSales = useMemo(() => {
    return salesData.slice(-Number(dateRange));
  }, [dateRange]);

  const totals = useMemo(() => {
    const revenue = filteredSales.reduce((sum, item) => sum + item.revenue, 0);

    const orders = filteredSales.reduce((sum, item) => sum + item.orders, 0);

    return {
      revenue,
      orders,
      averageOrderValue: orders > 0 ? revenue / orders : 0,
    };
  }, [filteredSales]);

  const handleExport = () => {
    downloadSalesCsv(filteredSales);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* Page Header */}
        <ReportHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onExport={handleExport}
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <ReportStatCard
            title="Total Revenue"
            value={formatCurrency(totals.revenue)}
            subtitle="For selected period"
            icon={IndianRupee}
            iconClass="bg-indigo-50 text-indigo-600"
            trend="+12.8%"
          />

          <ReportStatCard
            title="Total Orders"
            value={totals.orders.toLocaleString("en-IN")}
            subtitle="Orders in selected period"
            icon={ShoppingBag}
            iconClass="bg-emerald-50 text-emerald-600"
            trend="+8.2%"
          />

          <ReportStatCard
            title="Average Order Value"
            value={formatCurrency(totals.averageOrderValue)}
            subtitle="Revenue per order"
            icon={CreditCard}
            iconClass="bg-amber-50 text-amber-600"
            trend="+4.5%"
          />

          <ReportStatCard
            title="Customers"
            value={customerCount.toLocaleString("en-IN")}
            subtitle="Total registered customers"
            icon={Users}
            iconClass="bg-sky-50 text-sky-600"
            trend="+16 this month"
          />
        </div>

        {/* Sales Chart */}
        <SalesOverview
          sales={filteredSales}
          reportType={reportType}
          onReportTypeChange={setReportType}
          totals={totals}
        />

        {/* Order Status and Product Performance */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="xl:col-span-2">
            <OrderBreakdown data={orderBreakdown} />
          </div>

          <div className="xl:col-span-3">
            <TopSellingProducts products={products} />
          </div>
        </div>

        {/* Inventory Alert */}
        <LowStockAlert products={products} threshold={10} />

        <p className="text-center text-xs text-slate-400">
          Report figures are sample data for UI development.
        </p>
      </div>
    </div>
  );
}
