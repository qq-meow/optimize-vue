<template>
    <el-container class="rolesManger">
        <el-header>
            
        </el-header>
        <el-main>
            this is rolesManger
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: 'rolesManger',
    components: {
    },
    data() {
        return {
            
        };
    },
    created() {
    },
    mounted() {
        console.log('mounted');
    },
    methods: {
        
    },
};
</script>

<style lang="less" scope>
.rolesManger {
    width: 100%;
    height: 100%;
    background: #fff;
    .el-header {
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
    }
}
</style>