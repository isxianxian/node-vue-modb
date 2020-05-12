<template>
    <div>
        <h1>{{id?'修改':'新建'}}文章</h1>
        <el-form label-width="120px">
            <el-form-item label="所属分类">
                <el-select v-model="model.categories" multiple>
                    <el-option
                        v-for="(item,index) in categories"
                        :key="index"
                        :label="item.name"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="详情">
                <!-- 富文本编辑器：处理后的文本用html和css转化 -->
                <vue-editor
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                    v-model="model.body"
                ></vue-editor>
            </el-form-item>
            <el-form-item>
                <el-button @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor'
    export default {
        props: {
            id: {}
        },
        data() {
            return {
                model: {},
                categories: []
            }
        },
        methods: {
            async save() {
                let res = '',
                    tip = ''
                if (this.id) {
                    // 修改
                    res = await this.$axios.put(
                        `/rest/articles/${this.id}`,
                        this.model
                    )
                    tip = '修改成功'
                } else {
                    if (!this.model.title) {
                        this.$message.warning('请填入信息！')
                        return
                    }
                    res = await this.$axios.post('/rest/articles', this.model)
                    tip = '新增成功'
                }
                if (res) {
                    this.$message.success(tip)
                    this.$router.push('/articles/list')
                }
            },
            async getArts() {
                this.categories = await this.$axios.get('/rest/categories')
            },
            async getOneArt() {
                this.model = await this.$axios.get(`/rest/articles/${this.id}`)
            },
            async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
                let formData = new FormData()
                formData.append('file', file)

                let res = await this.$axios.post('/upload', formData)
                Editor.insertEmbed(cursorLocation, 'image', res.url)
                resetUploader()
            }
        },
        computed: {},
        created() {
            this.getArts()
            this.id ? this.getOneArt() : ''
        },
        components: {
            VueEditor
        }
    }
</script>
