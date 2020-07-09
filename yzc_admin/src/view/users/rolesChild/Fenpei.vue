<template>
    <div>
        <el-dialog
        title="分配权限"
        :visible="dialogVisible"
        width="60%"
        :before-close="handleClose">
        
        <el-tree
            ref="tree"
            :data="rolesData"
            show-checkbox
            node-key="id"
            :default-checked-keys="selectList"
            :props="defaultProps"
            :default-expand-all="true">
        </el-tree>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="submitRoles">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import {treeListRequest,rolesRightsList} from '@network/api'
export default {
    name:'Fenpei',
    props:{
        rolesInfo:{
            type:Object,
            default(){
                return{}
            }
        },
        getRolesList:{
            type:Function
        }
    },
    data(){
        return{
            dialogVisible:false,
            defaultProps: {
            children: 'children',
            label: 'authName'
            },
            rolesData:[],//获取到的权限数据
            selectList:[],//点击选中的查询列表
        }
    },
    created(){
        this.getTreeRoles()
    },
    methods:{
        // 关闭弹窗
        handleClose(){
            // 点击xx或者空白关闭弹窗
            this.dialogVisible = false
            this.selectList = []
            // 清除缓存
            this.$nextTick(() => {
                this.$refs.tree.setCheckedKeys([])
            })
            this.$emit("updataRolesInfo")
        },
        // 请求树状权限
        async getTreeRoles(){
            const result = await treeListRequest()
            // console.log(result)
            this.rolesData = result.data
        },
        // 递归查询id
        getRightsId(obj,arr){
            if(!obj.children){
                // 没有children就是最后一层数据了
                return arr.push(obj.id)
            }
                // 有就循环它的children的每一项
            obj.children.forEach(item => {
                this.getRightsId(item,arr)
            })
           
        },
        // 确定提交按钮
        async submitRoles(){


            const roleId = this.rolesInfo.id // 角色id
            // console.log(roleId)
            const {getHalfCheckedKeys,getCheckedKeys} = this.$refs.tree
            const rids = [...getHalfCheckedKeys(),...getCheckedKeys()].join(",") //权限id
            // console.log(rIds)
            const result = await rolesRightsList(roleId,rids)
            // console.log(result)
            if(result.meta.status !== 200) return this.$message.error("权限修改失败")
            this.$message.success("权限修改成功")
            this.dialogVisible = false
            // 更新权限
            this.getRolesList()
        }   
    },
    watch:{
        rolesInfo(newRoleInfo) {
            // console.log(newRoleInfo)
            this.getRightsId(newRoleInfo,this.selectList)
            // console.log(selectList)
        }
    }
}
</script>
<style scoped>

</style>