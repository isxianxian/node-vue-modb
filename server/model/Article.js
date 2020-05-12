const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    title: { type: String },    // 标题
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    body: { type: String },
}, { timestamps: { createdAt: 'created' } })

module.exports = mongoose.model('Article', Schema);