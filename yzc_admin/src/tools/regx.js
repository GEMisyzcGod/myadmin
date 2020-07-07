export const regsMobile = (rule,value,callback) => {
    const reg = /^1(3([1-35-9]\\d|4[1-8])|4[14-9]\\d|5([0-25689]\\d|7[1-79])|66\\d|7[2-35-8]\\d|8[2-9]\\d|9[89]\\d)\\d{7}$/
    if(!reg.test(value)) return callback(new Error("请输入合法的手机号"))
    callback()
}