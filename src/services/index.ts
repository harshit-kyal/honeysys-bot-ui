import { environment } from "../environments/environment";
import axiosInstance from "../lib/axiosInstance";

export const fetchBot = async (botType: string) => {
  return await axiosInstance.get(
    `${environment.apiURLAzure_new}/bot/fetchOneBotInfo?botType=${botType}`
  );
};

export const getConversationId = async (botType: string) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "en-US",
    "X-SAP-PVL": "en-US",
    // Authorization: `Bearer ${token}`,
  };
  return await axiosInstance.post(
    `${process.env.REACT_APP_DIRECTLINE_URL}/polyline/initConversation/?botType=${botType}`,
    {},
    { headers }
  );
};
// `${process.env.REACT_APP_DIRECTLINE_URL}/polyline/initConversation/?botType=${botType}`
