import { environment } from "../environments/environment";
import axiosInstance from "../lib/axiosInstance";
import { encrypt } from "../services/aes";

export const getStoreDataApi = async () => {
  try {
    const response: any = await axiosInstance.post("/pincode/stores", {
      pincode: "560038",
      type: "pincode",
    });
    return { data: response.data };
  } catch (error: any) {
    if (error && error.response) {
      return { data: error.response.data };
    }
    throw error; // Rethrow the error so that the caller can handle it
  }
};

export const CategoriesDataApi = async () => {
  try {
    const response: any = await axiosInstance.post(
      "/stores/640b2b141a40ab0d18252a4d/addons/web/categories?filterType=ProductsCounts",
      {
        storeId: "640b2b141a40ab0d18252a4d",
        businessId: "64a3a003bd66292caa9e58e0",
      }
    );
    return { data: response.data };
  } catch (error: any) {
    if (error && error.response) {
      return { data: error.response.data };
    }
    throw error; // Rethrow the error so that the caller can handle it
  }
};
export const getChatApi = async ({
  newData,
  botType,
}: {
  newData: any;
  botType: string;
}) => {
  if (!botType) {
    botType = encrypt("Sales+CRM-Bot");
  }
  newData.timestamp = new Date();
  if (!newData.attachment) {
    newData.attachment = [];
  }

  try {
    const response: any = await axiosInstance.post(
      `${environment.directlineURL}/directline/polyline/getMessages/?botType=${botType}`,
      newData
    );
    return { data: response.data };
  } catch (error: any) {
    if (error && error.response) {
      return { data: error.response.data };
    }
    throw error;
  }
};
