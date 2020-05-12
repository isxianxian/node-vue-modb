const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: { type: "String" },
    // 图片资源大，所以一般图片保存在单独的服务器上，在这存储的图片的地址字符串
    icon: { type: "String" }
})

module.exports = mongoose.model('Item', Schema);