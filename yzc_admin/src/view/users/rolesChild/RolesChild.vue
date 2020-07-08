<template>
    <div>
        <el-row v-for="item in treeList" :key="item.id" class="outItem">
            <el-col :span="6">
                <el-tag closable @close="deleteInfo(item.id)">{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
            </el-col>
            <el-col :span="18">
                <el-row v-for="cItem in item.children" :key="cItem.id" class="outItem">
                    <el-col :span="8">
                        <el-tag closable @close="deleteInfo(cItem.id)" type="success">{{cItem.authName}}</el-tag>
                        <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="16" >   
                        <el-tag closable @close="deleteInfo(ccItem.id)" type="warning" v-for="ccItem in cItem.children" :key="ccItem.id">{{ccItem.authName}}</el-tag>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {deleteRoles} from '@network/api'
import {treeListRequest} from '@network/api'
export default {
    name:'RolesChild',
    props:{
        rowInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return{
            treeList:[]
        }
    },
    created(){
       this.treeList = this.rowInfo.children
    },
    methods:{
        //点击删除权限事件
        async deleteInfo(id){
            const roleId = this.rowInfo.id  //角色id
            const rightId = id //权限id
            const result = await deleteRoles(roleId,rightId)
            // console.log(result)
            if(result.meta.status !== 200) return this.$message.error("删除权限失败")
            this.$message.success("删除权限成功")
            this.treeList = result.data
        }
    },
    computed:{

    }
}
</script>
<style scoped lang="less">
   .el-tag{
        margin: 7px;
    }
    .outItem{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #dddddd;
    }
</style>