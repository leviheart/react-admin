import { func } from "prop-types";
import service from "../utils/request";

/**
 * 登录接口
 */
export function DepartmentAddApi(data) {
    return service.request({
        url: "/department/add/",
        method: "post",
        data,
    })
}

