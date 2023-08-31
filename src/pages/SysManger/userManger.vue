<template>
    <el-container class="userMager">
        <el-header>
            <qm-form v-model="form" :formConfig="formConfig"></qm-form>
        </el-header>
        <el-main>
            <qm-table :tableConfig="tableConfig" :tableList="tableList" :operateConfig="operateConfig">
                <template slot="name" slot-scope="params">
                    <div>{{ params.row[params.prop] + '插槽扩展想咋玩咋玩' }}</div>
                </template>
            </qm-table>
        </el-main>
    </el-container>
</template>

<script>
import QmTable from '@/components/commons/QmTable.vue';
import QmForm from '@/components/commons/QmForm.vue';
import api from '@/api/userMager';
// import utils from '@/utils/utils'
export default {
    name: 'Index',
    components: {
        QmTable,
        QmForm
    },
    data() {
        return {
            form: {
                name: '',
                sex: '',
                keyWord: ''
            },
            formConfig: [
                {
                    type: 'select',
                    key: 'sex',
                    title: '性别',
                    list: [
                        {
                            label: '男',
                            value: '男',
                        },
                        {
                            label: '女',
                            value: '女',
                        },
                    ],
                    span: 4
                },
                {
                    type: 'input',
                    key: 'keyWord',
                    title: '请输入关键字',
                },
            ],
            tableList: [
                {
                    no: 1,
                    name: '张三',
                    age: '14',
                    remark: '备注一下',
                },
                {
                    no: 2,
                    name: '李四',
                    age: '16',
                    remark: '备注一下',
                }
            ],
            tableConfig: [
                {
                    prop: 'no',
                    label: '序号',
                    minWidth: 100,
                },
                {
                    prop: 'name',
                    label: '名称',
                    slot: 'name',
                    minWidth: 200,
                },
                {
                    prop: 'age',
                    label: '年龄',
                    minWidth: 200,
                },
                {
                    prop: 'remark',
                    label: '备注',
                },
            ],
            operateConfig: {
                show: true,
                position: 'right',
                text: '操作',
                width: 140,
                list: [
                    {
                        text: '',
                        icon: 'el-icon-edit',
                        emit: 'on-edit',
                        cb: (e) => {
                            console.log(e, 'this is edit...');
                        },
                    },
                    {
                        text: '',
                        icon: 'el-icon-delete',
                        emit: 'on-delete',
                        cb: (e) => {
                            console.log(e, 'this is delete...');
                        },
                    },
                ],
            },
        };
    },
    created() {
        (new Array(20)).fill(1).forEach((ele, idx) => {
            this.tableList.push({
                no: idx + 1,
                name: '张三' + idx,
                age: '14',
                remark: '备注一下'
            })
        })
        console.log(new Array(20))
        // this.getUserMager();
    },
    mounted() {
        console.log('mounted');
    },
    methods: {
        getUserMager() {
            api.getUserMager().then((res) => {
                console.log(res, 'this is res');
            });
        },
    },
};
</script>

<style lang="less" scope>
.userMager {
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