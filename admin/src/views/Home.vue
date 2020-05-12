<template>
    <div class="page-home">
        <div class="bg"></div>
        <h2>欢迎来到游戏后台管理系统</h2>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped>
    .page-home {
        position: relative;
        text-align: center;
        height: 100%;
    }
    .bg {
        height: 100%;
        background: url('../assets/bg.jpg') no-repeat center center;
        background-size: cover;
        filter: blur(2px);
    }
    h2 {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        letter-spacing: 10px;
    }
</style>
