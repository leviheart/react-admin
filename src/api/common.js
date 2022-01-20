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