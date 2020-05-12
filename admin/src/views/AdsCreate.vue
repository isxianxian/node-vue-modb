<template>
    <div class="box">
        <h1>{{id?'修改':'新建'}}广告位</h1>
        <el-form label-width="120px">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <el-button @click="model.items.push({})">
                    <i class="el-icon-plus"></i> 添加技能
                </el-button>
                <el-row type="flex" style="flex-wrap:wrap;margin-top:2rem;">
                    <el-col
                        :md="12"
                        v-for="(item,i) in model.items"
                        :key="i"
                        style="margin-bottom:3rem;"
                    >
                        <el-form-item label="跳转链接（URL）">
                            <el-input v-model="item.url"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" style="margin-top:1rem;">
                            <el-upload
                                class="avatar-uploader"
                                :action="qiniuDomain"
                                :http-request="upLoadToQiniu"
                                :show-file-list="false"
                                :on-success="res=>$set(item , 'image' , `${qiniuViewHost}/${res.key}`)"
                            >
                                <img
                                    v-if="item.image"
                                    :src="item.image"
                                    class="avatar"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                size="small"
                                type="danger"
                                style="margin-left:8rem;"
                                @click="model.items.splice(i,1)"
                            >删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                model: {
                    items: []
                }
            }
        },
        methods: {
            async save() {
                let res = '',
                    tip = ''
                if (this.id) {
                    // 修改
                    res = await this.$axios.put(`/rest/ads/${this.id}`, this.model)
                    tip = '修改成功'
                } else {
                    if (!this.model.name) {
                        this.$message.warning('请填入信息！')
                        return
                    }
                    res = await this.$axios.post('/rest/ads', this.model)
                    tip = '新增成功'
                }
                if (res) {
                    this.$message.success(tip)
                    this.$router.push('/ads/list')
                }
            },
            async getOneCats() {
                let item = await this.$axios.get(`/rest/ads/${this.id}`)
                this.model = item
            },
            success(res) {
                console.log(res)
            }
        },
        created() {
            this.id ? this.getOneCats() : ''
        }
    }
</script>

<style>
</style>
