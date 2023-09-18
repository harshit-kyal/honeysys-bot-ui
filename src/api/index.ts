import axios from "axios";
import { environment } from "../environments/environment";
import axiosInstance from "../lib/axiosInstance";
import { encrypt } from "../services/aes";

export const botApi = async (body: any) => {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGJlM2MwYWQxYWJiMzQzYzI5MjYxMzYiLCJhcHBUeXBlIjoiU3VwZXIgQWRtaW4iLCJyb2xlSWQiOiI2MzIwNzdiZGNmZmQ3YzIxZWJlN2M4ZjAiLCJzZXNzaW9uSWQiOiJhbHBoYW51bWVyaWMiLCJ1c2VyTmFtZSI6Ikd1ZXN0IHVzZXIgIiwiaWF0IjoxNjk0MDgxMzEyLCJleHAiOjE3MjU2MTczMTJ9.K_9RKs0sZPnnVH2NTHxyg2AXYh2V8rehJ42tlpkx_Vc";
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

const getTheme = () => {
  try {
    axios
      .post("botcyadminpanel.onrender.com/getTheme", {
        clientName: "honeySys",
      })
      .then((response) => {
        console.log(response);
      });
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
