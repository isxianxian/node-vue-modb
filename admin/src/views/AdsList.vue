<template>
    <div>
        <h1>广告位列表</h1>
        <el-table :data="list">
            <el-table-column prop="_id" label="id" width="250"></el-table-column>
            <el-table-column prop="name" label="广告位名称"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="medium"
                        @click="$router.push(`/ads/edit/${scope.row._id}`)"
                    >编辑</el-button>
                    <el-button
                        type="text"
                        size="medium"
                        @click="del(scope.row._id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        methods: {
            async getCats() {
                this.list = await this.$axios.get('/rest/ads')
            },
            del(id) {
                this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let res = await this.$axios.delete(`/rest/ads/${id}`)
                    if (res) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.getCats()
                    }
                })
            }
        },
        created() {
            this.getCats()
        }
    }
</script>

<style scoped>
</style>
