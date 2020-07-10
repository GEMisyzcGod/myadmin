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

// 获取用户列表
export const userListRequest = (params) => request({
    url:'users',
    mothod:'get',
    params
})
// 状态请求
export const updataStateRequest = (uId,type) => request({
    url:`users/${uId}/state/${type}`,
    method:'put'
})
// 添加用户
export const addUserRequest = (userInfo) => request({
    url:'users',
    method:'post',
    data:userInfo
})
// 编辑用户
export const exitUserRequest = (id,email,mobile) => request({
    url:`users/${id}`, 
    method:'put',
    data:{email,mobile}
})

// 删除用户
export const deleteUserRequest = (id) => request({
    url:`users/${id}`,
    method:'delete'
})

// 分配角色
export const reqRoleUser = (id,rid) => request({url:`users/${id}/role`,method:'put',data:{rid}})

// 角色列表
export const reqRoleList = () => request({url:'roles',method:'get'})

//权限列表 
export const powerListRequest = () => request({
    url:'rights/list',
    method:'get',
})
// 角色树
export const treeListRequest = () => request({
    url:'rights/tree',
    method:'get',
})

// 删除指定的权限
export const deleteRoles = (roleId,rightId) => request({
    url:`roles/${roleId}/rights/${rightId}`,
    method:'delete',
})

// 删除角色
export const deleteJuse = (id) => request({
    url:`roles/${id}`,
    method:'delete',
})
// 角色授权
export const rolesRightsList = (roleId,rids) => request({
    url:`roles/${roleId}/rights`,
    method:'post',
    data:{rids}
})
// 商品分类
export const productFlList = ({type,pagenum,pagesize}) => request({
    url:'categories',
    method:'get',
    params:{type,pagenum,pagesize}
})

// 商品分类列表

