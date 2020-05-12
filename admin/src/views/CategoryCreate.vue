<template>
    <div>
        <h1>{{id?'修改':'新建'}}分类</h1>
        <el-form label-width="120px">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent" placeholder="请选择">
                    <el-option
                        v-for="(item,index) in parent"
                        :key="index"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- 原生类型 submit -->
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {},
                parent: []
            }
        },
        methods: {
            async save() {
                let res = '',
                    tip = ''
                if (this.id) {
                    // 修改
                    res = await this.$axios.put(
                        `/rest/categories/${this.id}`,
                        this.model
                    )
                    tip = '修改成功'
                } else {
                    if (!this.model.name) {
                        this.$message.warning('请填入信息！')
                        return
                    }
                    res = await this.$axios.post('/rest/categories', this.model)
                    tip = '新增成功'
                }
                if (res) {
                    this.$message.success(tip)
                    this.$router.push('/categories/list')
                }
            },
            async getOneCats() {
                this.model = await this.$axios.get(`/rest/categories/${this.id}`)
            },
            async getParent() {
                this.parent = await this.$axios.get('/rest/categories')
            }
        },
        created() {
            this.getParent()
            this.id ? this.getOneCats() : ''
        }
    }
</script>

