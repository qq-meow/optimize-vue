<template>
    <div id="app" class="app">
        <div class="qm-menu-box">
            <qm-menu ></qm-menu>
        </div>
        <div class="qm-router-view">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import QmMenu from '@/components/commons/QmMenu.vue';
export default {
    name: 'app',
    components: {
        QmMenu
    },
    data() {
        return {}
    },
    created() {
        //
    }
}
</script>

<style lang="less">
* {
    box-sizing: border-box;
    margin: 0;
    border: 0;
}

::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
}

html,
body,
#app,
.app {
    width: 100%;
    height: 100%;
}

.app {
    display: flex;
    .qm-menu-box {
        height: 100%;
    }
    .qm-router-view {
        background: #f5f5f5;
        flex: 1;
    }
}

.full-screen {
    width: 100%;
    height: 100%;
}

.full-width {
    width: 100%;
}

.full-height {
    height: 100%;
}

.flex-box {
    display: flex;
}
</style>
