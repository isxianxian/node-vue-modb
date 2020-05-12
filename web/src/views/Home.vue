<template>
    <div class="home">
        <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item,i) in slideList" :key="i">
                <a :href="item.url" style="display:block">
                    <img :src="item.image" class="w-100" />
                </a>
            </swiper-slide>
            <div
                class="swiper-pagination pagination-box text-right pr-3 pb-2"
                slot="pagination"
            ></div>
        </swiper>
        <div
            class="home-nav bg-white text-gery text-center pt-3 my-2"
            :class="{'up':showNav}"
        >
            <div class="nav-box d-flex f-wrap">
                <div
                    class="nav-item mb-3 pt-1 b-s"
                    v-for="(item , i) in homeNav"
                    :key="i"
                >
                    <i class="sprite" :class="`sprite-${i}`"></i>
                    <p class="p-1">{{item.name}}</p>
                </div>
            </div>
            <div class="nav-up py-2 bg-light" @click="showNav=!showNav">
                <i class="sprite sprite-arrow pr-2"></i>
                <span>{{showNav?'收起':'展开'}}</span>
            </div>
        </div>
        <my-list-card title="新闻资讯" icon="news" :list="news">
            <template #main="{content}">
                <router-link
                    tag="div"
                    :to="`/article/${item._id}`"
                    v-for="(item , i) in content.newsList"
                    :key="i"
                    class="pb-2 d-flex ai-center fs-lg"
                >
                    <span class="text-info">[{{item.categoryName}}]</span>
                    <span class="mx-1">|</span>
                    <span class="flex-1 text-hide mr-4">{{item.title}}</span>
                    <span class="text-gery">{{item.created|showDate}}</span>
                </router-link>
            </template>
        </my-list-card>
        <my-list-card
            title="英雄列表"
            icon="menu"
            :list="heroes"
            noBorder
            class="my-2"
        >
            <template v-slot:header>
                <img
                    src="../assets/img/nav1.jpeg"
                    width="100%"
                    class="mb-2"
                    style="margin-top:-1rem"
                />
            </template>
            <template #main="{content}">
                <div class="hero-box d-flex f-wrap" style="margin:0 -0.5rem;">
                    <router-link
                        tag="div"
                        :to="`/hero/5eb384dd4d2ee12260a264f8`"
                        style="width:20%;height:7.3077rem"
                        class="hero-item text-center p-2 b-s"
                        v-for="(item , i) in content.heroesList"
                        :key="i"
                    >
                        <img :src="item.avatar" class="w-100" />
                        <p>{{item.name}}</p>
                    </router-link>
                </div>
            </template>
        </my-list-card>
        <my-list-card
            title="视频列表"
            icon="icon-test1"
            :list="videos"
            noBorder
            class="my-2"
            @slide-change="i=>{vidActIndex = i;scrolling=true}"
            v-if="videos"
        >
            <template #main="{content}">
                <router-link
                    tag="div"
                    :to="`/video/${item._id}`"
                    class="d-flex jc-start py-3 border-bottom"
                    v-for="(item,i) in content.videosList"
                    style="height:5.3846rem"
                    :key="i"
                >
                    <img v-lazy="item.icon" style="height:5.3846rem" />
                    <div class="ml-3 d-flex flex-column jc-between">
                        <p class="fs-xl video-title">{{item.title}}</p>
                        <p class="text-gery fs-sm">{{item.created|showDate}}</p>
                    </div>
                </router-link>
            </template>
        </my-list-card>
        <div
            class="see-more text-center bg-white text-gery pb-2"
        >{{seeText}}查看更多</div>
    </div>
</template>

