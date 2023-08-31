<template>
    <div class="qm-submenu">
        <el-submenu :index="item.path">
            <template slot="title">
                <i :class="item.meta.icon || 'el-icon-menu'"></i>
                <span>{{ item.meta.title }}</span>
            </template>
            <div v-for="(item1, index1) in item.children" :key="index1">
                <QmSubMenu v-if="item1.children && item1.children.length > 0" :item="item1"></QmSubMenu>
                <el-menu-item :index="item.path + '/' + item1.path">{{ item1.meta.title }}</el-menu-item>
            </div>
        </el-submenu>
    </div>
</template>
<script>
export default {
    name: 'QmSubMenu',
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            isCollapse: false,
            curActive: '',
            menuAry: []
        }
    },
}
</script>