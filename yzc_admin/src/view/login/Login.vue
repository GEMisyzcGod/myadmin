<template>
  <div class="login">
    <div class="loginBox">
      <div class="loginBoxImg">
        <img src="@assets/img/logo.png" >
      </div>

      <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
        <!-- 账号 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-user" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
         <el-form-item prop="password">
           <!-- 通过插槽来放置图标 -->
          <el-input v-model="ruleForm.password">
            <i class="iconfont icon-3702mima" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

      
    </div>  
  </div>
</template>

<script>
import {loginRequest} from '@network/api.js'
export default {
    name:'Login',
    data() {
      return {
        // 表单验证
        ruleForm: {
          username: '',
          password: '',
        },
        // 表单验证规则
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      // 登录
      submitForm(formName) {
        this.$refs[formName].validate(async valid => {
          
          const result = await loginRequest(this.ruleForm)
          console.log(result)
          if(result.meta.status !== 200){
            this.$message.error('登陆失败，账号或密码错误');
          }else{
            // 存token
            const {token} = result.data
            sessionStorage.setItem("token",token)
              this.$message({
                message: '登录成功',
                type: 'success'
              });  
              // 跳转页面
            this.$router.push('/user')
          }
        });
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style scoped lang="less">
.login{
  background-color: #2b4b6b;
  height: 100%;
  position: relative;
  .loginBox{
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 5px;
    .loginBoxImg{
      width: 130px;
      height: 130px;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      border-radius: 50%;
      background-color: #fff;
      padding: 10px;
      box-shadow: 0 0 10px #fff;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      } 
    }
    .el-form{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      .el-form-item{
        padding: 0 20px;
      }
      .btns{
          text-align: right;
        }
    }
  }
}
</style>