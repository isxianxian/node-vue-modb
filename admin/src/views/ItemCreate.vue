<template>
    <div class="box">
        <h1>{{id?'修改':'新建'}}物品</h1>
        <el-form label-width="120px">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                    class="avatar-uploader"
                    :action="qiniuDomain"
                    :http-request="upLoadToQiniu"
                    :show-file-list="false"
                    :on-success="res=>$set(model , 'icon' , `${qiniuViewHost}/${res.key}`)"
                >
                    <img v-if="model.icon" :src="model.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
                model: {}
            }
        },
        methods: {
            afterUpload(res) {
                this.$set(this.model, 'icon', res.data.url)
            },
            async save() {
                let res = '',
                    tip = ''
                if (this.id) {
                    // 修改
                    res = await this.$axios.put(
                        `/rest/items/${this.id}`,
                        this.model
                    )
                    tip = '修改成功'
                } else {
                    if (!this.model.name) {
                        this.$message.warning('请填入信息！')
                        return
                    }
                    res = await this.$axios.post('/rest/items', this.model)
                    tip = '新增成功'
                }
                if (res) {
                    this.$message.success(tip)
                    this.$router.push('/items/list')
                }
            },
            async getOneCats() {
                this.model = await this.$axios.get(`/rest/items/${this.id}`)
            }
        },
        created() {
            this.id ? this.getOneCats() : ''
        }
    }
</script>

