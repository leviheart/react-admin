import { func } from "prop-types";
import service from "../utils/request";

/**
 * 获取列表
 */
export function TableList(params) {
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data,
    })
}

/**
 * 删除列表
 */
export function TableDelete(params) {
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data,
    })
}

/**
 * 公用API
 */
export function requestData(params) {
    return service.request({
        url: params.url,
        method: params.method || "post",
        data: params.data,
    })
}
