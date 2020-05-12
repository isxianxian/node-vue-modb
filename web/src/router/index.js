import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
const Article = () => import("../views/Article.vue")
const Hero = () => import("../views/Hero.vue")
const Video = () => import("../views/Video.vue")


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: '/home', component: Home
            },
            {
                path: '/article/:id', component: Article, props: true
            },
            {
                path: '/video/:id', component: Video, props: true
            }
        ]
    },
    { path: '/hero/:id', component: Hero, props: true }
]

const router = new VueRouter({
    linkActiveClass: 'active',
    routes
})

export default router
