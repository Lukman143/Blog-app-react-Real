import axios from "axios";
import { getToken } from "../auth/authtoken";
import { error } from "jquery";


export const BASE_URL = 'http://localhost:9191/api/v1';

export const myAxios = axios.create({
    baseURL: BASE_URL
});

export const privateAxios = axios.create({
    baseURL: BASE_URL
});

privateAxios.interceptors.request.use(config => {
    const token = getToken();

    console.log("helper");
    console.log(token);
    console.log(config);

    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        
        config.headers.token = `${token}`;
    }

    return config;
}, error => Promise.reject(error));
