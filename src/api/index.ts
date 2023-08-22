import axiosInstance from "../lib/axiosInstance";

export const getStoreDataApi = () => {
  axiosInstance
    .post("/pincode/stores", {
      pincode: "560038",
      type: "pincode",
    })
    .then((response: any) => {
      console.log(response);
      return { data: response };
    })
    .catch((error: any) => {
      console.log('first')
      if (error && error.response) {
        return { data: error.response.data };
      }
    });
};
