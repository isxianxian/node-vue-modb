# 【全栈之巅】Node.js + Vue.js 全栈开发王者荣耀手机端官网和管理后台

## 技术栈

【前端】

- vue：使用指令，插槽，组件等构建页面。
- vue-router：实现路由管理，页面跳转，路由拦截等功能，使用路由懒加载优化性能。
- vue-cli：脚手架，快速创建页面
- ES6：ECMAScript 新一代语法，包括模块化、解构赋值、Promise、async/await 等方法
- element-ui：基于 vue 的网站快速成型工具，快速开发管理后台页面
- axios：基于 promise 的 HTTP 库，与后台进行数据交互；封装，统一处理不同的 http 状态码
- eslint：代码风格检查工具，规范代码书写
- vue-lazyload：图片懒加载库，实现图片懒加载，优化页面加载速度
- vue-awesome-swiper：插件，实现轮播图或信息滑动组件
- dayjs：日期格式话插件

【后端】

- node：通过 express 框架进行服务监听，静态资源管理，路由分发，请求处理。
- body-parser：获取 post 时 req.body 中传递的数据
- cors：允许跨域
- bcrypt：将密码加密后存储到数据库
- jsonwebtoken：发放，检验 token，验证请求权限

【数据库】

- mongoDB：NoSQL 数据库，使用 mongoose 进行 mongoDB 快速建模

## 实现细节

【前端】

- 主要页面
  - 后台系统:各类型创建页，列表页，登陆页面
  - 游戏官网：官网首页，英雄详情页，新闻详情页，视频详情页
- sass 定义样式变量，样式函数，动态样式类，进行页面快速开发
- 使用 slot 开发组件，并给 slot 传参，提高组件的复用率
- 使用 swiper 开发轮播图和信息切换页
- 利用 window 的 scroll 事情监听页面滚动，实现滑动加载数据

【后端】

- 路由分发
- 通用 CRUD 接口（因为管理后台的接口操作大致一样）（不同的模型相同的操作）
- 中间件（用户权限校核 ，数据模块获取）

【数据库】

- 数据库连接，数据模型创建
- 数据增删查改
  - 根据条件数据查询，如使用 populate 关联查询，aggregate 聚合查询
  - 翻页效果：使用 skip，limit 限制数据
