import { axiosInstance } from "../../../app/config/axiosInstance";

export const getStatsApi = async () => {
  let { data } = await axiosInstance.get("/dashboard/get-stats");
  return data.data;
};
