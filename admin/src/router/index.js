import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import CategoryCreate from '../views/CategoryCreate.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemCreate from '../views/ItemCreate.vue'
import ItemList from '../views/ItemList.vue'

import HeroCreate from '../views/HeroCreate.vue'
import HeroList from '../views/HeroList.vue'

import ArticleCreate from '../views/ArticleCreate.vue'
import ArticleList from '../views/ArticleList.vue'

import AdsCreate from '../views/AdsCreate.vue'
import AdsList from '../views/AdsList.vue'

import AdminUserCreate from '../views/AdminUserCreate.vue'
import AdminUserList from '../views/AdminUserList.vue'

import VideoCreate from '../views/VideoCreate.vue'
import VideoList from '../views/VideoList.vue'

Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/home',
            children: [
                { path: 'home', component: Home },

                { path: 'categories/create', component: CategoryCreate },
                { path: 'categories/list', component: CategoryList },
                { path: 'categories/edit/:id', component: CategoryCreate, props: true },

                { path: 'items/create', component: ItemCreate },
                { path: 'items/list', component: ItemList },
                { path: 'items/edit/:id', component: ItemCreate, props: true },

                { path: 'heros/create', component: HeroCreate },
                { path: 'heros/list', component: HeroList },
                { path: 'heros/edit/:id', component: HeroCreate, props: true },

                { path: 'articles/create', component: ArticleCreate },
                { path: 'articles/list', component: ArticleList },
                { path: 'articles/edit/:id', component: ArticleCreate, props: true },

                { path: 'ads/create', component: AdsCreate },
                { path: 'ads/list', component: AdsList },
                { path: 'ads/edit/:id', component: AdsCreate, props: true },

                { path: 'adminusers/create', component: AdminUserCreate },
                { path: 'adminusers/list', component: AdminUserList },
                { path: 'adminusers/edit/:id', component: AdminUserCreate, props: true },

                { path: 'videos/create', component: VideoCreate },
                { path: 'videos/list', component: VideoList },
                { path: 'videos/edit/:id', component: VideoCreate, props: true },
            ]
        },
        {
            path: '/login',
            component: Login,
            meta: { isPublic: true }
        }
    ]
})

router.beforeEach((to, from, next) => {
    // to.path 也可以判断 ， meta:{isPublic:true}
    if (!to.meta.isPublic && !localStorage.getItem('token')) {
        next('/login');
    }
    next();
})

export default router
