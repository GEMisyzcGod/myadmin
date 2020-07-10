<template>
    <div>
        <MianbaoNav :items="['首页','商品管理','参数列表']"></MianbaoNav>
        <!-- 卡片 -->
        <el-card>
            <el-alert
                show-icon
                title="注意：只允许为第三级分类设置相关参数"
                :closable="false"
                type="warning">
            </el-alert>

            <el-row style="margin: 15px 0">
                <span>请选中商品分类：</span>
                <el-cascader
                    v-model="catValue"
                    :options="catFlList"
                    :props="props"
                    @change="handleChange">
                </el-cascader>
            </el-row>

            <template>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="动态参数" name="first">
                         <el-button type="primary" size="mini">添加参数</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="静态属性" name="second">
                         <el-button type="primary" size="mini">添加属性</el-button>
                    </el-tab-pane>
                </el-tabs>
            </template>

            <!-- 表格 -->
            <template>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column type="expand"></el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="date" label="参数名称"></el-table-column>
                <el-table-column prop="date" label="操作"></el-table-column>
            </el-table>
            </template>


        </el-card>
    </div>
</template>
<script>
import {productFlList} from '@network/api'
import MianbaoNav from '@components/MianbaoNav'
export default {
    name:'Params',
    components:{
        MianbaoNav,
    },
    data(){
        return{
            catFlList:[],//商品分类列表
            catValue:[],//级联选中
            props:{expandTrigger: 'hover',children: 'children',value: 'cat_id',label: 'cat_name'},
            activeName: 'first'
        }
    },
    created(){
        this.getProductFlList()
    },
    methods:{
        // 切换
        handleClick(){

        },
        //获取级联选中的属性的动态或者静态列表
        getAttrList(){
            
        },
        
        // 请求商品列表
        async getProductFlList(){
            const result = await productFlList({type:'',pagenum:'',pagesize:''})
            if(result.meta.status !== 200) return this.$message.error("获取商品列表失败")
            this.catFlList = result.data
        },
        // 当选中节点变化时触发(级联发生变化时触发)
        handleChange(value){
            console.log(value)
            // 判断
            if(this.catValue.length !== 3){
                this.catValue = []
                return
            }

        }
    }
}
</script>
<style scoped>

</style>