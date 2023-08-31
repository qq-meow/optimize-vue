<template>
    <div class="table-box">
        <div class="table-list">
            <el-table ref="tableList" height="100%" @selection-change="handleSelectionChange" @select="HandleSelect"
                :data="tableList" style="width: 100%" v-on="$attrs">
                <el-table-column type="selection" fixed="left"></el-table-column>
                <el-table-column v-for="(item, index) in tableConfig" :key="index" :align="item.align" :prop="item.prop"
                    :label="item.label" :width="item.width || ''" :min-width="item.minWidth">
                    <template slot-scope="scope">
                        <div v-if="item.slot">
                            <slot :name="item.slot" :row="scope.row" :_index="scope.$index" :prop="item.prop"></slot>
                        </div>
                        <div class="slot-div" :title="scope.row[item.prop]" v-else>
                            {{ scope.row[item.prop] }}
                        </div>
                    </template>
                </el-table-column>
                <!-- 操作按钮 -->
                <el-table-column v-if="operateConfig && operateConfig.show" :fixed="operateConfig.position || ''"
                    :label="operateConfig.text" :width="operateConfig.width || ''">
                    <template slot-scope="scope">
                        <i class="icon-operate icon-operate-self" :class="item.icon"
                            v-for="(item, index) in operateConfig.list" :key="index" @click="operateHandle(scope, item)">{{
                                item.text }}</i>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-box">
            <el-pagination
            @size-change="changeSize"
            @current-change="currentChange"
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TableList',
    inheritAttrs: false,
    components: {
    },
    props: {
        tableList: {
            type: Array,
            default: () => [],
        },
        tableConfig: {
            type: Array,
            default: () => [],
        },
        operateType: {
            type: String,
            default: '',
        },
        operateText: {
            type: String,
            default: '详情',
        },
        operateWidth: {
            type: Number,
            default: 120,
        },
        operateConfig: {
            type: Object,
            default: () => {},
        },
        pageIndex: {
            type: Number,
            default: 1,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        total: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            form: {},
            multipleSelection: [],
            unSelection: [],
        };
    },
    created() {
        // this.getData();
    },
    mounted() {},
    methods: {
        /**
         * 操作方法
         * @param {*} scope
         * @param {*} item
         */
        operateHandle(scope, item) {
            if (item.cb && typeof item.cb === 'function') {
                item.cb(scope);
            } else {
                this.$emit(item.emit, scope);
            }
        },
        /**
         * 编辑
         */
        editHandle(e) {
            const params = {
                index: e.$index,
                row: e.row,
            };
            this.$emit('on-edit', params);
        },
        /**
         * 改变分页页码
         * @param {*} e
         */
        currentChange(e) {
            // const params = {
            //   pageIndex: e,
            //   pageSize: this.pageSize,
            // }
            this.$emit('on-page', e, this.pageSize);
        },
        /**
         * 改变分页页数
         * @param {*} e
         */
        changeSize(e) {
            // const params = {
            //   pageIndex: this.pageIndex,
            //   pageSize: e,
            // }
            this.$emit('on-page', this.pageIndex, e);
        },
        /**
         * 选择框事件
         */
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (this.multipleSelection.length === 0) {
                this.unSelection = [...this.tableList];
            } else if (this.multipleSelection.length === this.tableList.length) {
                this.unSelection = [];
            }
        },
        HandleSelect(val, row) {
            const indexUn = this.unSelection.findIndex(
                (ele) => ele.equipNo === row.equipNo
            );
            const indexIn = val.findIndex((ele) => ele.equipNo === row.equipNo);
            if (indexIn > -1) {
                if (indexUn > -1) {
                    this.unSelection.splice(indexUn, 1);
                }
            } else if (indexUn < 0) {
                this.unSelection.push(row);
            }
            console.log(val, row);
            // return row
        },
        /**
         * 反选
         */
        toggleAllSelection() {
            this.$refs.tableList.toggleAllSelection();
        },
        /**
         * 获取选择的数据
         */
        getSelection() {
            return this.multipleSelection;
        },
        /**
         * 获取选择的数据
         */
        getUnSelection() {
            return this.unSelection;
        },
        /**
         * 清空未选择数据
         */
        clearUnSelection() {
            this.unSelection = [];
        },
    },
};
</script>

<style lang="less" scoped>
.table-box {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex-direction: column;

    .table-list {
        width: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        overflow-y: scroll;
        // overflow: hidden;
        // ::v-deep .el-table {
        //     overflow-y: scroll;
        // }
        ::v-deep .el-table__empty-block {
            width: auto !important;
        }

        .slot-div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .icon-operate {
            cursor: pointer;
        }

        .icon-operate-self {
            margin-right: 10px;
            &:last-of-type {
                margin-right: 0;
            }
        }
    }

    .pagination-box {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        // border-bottom: 1px solid #ccc;
    }
}
</style>
