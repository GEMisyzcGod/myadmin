<template>
    <div>
         <MianbaoNav :items="['首页','权限管理','角色列表']"></MianbaoNav>
         <el-card class="box-card">
           <el-button type="primary" @click="addJuese">添加角色</el-button>
           <el-table
                :data="rolesList"
                border
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <RolesChild :rowInfo="scope.row"></RolesChild>
                    </template>
                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <el-table-column prop="level" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="exitClick(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" icon="el-icon-delete" @click="delClick(scope.row.id)">删除</el-button>
                        <el-button type="warning" size="mini" icon="el-icon-s-tools">分配权限</el-button>
                    </template>
                    
                </el-table-column>
               
            </el-table>
        </el-card>
    </div>
</template>
<script>
import {deleteJuse} from '@network/api'
import {reqRoleList} from "@network/api"
import MianbaoNav from '@components/MianbaoNav'
import RolesChild from '@view/users/rolesChild/RolesChild'
export default {
    name:'Roles',
    components:{
        MianbaoNav,
        RolesChild
    },
    data(){
        return{
            rolesList:[]
        }
    },
    created(){
        this.getRolesList()
    },
    methods:{
        // 获取用户列表
        async getRolesList(){
            const result = await reqRoleList()
            console.log(result)
            if(result.meta.status !== 200) return this.$message.error("获取用户失败")
            this.$message.success("获取用户成功")
            this.rolesList = result.data
        },
        // 点击删除角色
        async delClick(id){
            const result = await deleteJuse(id)
            console.log(result)
            if(result.meta.status !== 200) return this.$message.error("删除失败")
            this.$message.success("删除成功")
            this.getRolesList()
        },
        // 点击编辑
        exitClick(){

        },
        // 点击添加角色
        addJuese(){
            
        }
    }
}
</script>

<style lang="less" scoped>
.el-button{
    margin-bottom: 10px;
}
</style>