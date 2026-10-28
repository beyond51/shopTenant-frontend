import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../apis/register.Api";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  let registerMutaion = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const submitfn = (data) => {
    if (data.password === data.confirmPassword) {
      registerMutaion.mutate(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create your shop</h1>

          <p className="text-slate-400 mt-2">
            Create your shop and seller account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit(submitfn)}>
            {/* ================= SHOP INFORMATION ================= */}

            <div className="mb-8">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-white">
                  Shop Information
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Tell us about your shop
                </p>
              </div>

              <div className="space-y-5">
                {/* Shop Name */}
                <div>
                  <label
                    htmlFor="shopName"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Shop Name
                  </label>

                  <input
                    {...register("shopName", { required: true })}
                    id="shopName"
                    name="shopName"
                    type="text"
                    placeholder="Keshav Fashion"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                  {errors.shopName?.type === "required" && (
                    <div className=" px-4 py-3 text-xs text-red-400">
                      shopName is required
                    </div>
                  )}
                </div>

                {/* Official Email */}
                <div>
                  <label
                    htmlFor="officialEmail"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Shop Official Email
                  </label>

                  <input
                    {...register("officialEmail", { required: true })}
                    id="officialEmail"
                    name="officialEmail"
                    type="email"
                    placeholder="shop@example.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <p className="text-xs text-slate-500 mt-2">
                    This email identifies your shop.
                  </p>
                  {errors.officialEmail?.type === "required" && (
                    <div className=" px-4 py-3 text-xs text-red-400">
                      email is required
                    </div>
                  )}
                </div>

                {/* Shop Domain */}
                <div>
                  <label
                    htmlFor="shopDomain"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Shop Domain
                  </label>

                  <div className="flex rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                    <span className="flex items-center px-3 text-sm text-slate-500 bg-slate-800 border-r border-slate-700">
                      https://
                    </span>

                    <input
                      {...register("shopDomain", { required: true })}
                      id="shopDomain"
                      name="shopDomain"
                      type="text"
                      placeholder="keshavfashion"
                      className="flex-1 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-800 my-8" />

            {/* ================= SELLER ACCOUNT ================= */}

            <div className="mb-8">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-white">
                  Seller Account
                </h2>

                <p className="text-sm text-slate-400 mt-1">
                  Create the account you'll use to manage your shop
                </p>
              </div>

              <div className="space-y-5">
                {/* Seller Name */}
                <div>
                  <label
                    htmlFor="sellerName"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Your Name
                  </label>

                  <input
                    {...register("sellerName", { required: true })}
                    id="sellerName"
                    name="sellerName"
                    type="text"
                    placeholder="Keshav Lodhi"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                  {errors.sellerName?.type === "required" && (
                    <div className=" px-4 py-3 text-xs text-red-400">
                      Seller Name is required
                    </div>
                  )}
                </div>

                {/* Seller Email */}
                <div>
                  <label
                    htmlFor="sellerEmail"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Seller Email
                  </label>

                  <input
                    {...register("sellerEmail", { required: true })}
                    id="sellerEmail"
                    name="sellerEmail"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                  {errors.sellerEmail?.type === "required" && (
                    <div className=" px-4 py-3 text-xs text-red-400">
                      Seller Email is required
                    </div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Password
                  </label>

                  <input
                    {...register("password", { required: true, minLength: 8 })}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    minLength={8}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <p className="text-xs text-slate-500 mt-2">
                    Use at least 8 characters.
                  </p>
                  {errors.password?.type === "required" && (
                    <div className=" px-4 py-3 text-xs text-red-400">
                      password is required
                    </div>
                  )}
                  {errors.password?.type === "minLength" && (
                    <div className=" px-4 py-3 text-xs text-red-400">
                      password must be min 8 char.
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-slate-300 mb-2"
                  >
                    Confirm Password
                  </label>

                  <input
                    {...register("confirmPassword", {
                      required: true,
                      minLength: 8,
                    })}
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              register
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
