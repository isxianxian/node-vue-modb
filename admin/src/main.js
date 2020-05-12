import Vue from 'vue'
import App from './App.vue'
import axios from './api/axios';
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style.css';


Vue.use(Element)
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

Vue.mixin({
    data() {
        return {
            // 创建的存储空间对应的上传地址
            qiniuDomain: 'https://upload-z2.qiniup.com',
            // 创建成功后官方随机分配的公开图片地址前缀，即上传成功后对应的公用图片地址前缀
            qiniuViewHost: 'http://qa47jmcsm.bkt.clouddn.com',
        }
    },
    methods: {
        getAuthHeaders() {
            const token = localStorage.getItem('token') || '';
            return {
                Authorization: `Bearer ${token}`
            }
        },
        // 上传到七牛云
        async upLoadToQiniu(req) {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }
            let fileType = ''
            if (req.file.type === 'image/png') {
                fileType = 'png'
            } else {
                fileType = 'jpg'
            }
            // 重命名要上传的文件
            const keyname = `${new Date().getTime()}${Math.random()
                .toString(36)
                .slice(2)}.${fileType}`
            // 上传时候的Token,可前端自己生成,安全起见后端生成！
            //  这里是express后端生成的Token

            const res = await this.$axios.get('/token')
            const token = res.uploadToken
            const formdata = new FormData()
            formdata.append('file', req.file)
            formdata.append('token', token)
            formdata.append('key', keyname)
            const result = await this.$axios.post(
                this.qiniuDomain,
                formdata,
                config
            )
            // this.$set(this.model, 'icon', `${this.qiniuViewHost}/${result.key}`)
            return result;
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
