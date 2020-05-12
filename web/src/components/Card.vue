<template>
    <div class="card bg-white p-3">
        <div
            class="card-header d-flex js-around ai-center"
            :class="{'border-bottom':!noBorder , 'pb-3':!plain}"
        >
            <i class="iconfont fs-xl" :class="`icon-${icon}`"></i>
            <h3
                class="flex-1 fs-xl ml-2"
                :class="{'fw-normal':!plain}"
            >{{title}}</h3>
            <i class="iconfont icon-menu-p fs-xl" v-if="!plain"></i>
        </div>
        <div class="card-body pt-2">
            <slot name="body"></slot>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'card',
        props: {
            title: String,
            icon: String,
            plain: Boolean,
            noBorder: Boolean
        }
    }
</script>


