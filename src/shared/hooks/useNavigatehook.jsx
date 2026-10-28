import { useNavigate } from "react-router";

export const useNavigatehook = () => {
  let navigate = useNavigate();
  let customerfn = () => {
    navigate("/home/customers");
  };
  let dashboardfn = () => {
    navigate("/home");
  };
  let ordersfn = () => {
    navigate("/home/orders");
  };
  let productsfn = () => {
    navigate("/home/products");
  };
  let reportfn = () => {
    navigate("/home/reports");
  };
  let whatappfn = () => {
    navigate("/home/whatapps");
  };
  let settingfn = () => {
    navigate("/home/setting");
  };
  return {
    customerfn,
    dashboardfn,
    ordersfn,
    productsfn,
    reportfn,
    whatappfn,
    settingfn,
  };
};
