<template>
    <div class="box">
        <h1>{{id?'修改':'新建'}}英雄</h1>

        <el-form label-width="120px">
            <el-tabs type="border-card" value="basic">
                <el-tab-pane label="基础信息" name="basic">
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>
                    <el-form-item label="头像">
                        <el-upload
                            class="avatar-uploader"
                            :action="qiniuDomain"
                            :http-request="upLoadToQiniu"
                            :show-file-list="false"
                            :on-success="res=>$set(model, 'avatar' , `${qiniuViewHost}/${res.key}`)"
                        >
                            <img
                                v-if="model.avatar"
                                :src="model.avatar"
                                class="avatar"
                            />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="Banner">
                        <el-upload
                            class="avatar-uploader"
                            :show-file-list="false"
                            :action="qiniuDomain"
                            :http-request="upLoadToQiniu"
                            :on-success="res=>$set(model, 'banner', `${qiniuViewHost}/${res.key}`)"
                        >
                            <img
                                v-if="model.banner"
                                :src="model.banner"
                                class="avatar"
                            />
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="model.categories" multiple>
                            <el-option
                                v-for="(item,index) in categories"
                                :key="index"
                                :label="item.name"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="难度">
                        <!-- 当model为空对象没有score属性的时候会报错，所以要提前在data数据中设置model的score属性 -->
                        <el-rate
                            style="margin-top:0.6rem"
                            v-model="model.scores.difficult"
                            :max="10"
                            show-score
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="技能">
                        <el-rate
                            style="margin-top:0.6rem"
                            v-model="model.scores.skills"
                            :max="10"
                            show-score
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="攻击">
                        <el-rate
                            style="margin-top:0.6rem"
                            v-model="model.scores.attack"
                            :max="10"
                            show-score
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="生存">
                        <el-rate
                            style="margin-top:0.6rem"
                            v-model="model.scores.survive"
                            :max="10"
                            show-score
                        ></el-rate>
                    </el-form-item>
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple>
                            <el-option
                                v-for="(item,index) in items"
                                :key="index"
                                :label="item.name"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple>
                            <el-option
                                v-for="(item,index) in items"
                                :key="index"
                                :label="item.name"
                                :value="item._id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团队技巧">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="技能" name="skill">
                    <el-button @click="model.skills.push({})">
                        <i class="el-icon-plus"></i> 添加技能
                    </el-button>
                    <el-row type="flex" style="flex-wrap:wrap">
                        <el-col
                            :md="12"
                            v-for="(item,i) in model.skills"
                            :key="i"
                        >
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :show-file-list="false"
                                    :on-success="res=>$set(item , 'icon' , `${qiniuViewHost}/${res.key}`)"
                                    :action="qiniuDomain"
                                    :http-request="upLoadToQiniu"
                                >
                                    <img
                                        v-if="item.icon"
                                        :src="item.icon"
                                        class="avatar"
                                    />
                                    <i
                                        v-else
                                        class="el-icon-plus avatar-uploader-icon"
                                    ></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="冷却值">
                                <el-input v-model="item.delay"></el-input>
                            </el-form-item>
                            <el-form-item label="消耗">
                                <el-input v-model="item.cost"></el-input>
                            </el-form-item>
                            <el-form-item label="描述">
                                <el-input
                                    v-model="item.description"
                                    type="textarea"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="小提示">
                                <el-input v-model="item.tips" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="model.skills.splice(i,1)"
                                >删除</el-button>
                                <!-- 删除 先在前端model中将数据删除，点击保存传递的数据没有删除的那一条就是删除了这条数据 -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-form-item style="margin-top:1rem">
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
                // 创建的存储空间对应的上传地址
                model: {
                    scores: {
                        difficult: 0,
                        skills: 0,
                        attack: 0,
                        survive: 0
                    },
                    skills: []
                },
                categories: [],
                items: [] // 装备
            }
        },
        methods: {
            async save() {
                let res = '',
                    tip = ''
                if (this.id) {
                    // 修改
                    res = await this.$axios.put(
                        `/rest/heros/${this.id}`,
                        this.model
                    )
                    tip = '修改成功'
                } else {
                    if (!this.model.name) {
                        this.$message.warning('请填入信息！')
                        return
                    }
                    res = await this.$axios.post('/rest/heros', this.model)
                    tip = '新增成功'
                }
                if (res) {
                    this.$message.success(tip)
                    this.$router.push('/heros/list')
                }
            },
            async getOneHero() {
                let item = await this.$axios.get(`/rest/heros/${this.id}`)
                this.model = Object.assign({}, this.model, item)
                // 将this.model和item合并到前面的空对象中，item的属性会覆盖this.model的属性
            },
            async getCategories() {
                this.categories = await this.$axios.get(`/rest/categories`)
            },
            async getItems() {
                this.items = await this.$axios.get(`/rest/items`)
            }
        },
        created() {
            this.getCategories()
            this.getItems()
            this.id ? this.getOneHero() : ''
        }
    }
</script>


