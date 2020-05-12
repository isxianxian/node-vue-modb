<template>
    <div>
        <div class="top-bar-box px-3 py-2">
            <div class="top-bar d-flex ai-center bg-black px-3 py-2 b-s">
                <img
                    @click="$router.push('/home')"
                    src="../assets/img/logo.png"
                />
                <div class="mx-2 flex-1">
                    <p class="text-white">王者荣耀</p>
                    <p class="text-gery-1 fs-xxs">团队成就更多</p>
                </div>
                <button class="btn bg-primary text-black">立即下载</button>
            </div>
        </div>
        <nav class="nav nav-inverse jc-around bg-primary pt-3 pb-2">
            <div class="nav-item">
                <router-link class="nav-link pb-1" tag="div" to="/">首页</router-link>
            </div>
            <div class="nav-item">
                <div class="nav-link pb-1" tag="div" to="/">攻略中心</div>
            </div>
            <div class="nav-item">
                <div class="nav-link pb-1" tag="div" to="/">赛事中心</div>
            </div>
        </nav>
        <router-view :key="$route.path" />
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>
<style lang="scss">
    .top-bar-box {
        height: 2.3077rem;
        .top-bar {
            position: fixed;
            z-index: 2;
            top: 0;
            left: 0;
            width: 100%;
            img {
                height: 2.3077rem;
            }
        }
    }
</style>

