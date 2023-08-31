<template>
    <div class="qm-menu">
        <el-menu :default-active="curActive" :router="true" :collapse-transition="true" :collapse="isCollapse" class="el-menu-vertical" @open="handleOpen"
            @close="handleClose" active-text-color="#409eff">
            <div v-for="(item, index) in menuAry" :key="index">
                <!-- <el-submenu :index="item.path" v-if="item.children && item.children.length > 0">
                    <template slot="title">
                        <i :class="item.meta.icon || 'el-icon-menu'"></i>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    <el-menu-item :index="item.path + '/' + item1.path" v-for="(item1, index1) in item.children" :key="index1">{{ item1.meta.title }}</el-menu-item>
                </el-submenu> -->   
                <QmSubMenu v-if="item.children && item.children.length > 0" :item="item"></QmSubMenu>
                <el-menu-item :index="item.path" v-else>
                    <i :class="item.meta.icon || 'el-icon-menu'"></i>
                    <span slot="title">{{ item.meta.title }}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>
<script>
import QmSubMenu from '@/components/commons/QmSubMenu.vue';
import routes from '@/routers/routes'
export default {
    name: 'app',
    components: {
        QmSubMenu
    },
    data() {
        return {
            isCollapse: false,
            curActive: '',
            menuAry: []
        }
    },
    watch: {
        '$route.path': {
            handler(newval) {
                this.curActive = newval
            },
            deep: true,
        }
    },
    created() {
        
        let menuAry = []
        routes.forEach((ele) => {
            if (ele.meta.isMenu) {
                menuAry.push(ele)
            }
        })
        this.menuAry = menuAry
    },
    methods: {
        handleOpen() {

        },
        handleClose() {

        }
    }
}
</script>
<style lang="less" scoped>
.qm-menu {
    height: 100%;
    .el-menu-vertical:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
    }
}
</style>