<template>
    <el-container>
        <el-header>
            <div class="logo">
                <img src="@assets/img/logo.png" >
                <h2>电商网站后台管理</h2>
            </div>
            <el-button type="info" class="btns" @click="exitClick()">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="menuStretch ? '64px':'200px'">
                <div class="toggle" @click="stretchClick()">| | |</div>
                <!-- 侧边栏导航 -->
                <el-menu background-color="#333744" text-color="#fff" unique-opened :collapse="menuStretch" 
                :collapse-transition='false' router :default-active="activePath">
                    <el-submenu v-for="item in menuList" :key="item.id" :index="item.id +'' ">
                        <template slot="title">
                            <i :class="icons[item.id]"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item v-for="items in item.children" :key="items.id" :index="'/'+items.path">
                            <template slot="title"> 
                                <i class="el-icon-menu"></i>
                                <span>{{items.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>

            <el-main>
               <router-view></router-view>
            </el-main>

        </el-container>
    </el-container>
</template>
<script>

import {userRequest} from '@network/api'

export default {
    name:'User',
    data(){
        return {
            menuList:[],//导航栏数组
            icons:{
                '125':'iconfont icon-user',
                '103':'iconfont icon-tijikongjian',
                '101':'iconfont icon-shangpin',
                '102':'iconfont icon-danju',
                '145':'iconfont icon-baobiao',
            },
            menuStretch:false,
            // activePath:'/users'
        }
    },
    created(){
        this.getMenu()
    },
    methods:{
        // 退出登录
        exitClick(){
             this.$confirm('确定退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$router.push('/login')
                //退出清除存储
                sessionStorage.clear()
                this.$message({
                    type: 'success',
                    message: '退出成功!'
            });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });          
            });
            
        },
        // 请求导航
        async getMenu(){
            const result = await userRequest()
            // console.log(result.data)
            if(result.meta.status !== 200){
                return this.$message.error("获取信息失败");
            }
           this.menuList = result.data 
        },
        stretchClick(){
            this.menuStretch = !this.menuStretch
        }
    },
    computed:{
        activePath(){

            const childrens = []
            this.menuList.forEach(item => {
                item.children.forEach( cItem => {
                    childrens.push("/"+cItem.path)
                })
            })
            const cItem = childrens.find( item => {
                return this.$route.path.indexOf(item) >= 0
            })
            return cItem

            // return this.$router.path
        }
    }
}
</script>
<style scoped lang='less'>
.el-header{
    background-color: turquoise;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo{
        display: flex;
        width: 300px;
        height: 55px;
        margin-right: 20px;
    img{
        width: 55px;
        height: 55px;
        margin-right: 20PX;
    }
    h2{
        line-height: 55px;
        color: #ffffff;
    }
    }
}
.el-container{
    height: 100%;
    .el-aside{
        background-color: indianred;
        .toggle{
            height: 20px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            cursor: pointer;
        }
        .el-menu{
            border-right: none;
        }
    }
    .el-container{
        background-color: pink;
    }
}
.iconfont{
    margin-right: 10px;
}
</style>