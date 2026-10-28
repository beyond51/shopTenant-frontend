import { useParams } from "react-router";
import { Store, ArrowRight } from "lucide-react";
import { AxiosInstance } from "../app/config/ApiInstance";
import { useQuery } from "@tanstack/react-query";
import AllTenants from "../features/usertenants/components/allTenants";
import { allTenantsApis } from "../features/usertenants/apis/allTenantapi";
import LoadingState from "../shared/components/LoadingState";

const ShopPage = () => {
  const { userId } = useParams();

  let { data, isLoading } = useQuery({
    queryKey: ["alltenants", userId],
    queryFn: () => allTenantsApis(userId),
    staleTime: 5000,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
            <Store size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Select your shop
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Choose the shop you want to continue with.
          </p>
        </div>

        <div className="space-y-3">
          {isLoading ? <LoadingState /> : <AllTenants data={data} />}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
