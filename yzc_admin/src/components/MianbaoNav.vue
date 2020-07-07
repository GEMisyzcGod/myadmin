<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/user' }">{{items[0]}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{items[1]}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{items[2]}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    name:"MianbaoNav",
    props:{
        items:{
            type:Array,
            required:true
        }
    }
}
</script>
<style lang="less" scoped>
.el-breadcrumb{
    margin-bottom :10px;
}
</style>