import {request} from "./request"
// 请求登录
export const loginRequest = ({username,password}) => {
    return request({
        url:'login',
        method:'post',
        data:{
            username,
            password
        }
    })
}
// 请求左侧导航权限
export const userRequest = () => request({
    url:'menus',
    method:'get'
})