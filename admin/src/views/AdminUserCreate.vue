<template>
    <div class="box">
        <h1>{{id?'修改':'新建'}}管理员</h1>
        <el-form label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="model.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="text" v-model="model.password"></el-input>
            </el-form-item>
            <el-form-item>
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
                model: {}
            }
        },
        methods: {
            async save() {
                let res = '',
                    tip = ''
                if (this.id) {
                    // 修改
                    res = await this.$axios.put(
                        `/rest/adminusers/${this.id}`,
                        this.model
                    )
                    tip = '修改成功'
                } else {
                    if (!this.model.username && !this.model.password) {
                        this.$message.warning('请填入信息！')
                        return
                    }
                    res = await this.$axios.post('/rest/adminusers', this.model)
                    tip = '新增成功'
                }
                if (res) {
                    this.$message.success(tip)
                    this.$router.push('/adminusers/list')
                }
            },
            async getOneCats() {
                this.model = await this.$axios.get(`/rest/adminusers/${this.id}`)
            }
        },
        created() {
            this.id ? this.getOneCats() : ''
        }
    }
</script>

