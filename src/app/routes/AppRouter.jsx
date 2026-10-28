import { createBrowserRouter, RouterProvider } from "react-router";
import PublicLayout from "../../pages/LandingPage";
import AuthLayout from "../../layouts/AuthLayout";
import Login from "../../features/auth/components/login";
import Register from "../../features/auth/components/Register";
import ShopPage from "../../pages/ShopPage";
import DashboardLayout from "../../layouts/DashboardLayout";
import { AxiosInstance } from "../config/ApiInstance";
import { useDispatch } from "react-redux";
import {
  removeUserNTenant,
  setUserNTenant,
} from "../../features/auth/state/AuthSlice";
import ProtectedAuth from "./ProtectedAuth";
import { useEffect } from "react";
import ProtectedDashboard from "./ProtectedDashboard";
import Hero from "../../screens/Hero";
import HeroSection from "../../screens/Hero";
import OrdersPage from "../../screens/OrdersPage";
import ProductsPage from "../../screens/ProductsPage";
import CustomersPage from "../../screens/CustomerPage";
import ReportsPage from "../../screens/ReportPage";
import WhatsAppPage from "../../screens/WhatsAppPage";
import SettingsPage from "../../screens/SettingsPage";

const AppRouter = () => {
  let dispatch = useDispatch();
  const meApi = async () => {
    try {
      let { data } = await AxiosInstance.get("/auth/me");
      dispatch(setUserNTenant(data.data));
    } catch (error) {
      dispatch(removeUserNTenant());
    }
  };

  useEffect(() => {
    meApi();
  }, []);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedAuth />,
      children: [
        {
          path: "",
          element: <PublicLayout />,
        },
        {
          path: "auth",
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
            {
              path: "shops/:userId",
              element: <ShopPage />,
            },
          ],
        },
      ],
    },

    {
      path: "",
      element: <ProtectedDashboard />,
      children: [
        {
          path: "/:shopdomain",
          element: <DashboardLayout />,
          children: [
            {
              path: "dashboard",
              element: <HeroSection />,
            },
            {
              path: "orders",
              element: <OrdersPage />,
            },
            {
              path: "products",
              element: <ProductsPage />,
            },
            {
              path: "customers",
              element: <CustomersPage />,
            },
            {
              path: "reports",
              element: <ReportsPage />,
            },
            {
              path: "whatsapp",
              element: <WhatsAppPage />,
            },
            {
              path: "setting",
              element: <SettingsPage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
