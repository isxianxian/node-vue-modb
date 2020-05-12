<template>
    <div class="page-hero">
        <div class="topbar bg-black px-3 py-2 d-flex ai-center text-white">
            <img
                src="../assets/img/logo.png"
                height="30"
                @click="$router.push('/home')"
            />
            <div class="mx-2 flex-1">
                <span class="text-white mr-3">王者荣耀</span>
                <span>攻略战</span>
            </div>
            <div>
                更多英雄
                <span class="ml-2 fs-xl">&gt;</span>
            </div>
        </div>
        <div v-if="hero">
            <div
                class="top text-white fs-sm"
                :style="{'background-image':`url(${hero.banner})`}"
            >
                <div
                    class="hero-info px-3 pb-3 b-s h-100 d-flex flex-column jc-end"
                >
                    <div class="title">{{hero.title}}</div>
                    <div class="name fs-xl">
                        <strong>{{hero.name}}</strong>
                    </div>
                    <div>{{hero.categories.map(e=>e.name).join('/')}}</div>
                    <div class="d-flex jc-between ai-center" v-if="hero.scores">
                        <div class="scores">
                            难度
                            <span
                                class="bg-difficult"
                            >{{hero.scores.difficult}}</span>
                            技能
                            <span
                                class="bg-skill"
                            >{{hero.scores.skills}}</span>
                            攻击
                            <span
                                class="bg-attack"
                            >{{hero.scores.attack}}</span>
                            生存
                            <span
                                class="bg-survive"
                            >{{hero.scores.survive}}</span>
                        </div>
                        <div class="ski text-gery fs-xs">皮肤 &gt;</div>
                    </div>
                </div>
            </div>
            <div class="hero-use bg-white">
                <div class="nav d-flex jc-around py-2 ml-3 mr-2 border-bottom">
                    <div
                        class="nav-item"
                        @click="$refs.swiper.$swiper.slideTo(0)"
                    >
                        <div
                            class="nav-link"
                            :class="{'active':slideActIndex==0}"
                        >英雄初识</div>
                    </div>
                    <div
                        class="nav-item"
                        @click="$refs.swiper.$swiper.slideTo(1)"
                    >
                        <div
                            class="nav-link"
                            :class="{'active':slideActIndex==1}"
                        >进阶攻略</div>
                    </div>
                </div>
                <swiper
                    class="swiper-box"
                    ref="swiper"
                    :options="{autoHeight:true}"
                    @slideChange="slideActIndex = $refs.swiper.$swiper.activeIndex"
                >
                    <swiper-slide>
                        <div
                            class="btn-box ml-3 mr-2 d-flex jc-between text-center my-2"
                        >
                            <div
                                class="bg-light flex-1 py-2 px-4 d-flex ai-center jc-center mr-2"
                            >
                                <span
                                    class="iconfont icon-icon-test text-primary fs-xxl mr-2"
                                ></span>
                                英雄介绍视频
                            </div>
                            <div
                                class="bg-light flex-1 py-2 px-4 d-flex ai-center jc-center"
                            >
                                <span
                                    class="iconfont icon-menu text-primary fs-xxl mr-2"
                                ></span>
                                一图识英雄
                            </div>
                        </div>
                        <div class="skills mt-4 mb-1 ml-3 mr-2">
                            <div class="skill-icon d-flex">
                                <div
                                    v-for="(item,i) in hero.skills"
                                    :key="i"
                                    style="width:25%"
                                    class="icon-item px-3 b-s"
                                    @click="skillActIndex=i"
                                >
                                    <img
                                        v-lazy="item.icon"
                                        width="100%"
                                        :class="{'active':skillActIndex==i}"
                                    />
                                </div>
                            </div>
                            <div
                                class="skill-info"
                                v-for="(item,i) in hero.skills"
                                v-show="skillActIndex==i"
                                :key="i"
                            >
                                <div class="my-4">
                                    <strong class="fs-xl">{{item.name}}</strong>
                                    <span
                                        class="fs-xs text-gery ml-4"
                                    >(冷却值{{item.delay}} 消耗{{item.cost}})</span>
                                </div>
                                <p>{{item.description}}</p>
                                <p class="mt-2">小提示：{{item.tips}}</p>
                            </div>
                        </div>
                        <my-card
                            plain
                            noBorder
                            title="加点建议"
                            icon="menu"
                            class="my-2"
                        >
                            <template v-slot:body>
                                <div>
                                    <h3 class="fs-xl fw-normal">顺风出装</h3>
                                    <div
                                        class="d-flex jc-around text-center border-bottom"
                                    >
                                        <div
                                            class="px-2"
                                            v-for="(item ,i) in hero.items1"
                                            :key="i"
                                        >
                                            <img
                                                v-lazy="item.icon"
                                                width="100%"
                                                class="bo-radiu mb-1 mt-3"
                                            />
                                            <p class="fs-xs">{{item.name}}</p>
                                        </div>
                                    </div>
                                    <h3 class="fs-xl fw-normal mt-2">逆风出装</h3>
                                    <div
                                        class="d-flex jc-around text-center border-bottom"
                                    >
                                        <div
                                            class="px-2"
                                            v-for="(item ,i) in hero.items2"
                                            :key="i"
                                        >
                                            <img
                                                v-lazy="item.icon"
                                                width="100%"
                                                class="bo-radiu mb-1 mt-3"
                                            />
                                            <p class="fs-xs">{{item.name}}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </my-card>
                        <my-card
                            plain
                            noBorder
                            title="使用技巧"
                            icon="menu"
                            class="my-2"
                        >
                            <template v-slot:body>
                                <p class="hero-tips">{{hero.usageTips}}</p>
                            </template>
                        </my-card>
                        <my-card
                            plain
                            noBorder
                            title="对抗技巧"
                            icon="menu"
                            class="my-2"
                        >
                            <template v-slot:body>
                                <p class="hero-tips">{{hero.battleTips}}</p>
                            </template>
                        </my-card>
                        <my-card
                            plain
                            noBorder
                            title="团队思路"
                            icon="menu"
                            class="my-2"
                        >
                            <template v-slot:body>
                                <p class="hero-tips">{{hero.teamTips}}</p>
                            </template>
                        </my-card>
                    </swiper-slide>
                    <swiper-slide>
                        <div
                            class="border-bottom py-2 ml-3 mr-2 d-flex"
                            v-for="(item,i) in plans"
                            :key="i"
                        >
                            <div
                                class="bg-black pos-r mr-3 video"
                                style="width:8.9231rem;height:4.9231rem"
                            >
                                <i
                                    class="iconfont icon-icon-test text-white fs-xxl"
                                ></i>
                            </div>
                            <div class="flex-1 d-flex flex-column jc-between">
                                <div>{{item.title}}</div>
                                <div
                                    class="fs-xs text-gery-1 d-flex jc-between"
                                >
                                    <span>
                                        <i class="iconfont icon-icon-test"></i>
                                        {{item.play}}
                                    </span>
                                    <span>{{item.date}}</span>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script>
    import MyCard from '@/components/Card.vue'

    export default {
        props: {
            id: { required: true }
        },
        data() {
            return {
                hero: null,
                skillActIndex: 0,
                slideActIndex: 0,
                plans: [
                    {
                        title: '【快速上手英雄技能】后羿',
                        play: '1775.4万',
                        date: '2017-12-14'
                    },
                    {
                        title: '【王者荣耀】英雄介绍：后羿',
                        play: '1675.4万',
                        date: '2018-2-14'
                    },
                    {
                        title: '零度带你飞40：半神之弓后羿，灼日之矢破苍穹',
                        play: '1375.4万',
                        date: '2019-12-1'
                    },
                    {
                        title:
                            '【上分拍档】第43期 ：后羿+明世隐 连接加成，万箭双飞',
                        play: '775.4万',
                        date: '2017-1-14'
                    },
                    {
                        title:
                            '最强王者18星排位！攻速流后羿一秒18箭超强五杀！瞬秒张飞',
                        play: '175.4万',
                        date: '2017-10-14'
                    },
                    {
                        title:
                            '王者荣耀：国服后羿最全出装和搭配铭文教学，学会了轻松上王者！',
                        play: '75.4万',
                        date: '2019-12-14'
                    },
                    {
                        title: '【快速上手英雄技能】后羿',
                        play: '1775.4万',
                        date: '2017-12-14'
                    },
                    {
                        title: '【王者荣耀】英雄介绍：后羿',
                        play: '1675.4万',
                        date: '2018-2-14'
                    },
                    {
                        title: '零度带你飞40：半神之弓后羿，灼日之矢破苍穹',
                        play: '1375.4万',
                        date: '2019-12-1'
                    }
                ]
            }
        },
        methods: {
            async getHero() {
                this.hero = (await this.$axios.get(`/heroes/${this.id}`)).data
                console.log(this.hero)
            },
            changeSlide() {
                console.log('kk')
            }
        },
        created() {
            this.getHero()
        },
        components: { MyCard }
    }
</script>

<style lang="scss">
    @import '@/assets/scss/_variable.scss';
    @import '@/assets/scss/config.scss';
    .page-hero {
        .top {
            height: 50vw;
            background: #ffffff no-repeat 0 0;
            background-size: 100% 100%;
            div {
                line-height: 1.5rem;
            }
            .hero-info {
                background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
            }
            .scores {
                span {
                    display: inline-block;
                    border-radius: 50%;
                    width: 1.2308rem;
                    height: 1.2308rem;
                    line-height: 1.2308rem;
                    font-size: 0.7692rem;
                    text-align: center;
                    margin: 0 0.25rem 0 0.1rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
            }
        }
        .swiper-box {
            .btn-box {
                div {
                    border: 1px solid #eceef0;
                    border-radius: 4px;
                }
            }
            .skills {
                img {
                    border-radius: 50%;
                    border: 2px solid transparent;
                    &.active {
                        border-radius: 50%;
                        border: 2px solid map-get($map: $color, $key: 'primary');
                    }
                }
            }
            .video {
                .iconfont {
                    @include pos(absolute, 50%, 50%);
                    transform: translate(-50%, -50%);
                    font-size: 24px;
                }
            }
        }
    }
</style>