<script>
    import MyListCard from '@/components/ListCard.vue'
    import dayjs from 'dayjs'

    export default {
        name: 'Home',
        data() {
            return {
                swiperOptions: {
                    loop: true,
                    // autoplay: true,
                    pagination: {
                        el: '.swiper-pagination'
                    }
                },
                slideList: [],
                homeNav: [
                    { name: '爆料站' },
                    { name: '故事站' },
                    { name: '周边商城' },
                    { name: '体验服' },
                    { name: '新人专区' },
                    { name: '荣耀~传承' },
                    { name: '模拟战资料库' },
                    { name: '王者营地' },
                    { name: '公众号' },
                    { name: '版本介绍' },
                    { name: '对局环境' },
                    { name: '无限王者团' }
                ],
                showNav: false,
                news: [],
                heroes: [],
                videos: [],
                vidActIndex: 0,
                scrolling: false,
                seeText: '滑动'
            }
        },
        methods: {
            async getHomeSlide() {
                this.slideList = (
                    await this.$axios.get('/ads/home-slide')
                ).data.items
            },
            async getNews() {
                this.news = (await this.$axios.get('/news/list')).data
            },
            async getHeroes() {
                this.heroes = (await this.$axios.get('/heroes/list')).data
            },
            async getVideos() {
                let videos = (await this.$axios.get('/videos/list')).data
                videos.forEach(item => (item.pageNum = 1))
                this.videos = videos
                this.scrolling = true
            },
            async addVideos(params) {
                const vidActIndex = this.vidActIndex
                let newVideos = (await this.$axios.get('/videos/list', { params }))
                    .data
                if (!newVideos.videosList.length) {
                    this.seeText = '点击'
                    return
                }
                this.scrolling = true
                this.videos[vidActIndex].pageNum += 1
                this.videos[vidActIndex].videosList = this.videos[
                    vidActIndex
                ].videosList.concat(newVideos.videosList)
            },
            async wtachScroll() {
                if (!this.scrolling) {
                    return
                }
                const scrollH =
                    document.documentElement.scrollHeight - window.screen.height
                const scrollTop =
                    window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop
                if (scrollH - scrollTop <= 50) {
                    this.scrolling = false
                    const videos = this.videos
                    let { name, pageNum } = videos[this.vidActIndex]
                    pageNum += 1
                    this.addVideos({ name, pageNum })
                }
            },
            tips() {
                console.log(
                    '数据库不完整，所以全部都用的后裔的id，都跳转到后裔的页面上'
                )
            }
        },
        created() {
            this.getNews()
            this.getHeroes()
            this.getVideos()
            this.getHomeSlide()
            this.tips()
            window.addEventListener('scroll', this.wtachScroll)
        },
        components: {
            MyListCard
        },
        filters: {
            showDate(val) {
                return dayjs(val).format('MM/DD')
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/scss/_variable';

    .pagination-box {
        .swiper-pagination-bullet {
            border-radius: 2px;
            opacity: 1;
            background-color: map-get($color, 'white');
            &.swiper-pagination-bullet-active {
                background-color: map-get($color, 'info');
            }
        }
    }
    .home-nav {
        .nav-box {
            height: 4.8462rem;
            overflow: hidden;
            .nav-item {
                width: 25%;
                border-right: 1px solid $border-color;
                .sprite {
                    width: 1.7692rem;
                    height: 1.5385rem;
                    background-position: 63.546% 15.517%;
                }
                .sprite-1 {
                    background-position: 90.483% 15.614%;
                }
                .sprite-2 {
                    background-position: 36.746% 0.924%;
                }
                .sprite-3 {
                    background-position: 10.408% 15.517%;
                }
                &:nth-child(4n) {
                    border-right: none;
                }
            }
        }
        .nav-up {
            .sprite-arrow {
                transform: rotate(180deg);
            }
        }
        &.up {
            .nav-box {
                height: auto;
            }
            .nav-up {
                .sprite-arrow {
                    transform: rotate(0);
                }
            }
        }
    }
    .video-title {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        -webkit-box-orient: vertical;
    }
    .see-more {
        margin-top: -0.7rem;
    }
</style>
