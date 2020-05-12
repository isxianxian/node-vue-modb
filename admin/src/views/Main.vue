<template>
    <div class="main">
        <el-container style="height: 100vh">
            <el-aside
                width="200px"
                style="background-color: rgb(238, 241, 246)"
            >
                <el-menu router unique-opened :default-active="$route.path">
                    <!-- router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-message"></i>内容管理
                        </template>
                        <el-menu-item-group>
                            <template slot="title">物品</template>
                            <el-menu-item index="/items/create">新建物品</el-menu-item>
                            <el-menu-item index="/items/list">物品列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">英雄</template>
                            <el-menu-item index="/heros/create">新建英雄</el-menu-item>
                            <el-menu-item index="/heros/list">英雄列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">文章</template>
                            <el-menu-item index="/articles/create">新建文章</el-menu-item>
                            <el-menu-item index="/articles/list">文章列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">视频</template>
                            <el-menu-item index="/videos/create">新建视频</el-menu-item>
                            <el-menu-item index="/videos/list">视频列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-message"></i>运营管理
                        </template>
                        <el-menu-item-group>
                            <template slot="title">广告位</template>
                            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
                            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-message"></i>系统设置
                        </template>
                        <el-menu-item-group>
                            <template slot="title">管理员</template>
                            <el-menu-item index="/adminusers/create">新建管理员</el-menu-item>
                            <el-menu-item index="/adminusers/list">管理员列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <template slot="title">分类</template>
                            <el-menu-item index="/categories/create">新建分类</el-menu-item>
                            <el-menu-item index="/categories/list">分类列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown @command="handleCommand">
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="0">查看</el-dropdown-item>
                            <el-dropdown-item command="1">新增</el-dropdown-item>
                            <el-dropdown-item command="2">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>{{username}}</span>
                </el-header>
                <el-main style="padding:0">
                    <router-view :key="$route.path"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
    .el-header {
        background-color: #b3c0d1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            return {
                tableData: [],
                username: ''
            }
        },
        methods: {
            handleCommand(command) {
                let path = command == 0 ? '/adminusers/list' : '/adminusers/create'
                if (command == 2) {
                    path = '/login'
                    localStorage.clear()
                }
                this.$router.push(path)
            }
        },
        created() {
            this.username = localStorage.getItem('username')
        }
    }
</script>
