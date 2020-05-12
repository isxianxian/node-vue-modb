const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: { type: "String" },
    // 数据库中的一个值指向另一个值
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

Schema.virtual('children', {
    localField: '_id',  // 内键：Schema的内键
    ref: 'Category',
    foreignField: 'parent',
    justOne: false
})

Schema.virtual('newsList', {
    localField: '_id',  // 内键：Schema的内键
    ref: 'Article',
    foreignField: 'categories',
    justOne: false
})

Schema.virtual('videosList', {
    localField: '_id',  // 内键：Schema的内键
    ref: 'Video',
    foreignField: 'categories',
    justOne: false
})

module.exports = mongoose.model('Category', Schema);