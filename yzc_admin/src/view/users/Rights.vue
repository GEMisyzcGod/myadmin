<template>
    <div>
        <MianbaoNav :items="['首页','权限管理','角色管理']"></MianbaoNav>

        <el-card class="box-card">
            <template>
            <el-table
                :data="powerList"
                border
                style="width: 100%">
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="authName" label="权限名称"></el-table-column>
                <el-table-column prop="path" label="路径"></el-table-column>
                <el-table-column prop="level" label="权限等级">
                    <template slot-scope="scope">
                        <!-- {{scope.row}} -->
                        <el-tag v-if="scope.row.level === '0'">一级</el-tag>
                        <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
                        <el-tag type="warning" v-else>三级</el-tag>
                    </template>  
                </el-table-column>
            </el-table>
            </template>
        </el-card>

    </div>
</template>
<script>

import MianbaoNav from '@components/MianbaoNav'
import {powerListRequest} from "@network/api"
export default {
    name:'Rights',
    components:{
    MianbaoNav
    },
    data(){
        return{
            powerList:[]
        }
    },
    created(){
        this.getPower()
    },    
    methods:{
        // 获取权限列表
        async getPower(){
            const result = await powerListRequest()
            console.log(result)
            if(result.meta.status !== 200) return this.$message.error("获取权限列表失败")
            this.powerList = result.data
        }
    }
        
}
</script>

<style lang="less" scoped>

</style>