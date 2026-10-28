import { AxiosInstance } from "../../../app/config/ApiInstance";

export const loginApi = async (data) => {
  return await AxiosInstance.post("/auth/login", data);
};
