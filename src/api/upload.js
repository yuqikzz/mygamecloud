import request from './request'


export function getAllResourceTypes() {
    return request({
        url: "/api/query/getAllResourceTypes",
        method: "get",

    });
}


export function addData(data) {
    return request({
        url: "/api/resource/addRes",
        method: "post",
        data
    });
}


export function getAll() {
    return request({
        url: "/api/resource/getAll",
        method: "get",
    });
}