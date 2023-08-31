<template>
    <div class="qm-form">
        <el-row :gutter="10" type="flex">
            <el-col :span="item.span || 8" v-for="(item, index) in formConfig" :key="index">
                <div class="qm-form-item">
                    <div class="grid-content bg-purple"></div>
                    <!-- 插槽 -->
                    <slot v-if="item.slot" :name="item.slot"></slot>
                    <!-- 静态带list的select -->
                    <el-select v-else-if="item.type === 'select' && item.list" v-model="formClone[item.key]"
                        @change="modelHandle" clearable :placeholder="item.title">
                        <el-option v-for="(item1, index) in item.list" :key="index" :label="item1.label"
                            :value="item1.value"></el-option>
                    </el-select>
                    <!-- 请求接口的 select -->
                    <el-select v-else-if="item.type === 'select' && item.selectApi" v-model="formClone[item.key]" clearable
                        :placeholder="item.title" filterable :remote="item.remote" reserve-keyword @change="modelHandle"
                        :remote-method="(query) => remoteMethod(query, item)" :loading="loading">
                        <el-option v-for="(item1, index) in selectObj[item.key]" :key="index" :label="item1[item.label]"
                            :value="item1[item.value]"></el-option>
                    </el-select>
                    <!-- 级联 -->
                    <el-cascader :popper-class="'el-cascader-' + item.key" style="min-width: 300px"
                        v-else-if="item.type === 'cascaderTreeOrg'"
                        @change="cascaderChange($event, item, selectObj[item.key])" v-model="formClone[item.key]" clearable
                        :collapse-tags="true" :options="selectObj[item.key]" :props="{
                            label: item.label,
                            value: item.value,
                            children: item.children,
                            multiple: item.multiple,
                            emitPath: true,
                        }">
                    </el-cascader>
                    <!-- 输入框 -->
                    <el-input v-else-if="item.type === 'input'" v-model="formClone[item.key]" clearable
                        @change="modelHandle" :placeholder="item.title">
                    </el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// import { debounceForInput } from '@/utils';
// import * as api from '@/api/common';

