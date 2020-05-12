<template>
    <div class="login-container">
        <el-card header="请先登陆" class="login-card">
            <el-form>
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="model.password" type="password"></el-input>
                </el-form-item>
                <el-form-item style="text-align:center">
                    <el-button type="primary" @click="login">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                model: {}
            }
        },
        methods: {
            async login() {
                let res = await this.$axios.post('/login', this.model)
                if (res) {
                    const { token, user } = res
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', user.username)
                    this.$message.success('登陆成功！')
                    this.$router.push('/')
                }
            }
        }
    }
</script>

<style>
    .login-card {
        width: 25rem;
        margin: 5rem auto;
    }
</style>
