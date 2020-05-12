import axios from 'axios';
import router from '../router';
import { Message } from 'element-ui';

axios.defaults.baseURL = process.env.VUE_APP_URL || '/admin';

// 请求拦截器
axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, err => {
    err.response.data.msg ? Message.error(err.response.data.msg) : '';
})
//响应拦截器即异常处理
axios.interceptors.response.use(res => {
    if (res.config.url == 'https://upload-z2.qiniup.com') {
        return res.data;
    }
    let { data, status } = res.data;
    // 请求成功
    if (status == 0) {
        return data;
    } else {
        return Promise.reject(res.data.msg);
    }
}, err => {
    let msg = err.response.data.msg || err.response.data.message,
        status = err.response.status;
    msg ? Message.error(msg) : '';
    // status == 401 ? router.push('/login') : ""
    status == 402 ? router.push('/login') : ""
})

export default axios;