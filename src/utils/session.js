const tokenAdmin = "adminToken";
export function setToken(value) {
    //下面功能是在浏览器的session里设置key:value
    sessionStorage.setItem(tokenAdmin, value)
}

export function getToken(value) {
    return sessionStorage.getItem(tokenAdmin);
}