export default {
    name: 'QmForm',
    model: {
        prop: 'form',
        event: 'on-model',
    },
    props: {
        form: {
            type: Object,
            default: () => { },
        },
        total: {
            type: [Number, String],
            default: '',
        },
        formConfig: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            formClone: {},
            formSave: {},
            selectObj: {},
            OrgCommpanyList: [],
            OrgPlantList: [],
            plantList: [],
            companyList: [],
            thiOrgList: [],
            secOrgList: [],
            loading: false,
        };
    },
    watch: {
        form: {
            handler(newval) {
                this.formClone = { ...newval };
            },
            deep: true,
            immediate: true,
        },
        // value(newVal) {
        //   console.log(newVal, 'this is newval')
        // }
    },
    created() {
        // this.getData();
    },
    mounted() {
        // this.formClone = { ...this.form };
        this.formConfig.forEach((ele) => {
            // console.log(ele.key, 'this is ')
            if (ele.selectApi && !ele.remote) {
                this.getSelectList(ele);
            }
        });
    },
    methods: {
        /**
         * 双向绑定，回传
         */
        modelHandle() {
            this.$emit('on-model', this.formClone);
        },
        /**
         * 设置全选
         */
        setAllSelect(item, list) {
            this.clearHalfSelect(item);
            const totalArr = [[list[0].code]];
            list.forEach((ele) => {
                // const itemArr = [ele.code];
                if (ele.child && ele.child.length > 0) {
                    ele.child.forEach((ele1) => {
                        const itemArr = [ele.code];
                        itemArr.push(ele1.code);
                        totalArr.push(itemArr);
                    });
                }
            });
            this.formClone[item.key] = totalArr;
            // console.log(totalArr, 'this is eeeeeee')
        },
        /**
         * 半全选
         * @param {*} item
         */
        setHalfSelect(item) {
            const className = `.el-cascader-${item.key} .el-cascader-node .el-checkbox__input`;
            document.querySelector(className).classList.add('is-indeterminate');
        },
        /**
         * 取消半全选
         * @param {*} item
         */
        clearHalfSelect(item) {
            const className = `.el-cascader-${item.key} .el-cascader-node .el-checkbox__input`;
            document.querySelector(className).classList.remove('is-indeterminate');
        },
        /**
         * 数组子集长度
         * @param {*} arr
         */
        flattenHandle(arr) {
            let flattenArr = 0;
            arr.forEach((ele) => {
                if (ele.child && ele.child.length > 0) {
                    ele.child.forEach(() => {
                        flattenArr += 1;
                    });
                }
            });
            return flattenArr;
        },
        /**
         * 级联菜单处理全选
         * @param {*} e
         * @param {*} item
         */
        cascaderChange(e, item, list) {
            // debugger
            // console.log(e, 'this is aaa');
            if (item.multiple) {
                setTimeout(() => {
                    if (!this.formSave[item.key] || this.formSave[item.key].length < 1) {
                        // debugger;
                        if (e[0][0] === 'all') {
                            // 全选
                            this.setAllSelect(item, list);
                        } else {
                            this.setHalfSelect(item);
                        }
                    } else if (!e[0] || (e[0][0] !== 'all' && this.formSave[item.key][0][0] === 'all')) {
                        // 全取消
                        // debugger;
                        this.formClone[item.key] = [];
                        this.clearHalfSelect(item);
                    } else if (e[0][0] === 'all' && this.formSave[item.key][0][0] !== 'all') {
                        // 全选
                        // debugger;
                        this.clearHalfSelect(item);
                        this.setAllSelect(item, list);
                    } else if (
                        (e[0][0] === 'all' && this.formSave[item.key][0][0] === 'all')
                        || (e[0][0] !== 'all' && this.formSave[item.key][0][0] !== 'all')
                    ) {
                        // 选择了其他的，半全选
                        // debugger;
                        const curCount = e.length;
                        const totalCount = this.flattenHandle(list);
                        console.log(curCount, 'THIS IS EE', totalCount);
                        if (
                            curCount === totalCount + 1
                            || (curCount === totalCount && this.formSave[item.key][0][0] !== 'all')
                        ) {
                            this.setAllSelect(item, list);
                        } else {
                            // if (this.formClone[item.key][0][0] === 'all') {
                            //   const formItemKey = [...e];
                            //   formItemKey.shift();
                            //   this.formClone[item.key] = formItemKey;
                            // }
                            setTimeout(() => {
                                this.setHalfSelect(item);
                            });
                        }
                    }
                    this.formSave[item.key] = this.formClone[item.key];
                    this.modelHandle();
                });
            }
        },
        /**
         * 搜索下拉框
         * @param {*} query
         * @param {*} item
         */
        remoteMethod(query, item) {
            // item.pageSize = item.pageSize ? item.pageSize += 20 : 20
            this.getSelectList(item, query);
        },
        recursionHandle(arr) {
            arr.unshift({
                code: 'all',
                name: '全部',
                child: null,
            });
            // arr.forEach((ele) => {
            //   if (ele.child && ele.child.length > 0) {
            //     ele.child.unshift({
            //       code: 'all',
            //       name: '全部',
            //       child: null,
            //     });
            //   }
            // });
        },
        /**
         * 根据selectApi获取下拉框数据
         */
        getSelectList(ele, query = '') {
            // console.log(typeof ele.selectApi, 'tttttt')
            if (typeof ele.selectApi === 'function') {
                ele.selectApi({
                    pageIndex: 1,
                    pageSize: ele.pageSize || 40,
                    keyWord: query,
                }).then((res) => {
                    const { data } = res.data;
                    this.$set(this.selectObj, ele.key, data || []);
                });
            }
        },
        /**
         * 搜索按钮
         */
        searchHandle() {
            // console.log(this.formClone, 'this is ppppp')
            // debugger;
            this.modelHandle();
            this.$emit('on-confirm', this.formClone);
        },
    },
};
</script>

<style lang="less" scoped>
.qm-form {
    width: 100%;

    .qm-form-item {
        margin-right: 10px;
        ::v-deep .el-select {
            width: 100%;
        }
        &:last-of-type {
            margin-right: 0;
        }
    }

    .total {
        margin-left: 10px;
    }
}
</style>
