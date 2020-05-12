<template>
    <div class="page-article">
        <div class="d-flex ai-center p-2 border-bottom">
            <div
                class="iconfont icon-back-line fs-xll text-blue"
                @click="$router.back()"
            ></div>
            <div class="flex-1 text-blue mr-2 text-hide mr-4">
                <strong>{{content.title}}</strong>
            </div>
            <div class="fs-xs text-gery">2019-01-10</div>
        </div>
        <div v-html="content.body" class="py-1 px-4 fs-xl main"></div>
        <div class="py-2 px-4 fs-xl mb-4">
            <div class="related d-flex ai-center mt-2 pb-2">
                <i class="iconfont icon-menu1"></i>
                <strong class="text-blue ml-2">相关资讯</strong>
            </div>
            <router-link
                tag="div"
                :to="`/article/${item._id}`"
                v-for="(item,i) in content.related"
                :key="i"
                class="d-flex fs-lg jc-between py-1"
            >
                <p class="text-hide mr-4">{{item.title}}</p>
                <span>{{item.created|showDate}}</span>
            </router-link>
        </div>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    export default {
        props: {
            id: { required: true }
        },
        data() {
            return {
                content: {}
            }
        },
        methods: {
            async getArticle() {
                this.content = (await this.$axios.get(`/article/${this.id}`)).data
                console.log(this.content)
            }
        },
        created() {
            this.getArticle()
        },
        filters: {
            showDate(val) {
                return dayjs(val).format('MM/DD')
            }
        }
    }
</script>

<style lang="scss">
    .page-article {
        .main {
            p {
                line-height: 1.5em;
            }
            img {
                max-width: 100%;
                height: auto;
            }
        }
        .related {
            .icon-menu1 {
                font-size: 1.5385rem;
            }
        }
    }
</style>
