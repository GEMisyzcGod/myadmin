<template>
    <div>
        <MianbaoNav :items="['首页','用户管理','用户列表']"></MianbaoNav>
        <!-- 卡片 -->
        <el-card class="box-card">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-input placeholder="请输入内容" class="input-with-select" v-model="usersParms.query" 
                clearable @clear="clearClick()">
                    <el-button slot="append" icon="el-icon-search" @click="searchClick()"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="addUsers">添加用户</el-button>
                
            </el-col>           
        </el-row>
        <!-- 表格 -->
        <el-table
            :data="userTableData"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                label="#">
            </el-table-column>
            <el-table-column
                prop="username"
                label="姓名">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="电话">
            </el-table-column>
            <el-table-column
                prop="role_name"
                label="角色">
            </el-table-column>
            <el-table-column
                prop="mg_state"
                label=状态>
                <template slot-scope="scope">
                    <!-- {{scope.row.mg_state}} -->
                    <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        @change="changeIng(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作" width="200px">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" >
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="exitClick(scope.row)"></el-button>  
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>  
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="分配" placement="top">
                        <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>  
                    </el-tooltip>
                    
                    
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="usersParms.pagenum"
            :page-sizes="[2, 5, 10, 20]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        </el-card>
        
        <TanChuang ref="userAddExit" :userInfo="userInfo"></TanChuang>
    </div>

</template>
<script>
import TanChuang from '@view/users/child/TanChuang'
import {updataStateRequest} from '@network/api'
import {userListRequest} from '@network/api'
import MianbaoNav from '@components/MianbaoNav'
export default {
    name:'Users',
    components:{
        MianbaoNav,
        TanChuang
    },
    data(){
        return{
           userTableData:[],//表格数据
           usersParms:{
               query:'',//搜索关键字
               pagenum:1,
               pagesize:2
           },//用户列表请求参数
        total:0,//总条数
        dialogVisible: false,//添加用户对话框
        userInfo:{},
        }
    },
    created(){
        this.getuserList()
    },
    methods:{
        // 获取用户列表
        async getuserList(){
            const result = await userListRequest(this.usersParms)
            // console.log(result)
            if(result.meta.status !== 200) return this.$message.error("获取数据失败");
            // 把数据取出来
            const {users,total} = result.data
            // console.log(users)
            this.userTableData = users  
            this.total = total       
        },
        // 改变页面的条数
        handleSizeChange(size){
            // console.log('handleSizeChange')
            this.usersParms.pagesize = size
            this.getuserList()
        },
        // 页面改变时候执行
        handleCurrentChange(page){
            // console.log(page)
            this.usersParms.pagenum = page
            // 请求数据
            this.getuserList()
            // console.log('handleCurrentChange')
        },
        // 搜索
        searchClick(){
            // 发请求
            this.getuserList()
            this.usersParms.pagenum = 1
        },
        // 清空输入框恢复
        clearClick(){
            this.getuserList()
        },
        // 改变状态
        async changeIng(userInfo){
            // console.log(userInfo)
            const {id,mg_state} = userInfo
            const result = await updataStateRequest(id,mg_state)
            // console.log(result)
            if(result.meta.status !== 200) return this.$message.error("更新状态置失败");
            this.$message.success("更新状态成功")
        },
        // 添加用户
        addUsers(){
            this.userInfo = {}
            this.$refs.userAddExit.dialogVisible = true
        },
        // 编辑信息
        exitClick(userInfo){
            this.userInfo = userInfo
            // console.log(userInfo)
            this.$refs.userAddExit.dialogVisible = true
        }
        
    }
}
</script>

<style lang="less" scoped>


</style>