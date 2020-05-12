<template>
    <div class="page-video" v-if="video">
        <div class="video-box bg-black pos-r" style="height:16.1538rem">
            <div class="iconfont-box text-center">
                <i class="iconfont icon-icon-test text-white"></i>
            </div>
        </div>
        <div class="video-info my-2 b-s m-2 py-2 d-flex">
            <img :src="video.icon" style="height:5.3846rem" />
            <div class="d-flex flex-column ml-2 jc-between">
                <p>{{video.title}}</p>
                <p class="fs-sm text-gery">
                    <span class="mr-2">
                        <i class="iconfont icon-menu1"></i>
                        {{video.count}}
                    </span>
                    <span>
                        <i class="iconfont icon-menu1"></i>
                        {{video.created|showDate}}
                    </span>
                </p>
            </div>
        </div>
        <div class="p-2">
            <h4 class="fw-normal">
                <i class="iconfont icon-menu1 mr-2"></i>猜您喜欢
            </h4>
            <div class="video-like w-100 my-2" v-if="video.related">
                <ul
                    class="d-flex"
                    :style="{'width':`${video.related.length*10.6154}rem`}"
                >
                    <router-link
                        tag="li"
                        :to="`/video/${item._id}`"
                        class="mr-2"
                        style="width:10.6154rem"
                        v-for="(item , i ) in video.related"
                        :key="i"
                    >
                        <img :src="item.icon" class="w-100" />
                        <p class="title text-gery-1">{{item.title}}</p>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import dayjs from 'dayjs'
    export default {
        props: {
            id: String
        },
        data() {
            return {
                video: {},
                allVideo: {}
            }
        },
        methods: {
            async getVideo() {
                this.video = (await this.$axios.get(`/videos/${this.id}`)).data
            }
        },
        created() {
            this.getVideo()
        },
        filters: {
            showDate(val) {
                return dayjs(val).format('MM/DD')
            }
        }
    }
</script>

<style lang="scss">
    @import '@/assets/scss/config.scss';
    .page-video {
        .video-box {
            .iconfont-box {
                width: 5.3846rem;
                height: 3.8462rem;
                line-height: 3.8462rem;
                @include pos(absolute, 50%, 50%);
                transform: translate(-50%, -50%);
                .iconfont {
                    font-size: 2.7692rem;
                }
            }
        }
        .video-info {
            border: 1px solid $border-color;
        }
        .video-like {
            overflow-x: scroll;
            .title {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>
