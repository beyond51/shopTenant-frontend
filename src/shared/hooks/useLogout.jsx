import { useDispatch } from "react-redux";
import { AxiosInstance } from "../../app/config/ApiInstance";
import { removeUserNTenant } from "../../features/auth/state/AuthSlice";

export const useLogout = () => {
  let dispatch = useDispatch();
  let logoutFn = async () => {
    await AxiosInstance.get("/auth/logout");
    dispatch(removeUserNTenant());
  };
  return { logoutFn };
};
