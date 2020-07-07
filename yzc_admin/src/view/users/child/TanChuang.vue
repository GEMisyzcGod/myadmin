<template>
    <div>
        
        <el-dialog
            :title="isAddUser ? '添加用户' : '修改用户'"
            :visible="dialogVisible"
            width="60%"
            :before-close="handleClose">
            {{userInfo}}
            <el-form :model="userRuleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <!-- 表单 -->
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userRuleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="isAddUser">
                    <el-input v-model="userRuleForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userRuleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="userRuleForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {regsMobile} from '@tools/regx'
export default {
    name:'TanChuang',
    props:{
        userInfo:{
            type:Object,
            defult(){
                return {}
            }
        }
    },
    data(){
        return {
            userRuleForm:{//添加用户时用户输入的信息
            username:'',
            password:'',
            email:'',
            mobile:''
        },
        // 验证规则
        rules:{
            username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
           email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
           mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator:regsMobile, trigger: 'blur'}
          ],
        },
        dialogVisible:false,//控制显示隐藏
        }
    },
    methods:{
        // 点击遮罩层关闭对话框
        handleClose() {
            // this.$refs.userRuleForm.restFields()
        this.dialogVisible = false
    },
    computed:{
        isAddUser(){
            // 如果是添加 返回true，否则返回false
            return !this.userInfo.id || !this.userInfo.username
        }
    }
    }
}
</script>
<style lang="less" scoped>

</style>