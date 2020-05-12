# 【全栈之巅】Node.js + Vue.js 全栈开发王者荣耀手机端官网和管理后台

## 一、 入门

1. 项目介绍
1. 工具安装和环境搭建(nodejs,npm,mongodb)
1. 初始化项目

## 二、 管理后台

1. 基于 Element UI 的后台管理基础界面搭建

1. 创建分类
   - 子路由 el-form axios
   - express.router 子路由，具体使用
   - mongoose：连接 mongodb，创建模型，都是单独的文件夹。==== module.exports 可以导出一个函数
   - {data:{} , status:0 表示请求成功 , msg:请求失败返回的信息}
1. 分类列表
   - get 请求
   - 一般请求在 created 阶段执行，但如果涉及到 dom 操作就要到 mounted 阶段，且放在\$nextTick 函数内部。
   - export const 变量 / export {变量}
1. 修改分类
1. 删除分类
1. 子分类

   - 上下级分类，数据之间使用 id 进行关联，防止修改 name 出错 => 修改 category 数据模型
   - populate('关联值') 将关联值的具体内容显示出来

1. **通用 CRUD 接口**

   - Model.find().setOptions(queryOptions) ==> queryOptions.populate = 'parent'
   - 显示目录 list 的时候，如何将没有上级的首先显示在前面

1. 装备管理
1. 图片上传 (multer)

   - express 无法处理图片数据，需要 multer 插件
   - 将上传的图片放到 upload 文件夹，再将图片给放置后的地址返回给前端，真实项目返回存储在图片服务器的地址
   - 静态资源管理 app.use('/static' , \_\_dirname+'/static')
   - this.\$set(obj , key , val)

1. 英雄管理
1. 编辑英雄 (关联,多选,el-select, multiple)
1. 技能编辑

1. 文章管理
1. 富文本编辑器 (quill)

1. 首页广告管理

1. 管理员账号管理 (bcrypt)
   - axios 响应拦截，一般以 4，5 开头的都会走错误拦截 err.response
   - 数据库找不到值就返回 null
   - localstorage 表示关掉浏览器后存储的数据还在 sessionStorage 表示存储后不在了
1. 登录页面
1. 登录接口 (jwt,jsonwebtoken)
1. 服务端登录校验
1. 客户端路由限制 (beforeEach, meta)
1. 上传文件的登录校验 (el-upload, headers)

## 三、移动端网站

1. "工具样式"概念和 SASS (SCSS)
1. 样式重置
1. 网站色彩和字体定义 (colors, text)
1. 通用 flex 布局样式定义 (flex)
1. 常用边距定义 (margin, padding)
1. 主页框架和顶部菜单
1. 首页顶部轮播图片 (vue swiper)
1. 使用精灵图片 (sprite)
1. 使用字体图标 (iconfont)
1. 卡片组件 (card)
1. 列表卡片组件 (list-card, nav, swiper)
1. 首页新闻资讯-数据录入(+后台 bug 修复)
1. 首页新闻资讯-数据接口
1. 首页新闻资讯-界面展示
1. 首页英雄列表-提取官网数据
1. 首页英雄列表-录入数据
1. 首页英雄列表-界面展示
1. 新闻详情页
1. 新闻详情页-完善
1. 英雄详情页-1-前端准备
1. 英雄详情页-2-后台编辑
1. 英雄详情页-3-前端顶部
1. 英雄详情页-4-完善

## 四、发布和部署 (阿里云)

1. 生产环境编译
1. 购买域名和服务器
1. 域名解析
1. Nginx 安装和配置
1. MongoDB 数据库的安装和配置
1. git 安装、配置 ssh-key
1. Node.js 安装、配置淘宝镜像
1. 拉取代码，安装 pm2 并启动项目
1. 配置 Nginx 的反向代理
1. 迁移本地数据到服务器 (mongodump)

## 五、进阶

1. 使用免费 SSL 证书启用 HTTPS 安全连接
1. 使用阿里云 OSS 云存储存放上传文件
