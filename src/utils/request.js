import axios from "axios";
import { getToken, getUsername } from "./cookies";
//ANTD
import { message } from "antd";
//第一步，创建实例
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 5000,
});

//第二步，请求拦截(请求头)
service.interceptors.request.use(function (config) {
    //在发送请求之前做些什么
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config;
}, function (error) {
    //对请求错误做些什么
    return Promise.reject(error);
});

//第三步，响应拦截(响应头)
service.interceptors.response.use(function (response) {
    //对响应数据做点什么
    const data = response.data;
    if (data.resCode !== 0) { //resCode不成功
        message.info(data.message);//全局错误拦截提示
        return Promise.reject(response);
    } else {
        return response;
    }

}, function (error) {//http状态不为200
    //对响应错误做点什么
    const data = error.request;
    return Promise.reject(error);
});

export default service;