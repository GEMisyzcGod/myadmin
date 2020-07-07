export const regsMobile = (rule,value,callback) => {
    const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
    if(!reg.test(value)) return callback(new Error("请输入合法的手机号"))
    callback()
}