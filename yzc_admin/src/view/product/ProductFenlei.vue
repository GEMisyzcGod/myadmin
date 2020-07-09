<template>
    <div >
        <MianbaoNav :items="['首页','商品管理','商品分类']"></MianbaoNav>
        <!-- 卡片 -->
        <el-card style="width: 100%">
            <el-button type="primary">添加分类</el-button>
            <!-- 表格 -->
            <ZkTable
                :data="productFlList"
                empty-text="暂无数据"
                border
                :selection-type="false"
                :show-index="true"
                :expand-type="false"
                :columns="columns"
                
                >
                <template slot="isOk" slot-scope="scope">
                    <i class="el-icon-success" v-if="!scope.row.cat_deleted" style="color:green"></i>
                    <i class="el-icon-error" v-else style="color:orange"></i>
                </template>

                 <template slot="sort" slot-scope="scope">
                    <el-tag v-if="scope.row.cat_level === 0" size="mini">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.cat_level === 1" size="mini">二级</el-tag>
                    <el-tag type="warning" v-else size="mini">三级</el-tag>
                </template>

                 <template slot="operation" slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
                    <el-button type="danger"  size="mini" icon="el-icon-delete">删除</el-button>
                </template>

            </ZkTable>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="productFl_params.pagenum"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="productFl_params.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>

        </el-card>
    </div>
</template>

<script>
import {productFlList} from "@network/api"
import MianbaoNav from '@components/MianbaoNav'
export default {
    name:'ProductFenlei',
    components:{
        MianbaoNav
    },
    data(){
        return {
            productFlList:[],//商品分类列表
            // 请求分类列表参数
            productFl_params: {   //请求分类列表参数
            type: '',
            pagenum: 1,
            pagesize: 5
            },
            total:0,//总页数
            columns:[
                {
                    label:'分类名称',
                    prop:'cat_name',
                },
                {
                    label:'是否有效',
                    type:'template',
                    template:'isOk'
                },
                {
                    label:'排序',
                    type:'template',
                    template:'sort'
                },
                {
                    label:'操作',
                    type:'template',
                    template:'operation'
                },

            ]
        }
    },
    created(){
        this.getProducFltList()
    },
    methods:{
        // 获取商品分类列表
        async getProducFltList(){

          const result1 = await productFlList(this.productFl_params)
        //   console.log(result1)
          if(result1.meta.status !== 200) return this.$message.error("获取商品列表失败")
          this.$message.success("获取商品列表成功")
          
        //   console.log(this.productFlList)
        const {result,total} = result1.data
        this.productFlList = result
        this.total = total
        },
        //每页大小改变的时候
        handleSizeChange(newSize) {
            this.productFl_params.pagesize = newSize
            this.getProducFltList()
        },
        // 当前页数改变的时候
        handleCurrentChange(newPage) {
            this.productFl_params.pagenum = newPage
            this.getProducFltList()
        }
    }
}
</script>

<style scoped>

</style>