import axios from "axios";
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_LOCAL_SERVER_URL,
    timeout: 600000,
});

axiosInstance.interceptors.request.use(
    async (reqConfig) => {
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGJlM2MwYWQxYWJiMzQzYzI5MjYxMzYiLCJhcHBUeXBlIjoiU3VwZXIgQWRtaW4iLCJyb2xlSWQiOiI2MzIwNzdiZGNmZmQ3YzIxZWJlN2M4ZjAiLCJzZXNzaW9uSWQiOiJhbHBoYW51bWVyaWMiLCJ1c2VyTmFtZSI6Ikd1ZXN0IHVzZXIgIiwiaWF0IjoxNjkyNjk2NTcxLCJleHAiOjE3MjQyMzI1NzF9.O72ZRE7Aop33DgbXTyNjuEUsPf0nii6oxz7bc1mQr08';
        let headers = {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": `application/json`,
            clientId: '2508190884',
            secret: '9b395a79-b30a-4f3a-abb4-22b76d62ee07',
        };
        // if (accessToken) {
        //     headers = 
        // }
        // else {
        //     headers = {
        //         "Content-Type": "application/json",
        //     };
        // }
        return { ...reqConfig, headers };
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
            window.location.href = '/splash';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;