<template>
    <div>
        <my-card
            :title="title"
            :icon="icon"
            :noBorder="noBorder"
            :plain="plain"
        >
            <template v-slot:body>
                <slot name="header"></slot>
                <div class="nav jc-between">
                    <div class="nav-item" v-for="(item ,i ) in list" :key="i">
                        <div
                            class="nav-link"
                            :class="{'active':i===activeIndex}"
                            @click="$refs.list.$swiper.slideTo(i)"
                        >{{item.name}}</div>
                    </div>
                </div>
                <div class="pt-2">
                    <swiper
                        ref="list"
                        @slideChange="changeSlide"
                        :options="{autoHeight:true}"
                    >
                        <swiper-slide v-for="(item , i) in list" :key="i">
                            <slot name="main" :content="item"></slot>
                        </swiper-slide>
                    </swiper>
                </div>
            </template>
        </my-card>
    </div>
</template>

<script>
    import MyCard from '@/components/Card.vue'
    export default {
        props: {
            title: { type: String, required: true },
            icon: { type: String, required: true },
            list: { type: Array, required: true },
            plain: Boolean,
            noBorder: Boolean
        },
        data() {
            return {
                activeIndex: 0
            }
        },
        methods: {
            changeSlide() {
                this.activeIndex = this.$refs.list.$swiper.activeIndex
                this.$emit('slide-change', this.activeIndex)
            }
        },
        mounted() {},
        components: {
            MyCard
        }
    }
</script>

<style scoped>
</style>
