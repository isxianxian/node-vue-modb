const jwt = require('jsonwebtoken');
const assert = require('http-assert');
const AdminUsers = require('../model/AdminUser');

module.exports = (option) => {
    const { app } = option;
    return async (req, res, next) => {
        const token = req.headers.authorization.split(' ').pop();
        assert(token, 401, '请先登陆');
        const { id } = jwt.verify(token, app.get('secret'));
        assert(id, 401, '请先登陆');
        const user = AdminUsers.findById(id);
        assert(user, 401, '请先登陆');
        await next();
    }
}