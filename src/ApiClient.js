import axios from "axios";
import { API } from "../src/config/config";
alert(API);
const ApiClient = axios.create({
    baseURL: API,
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiClient.interceptors.request.use(
    (config) => {
        const stored = localStorage.getItem("token");
        if (stored) {
            config.headers = config.headers || {};
            config.headers["Authorization"] =   `Bearer ${ stored }`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default ApiClient;

