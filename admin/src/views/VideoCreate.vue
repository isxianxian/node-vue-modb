<template>
    <div>
        <h1>{{id?'修改':'新建'}}视频</h1>
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
            <el-form-item label="封面">
                <el-upload
                    class="avatar-uploader"
                    :on-success="res=>$set(model , 'icon' , `${qiniuViewHost}/${res.key}`)"
                    :action="qiniuDomain"
                    :http-request="upLoadToQiniu"
                    :show-file-list="false"
                >
                    <img v-if="model.icon" :src="model.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button @click="save">保存</el-button>
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
                // 创建的存储空间对应的上传地址
                qiniuDomain: 'https://upload-z2.qiniup.com',
                // 创建成功后官方随机分配的公开图片地址前缀，即上传成功后对应的公用图片地址前缀
                qiniuViewHost: 'http://qa47jmcsm.bkt.clouddn.com',
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
                        `/rest/videos/${this.id}`,
                        this.model
                    )
                    tip = '修改成功'
                } else {
                    if (!this.model.title) {
                        this.$message.warning('请填入信息！')
                        return
                    }
                    res = await this.$axios.post('/rest/videos', this.model)
                    tip = '新增成功'
                }
                if (res) {
                    this.$message.success(tip)
                    this.$router.push('/videos/list')
                }
            },
            async getArts() {
                this.categories = await this.$axios.get('/rest/categories')
            },
            async getOneArt() {
                this.model = await this.$axios.get(`/rest/videos/${this.id}`)
            }
        },
        computed: {},
        created() {
            this.getArts()
            this.id ? this.getOneArt() : ''
        }
    }
</script>
