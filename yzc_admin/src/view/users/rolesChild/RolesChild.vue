<template>
    <div>
        <el-row v-for="item in treeList" :key="item.id">
            <el-clo :span="6">
                <el-tag>{{item.authName}}</el-tag>
            </el-clo>
            <el-clo :span="18">
                <!-- <el-row v-for="cItem in item.children" :key="cItem.id">
                    <el-clo :span="8">
                        <el-tag>{{cItem.authName}}</el-tag>
                    </el-clo>
                    <el-clo :span="16"></el-clo>
                </el-row> -->
            </el-clo>
        </el-row>
    </div>
</template>
<script>
import {treeListRequest} from '@network/api'
export default {
    name:'RolesChild',
    data(){
        return{
            treeList:[]
        }
    },
    created(){
        this.getTreeList()
    },
    methods:{
        async getTreeList(){
            const result = await treeListRequest()
            console.log(result)
            if(result.meta.status !== 200) return this.$message.error("获取失败")
            this.$message.success("获取成功")
            this.treeList = result.data
        }
    },
    computed:{

    }
}
</script>
<style scoped>

</style>