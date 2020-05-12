const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        select: false,   // 查询时不要将密码带出来
        set(val) {
            return require('bcrypt').hashSync(val, 10);
        }
    }
})

module.exports = mongoose.model('AdminUser', Schema);