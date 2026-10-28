import { AxiosInstance } from "../../../app/config/ApiInstance";

export const allTenantsApis = async (userId) => {
  let { data } = await AxiosInstance.post("/userTenant/getallTenants", userId);
  return data.data;
};

export const verifyAndGenarateToken = async (shop) => {
  let userId = shop.userId;
  let tenantId = shop.tenantId;

  let { data } = await AxiosInstance.post("/userTenant/verifytenant", {
    userId,
    tenantId,
  });
  return data.data;
};
