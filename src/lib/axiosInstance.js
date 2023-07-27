import axios from "axios";
import config from './config';
const axiosInstance = axios.create({
    baseURL: config.getHost(),
    timeout: 600000,
});

axiosInstance.interceptors.request.use(
    async (reqConfig) => {
        const accessToken = localStorage.getItem("accessToken");
        const id = localStorage.getItem("id");
        let headers;
        if (accessToken) {
            headers = {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": `application/json`,
                id: id
            };
        }
        else {
            headers = {
                "Content-Type": "application/json",
            };
        }
        return { headers, ...reqConfig };
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Return the response if it's successful
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.clear()
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;