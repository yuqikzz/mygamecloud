import axios from "axios";
import router from "@/router";

const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    method: "get", // default
    withCredentials: true,
    timeout: 15000, // 请求超时时间
});
// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers.token = window.localStorage.getItem("token");
        return config;
    },
    (error) => {
        //做一些有请求错误的事情
        return Promise.reject(error);
    }
);
// response 拦截器
service.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //使用响应错误返回
        if (error.response.status === 401) {
            router.push("/").then(() => {});
        } else {
            return Promise.reject(error.response.data);
        }
    }
);

export default service;
