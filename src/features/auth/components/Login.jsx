import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../apis/Login.Api";
import { useDispatch } from "react-redux";
import { setUser } from "../state/AuthSlice";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  let dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: ({ data }) => {
      // console.log("Login successful:", data);
      dispatch(setUser(data.data));
      navigate(`/auth/shops/${data.data.id}`);
    },
    onError: (error) => {
      console.log("Login failed:", error);
    },
  });
  const submitfn = (data) => {
    loginMutation.mutate(data);
  };
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {" "}
      <div className="w-full max-w-md">
        {" "}
        {/* Header */}{" "}
        <div className="text-center mb-8">
          {" "}
          <h1 className="text-3xl font-bold text-white"> Welcome Back </h1>{" "}
          <p className="text-slate-400 mt-2">
            {" "}
            Login to manage your shop{" "}
          </p>{" "}
        </div>{" "}
        {/* Login Card */}{" "}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
          {" "}
          {/* API Error */}{" "}
          {loginMutation.isError && (
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {" "}
              {loginMutation.error?.response?.data?.message ||
                "Invalid email or password"}{" "}
            </div>
          )}{" "}
          <form onSubmit={handleSubmit(submitfn)}>
            {" "}
            {/* Email */}{" "}
            <div className="mb-5">
              {" "}
              <label
                htmlFor="sellerEmail"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                {" "}
                Email{" "}
              </label>{" "}
              <input
                {...register("sellerEmail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
                id="sellerEmail"
                type="sellerEmail"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />{" "}
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {" "}
                  {errors.email.message}{" "}
                </p>
              )}{" "}
            </div>{" "}
            {/* Password */}{" "}
            <div className="mb-6">
              {" "}
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                {" "}
                Password{" "}
              </label>{" "}
              <div className="relative">
                {" "}
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 pr-20 text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />{" "}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                >
                  {" "}
                  {showPassword ? "Hide" : "Show"}{" "}
                </button>{" "}
              </div>{" "}
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">
                  {" "}
                  {errors.password.message}{" "}
                </p>
              )}{" "}
            </div>{" "}
            {/* Forgot Password */}{" "}
            <div className="flex justify-end mb-6">
              {" "}
              <Link
                to="/auth/forgot-password"
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                {" "}
                Forgot password?{" "}
              </Link>{" "}
            </div>{" "}
            {/* Submit */}{" "}
            <button
              type="submit"
              disabled={isSubmitting || loginMutation.isPending}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {" "}
              {loginMutation.isPending ? "Logging in..." : "Login"}{" "}
            </button>{" "}
          </form>{" "}
          {/* Register */}{" "}
          <p className="text-center text-sm text-slate-400 mt-6">
            {" "}
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              {" "}
              Create an account{" "}
            </Link>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Login;
