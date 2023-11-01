import axios from "axios";
import { environment } from "../environments/environment";
import axiosInstance from "../lib/axiosInstance";
import { encrypt } from "../services/aes";
import { setTheme } from "../slices/rootSlice";

export const botApi = async (body: any) => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQyM2ZkMGMzN2NlMTVjNWJhNTFhN2QiLCJhcHBUeXBlIjoid2ViIiwicm9sZUlkIjoiNjMyMDc3YmRjZmZkN2MyMWViZTdjOGYwIiwic2Vzc2lvbklkIjoiYWxwaGFudW1lcmljIiwidXNlck5hbWUiOiIgIiwiaWF0IjoxNjk4ODQwNTYxLCJleHAiOjE3MzAzNzY1NjF9.5fTE-u1CpIkvLdNxkOei44-Hwhdp2RXHat3aRUxuqPQ";
  const token = localStorage.getItem("token");
  try {
    const response: any = await axiosInstance.post("", body, {
      headers: {
        Authorization: `Bearer ${token ? token : accessToken}`,
        clientId: 2508190884,
        secret: "9b395a79-b30a-4f3a-abb4-22b76d62ee07",
      },
    });
    return { data: response.data };
  } catch (error: any) {
    if (error && error.response) {
      return { data: error.response.data };
    }
    throw error; // Rethrow the error so that the caller can handle it
  }
};
export const getTheme = async () => {
  try {
    const response = await axios
      .post(`${process.env.REACT_APP_GET_THEME_URL}`, {
        clientName: "honeySys",
      })
      .then((response) => {
        return response?.data?.data;
      })
      .catch((error) => {
        if (error && error?.response) {
        }
      });
    return response;
  } catch (error: any) {
    if (error && error.response) {
      return { data: error.response.data };
    }
    throw error; // Rethrow the error so that the caller can handle it
  }
};

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
  const token = localStorage.getItem("accessToken");
  try {
    const response: any = await axiosInstance.post(
      `${process.env.REACT_APP_DIRECTLINE_URL}/polyline/getMessages/?botType=${botType}`,
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
// `${process.env.REACT_APP_DIRECTLINE_URL}/polyline/getMessages/?botType=${botType}`
