import { environment } from "../environments/environment";
import axiosInstance from "../lib/axiosInstance";
import { encrypt } from "./aes";

export const fetchBot = async (botType: string) => {
  return await axiosInstance.get(
    `${environment.apiURLAzure_new}/bot/fetchOneBotInfo?botType=${botType}`
  );
};

export const getConversationId = async (botType: string, token: string) => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "en-US",
    "X-SAP-PVL": "en-US",
    Authorization: `Bearer ${token}`,
  };
  return await axiosInstance.post(
    `${environment.directlineURL}/directline/polyline/initConversation/?botType=${botType}`,
    {},
    { headers }
  );
};

export const getChat = async (newData: any, botType: string) => {
  console.log(newData);
  // let botType = getQueryVariable("botType");
  if (!botType) {
    botType = encrypt("Sales+CRM-Bot");
  }
  // let header = {
  //   "Access-Control-Allow-Origin": "*",
  // };
  // var authToken = localStorage.getItem("authToken");
  // if (authToken) {
  //   newData.authToken = authToken;
  // }
  newData.timestamp = new Date();
  if (!newData.attachment) {
    newData.attachment = [];
  }

  return await axiosInstance.post(
    `${environment.directlineURL}/directline/polyline/initConversation/?botType=${botType}`,
    newData
  );
};
