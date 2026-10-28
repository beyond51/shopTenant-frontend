import { AxiosInstance } from "../../../app/config/ApiInstance";

export const registerApi = async (data) => {
  return await AxiosInstance.post("/tenant/registertenant", data);
};
