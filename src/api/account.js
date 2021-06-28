import service from "../utils/request";

/**
 * 登录接口
 */
export function Login(data) {
    return service.request({
        url: "/login/",
        method: "post",
        data //请求类型为post时
        // params:data //请求数据类型为get时
    })
}