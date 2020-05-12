const mongoose = require('mongoose');
const Scheam = new mongoose.Schema({
    title: { type: String },    // 标题
    duration: { type: String },
    count: { type: String },
    content: { type: String },
    icon: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
}, { timestamps: { createdAt: 'created' } })

module.exports = mongoose.model('Video', Scheam, 'videos');