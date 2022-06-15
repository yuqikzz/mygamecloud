import request from './request'


export function getUserInfo() {
    return request({
        url: "/api/users/getUserInfo",
        method: "get",
    });
}


export function findU() {
    return request({
        url: "/api/resource/findU",
        method: "get"
    });
}

export function uDelR(id) {
    return request({
        url: `/api/resource/delR/${id}`,
        method: "delete",
    });
}


