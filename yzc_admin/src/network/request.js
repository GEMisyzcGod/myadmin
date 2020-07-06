import axios from 'axios'

export const request = (config) => {
    const example = axios.create({
        // 配置公共域
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        // 设置时长
        timeout:6666
    })
    // 响应拦截
    example.interceptors.response.use( response => {
        return response.data
    })
    // 请求拦截
    example.interceptors.request.use( config => {
        // 给所有的请求头加token
        config.headers.Authorization = sessionStorage.getItem("token")
        return config
    })

    return example(config)
}