module.exports = (app) => {
    const express = require('express');
    // 子路由，用于分散路由
    const router = express.Router();
    const jwt = require('jsonwebtoken');
    // 验证某个值并返回错误状态码和错误信息的插件
    const assert = require('http-assert');
    const modelObj = {
        'categories': 'Category',
        'items': 'Item',
        'heros': 'Hero',
        'articles': 'Article',
        'ads': 'Ad',
        'adminusers': 'AdminUser',
        'videos': 'Video'
    }

    const authMiddleware = require('../middleware/auth')({ app });
    const resourceMiddleware = require('../middleware/resource');


    router.get('/', authMiddleware, async (req, res) => {
        // populate('parent') 将关联值的具体内容显示出来
        const queryOptions = {};
        const Model = req.model;
        if (Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const list = await Model.find().setOptions(queryOptions);
        res.send({
            data: list,
            status: 0
        })
    })
    router.post('/', authMiddleware, async (req, res) => {
        const Model = req.model;
        const item = await Model.create(req.body);
        res.send({
            data: item,
            status: 0
        })
    })
    router.get('/:id', authMiddleware, async (req, res) => {
        const Model = req.model;
        const item = await Model.findById(req.params.id);
        res.send({
            status: 0,
            data: item,
            msg: ''
        })
    })
    router.put('/:id', authMiddleware, async (req, res) => {
        const Model = req.model;
        let item = await Model.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            status: 0,
            data: item,
            msg: ''
        })
    })
    router.delete('/:id', authMiddleware, async (req, res) => {
        const Model = req.model;
        await Model.findByIdAndDelete(req.params.id);
        res.send({
            status: 0,
            data: { success: true },
            msg: ''
        })
    })

    // 当访问/admin的时候，路由就会转到router上找具体的路由
    app.use('/admin/rest/:resource', resourceMiddleware(), router);

    // 使用multer处理图片
    const multer = require('multer');
    // 上传图片的地址 
    const upload = multer({ dest: __dirname + '../../uploads' })
    // upload.single('file') 单张处理图片，并将处理后的结果放在req上
    app.post('/admin/upload', authMiddleware, upload.single('file'), (req, res) => {
        const file = req.file;
        file.url = `http://localhost:4000/uploads/${file.filename}`
        res.send({
            status: 0,
            data: file
        });
    })

    // 七牛云
    require('../qiniu')(app)

    // 登陆
    app.post('/admin/login', async (req, res) => {
        const { username, password } = req.body;
        const AdminUsers = require('../model/AdminUser');

        // select + 被强制选择 -被排除 就是一个字段是否显示出来
        const user = await AdminUsers.findOne({ username }).select('+password');
        if (!user) {
            res.status(422).send({
                status: 1,
                data: null,
                msg: '用户名不存在'
            })
            return;
        }

        let correct = require('bcrypt').compareSync(password, user.password);
        if (!correct) {
            return res.status(422).send({
                status: 1,
                data: null,
                msg: '密码不正确'
            })
        }

        // app.get(key) 获取key的值，和路由get(path , ()=>{})冲突，以参数个数来判断，两个就是路由
        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({
            status: 0,
            data: {
                user,
                token
            },
            msg: ''
        })
    })


}
