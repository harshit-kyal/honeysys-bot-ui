import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "",
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