import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Store } from "lucide-react";
import { useNavigate } from "react-router";
import { verifyAndGenarateToken } from "../apis/allTenantapi";
import { useDispatch } from "react-redux";
import { setUserNTenant } from "../../auth/state/AuthSlice";

const AllTenants = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let verifyMutation = useMutation({
    mutationFn: verifyAndGenarateToken,
    onSuccess: (data) => {
      dispatch(setUserNTenant(data));
    },
  });
  const handleSelectShop = (shop, shopDomain) => {
    // Call your select-tenant API here before navigating
    navigate(`/${shopDomain}/dashboard`);

    verifyMutation.mutate(shop);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {data?.map((shop) => (
        <button
          key={shop.id}
          onClick={() => handleSelectShop(shop, shop.tenant.shopDomain)}
          className="group flex w-full items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-indigo-400 hover:shadow-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-400 group-hover:text-white">
            <Store size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="font-semibold text-slate-900">
              {shop.tenant.shopName}
            </h2>
            <p className="mt-1 truncate text-sm text-slate-500">
              {shop.tenant.officialEmail}
            </p>
          </div>
          <div className="text-xs text-gray-400 font-bold">
            {new Date(shop.tenant.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
          <ArrowRight
            size={20}
            className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
          />
        </button>
      ))}
    </div>
  );
};

export default AllTenants;
