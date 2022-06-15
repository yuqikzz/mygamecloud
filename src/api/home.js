import request from './request'



export function getCarousel() {
    return request({
        url: "/api/carousel/getCarousel",
        method: "get",

    });
}
