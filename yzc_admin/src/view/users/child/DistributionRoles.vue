<template>
    <el-dialog
        title="分配权限"
        :visible="dialogVisible"
        width="60%"
        :before-close="handleClose">
        <p>当前用户: {{fenpeiRoles.username}}</p><br>
        <p>当前角色: {{fenpeiRoles.role_name}}</p><br>
        分配角色：
        <el-select v-model="selectValue" placeholder="请选择">
            <el-option
                    v-for="item in roleList"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
            </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="okClick">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
import {reqRoleUser,reqRoleList} from '@network/api'
export default {
    name:'DistributionRoles',
    props:{
        fenpeiRoles:{
            type:Object
        },
        roleList:{
            type:Array
        }
    },
    data(){
        return{
            dialogVisible:false,
            selectValue:''//选中id项
        }
    },
    methods:{
        handleClose(){
            this.dialogVisible = false
        },
        // 点击确定选择角色
        async okClick(){
            // 若干下拉为空就不发送请求
            if(!this.selectValue) return this.dialogVisible = false
            const userId = this.fenpeiRoles.id
            const rId = this.selectValue
            const result = await reqRoleUser(userId,rId)
            if(result.meta.status !== 200) return this.$message.error("分配角色失败")
            this.$message.error("分配角色成功")
            this.dialogVisible = false
            this.selectValue = ""
            this.$emit("updateUserList")
        }

    }
}
</script>
<style scoped>

</style>