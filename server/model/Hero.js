const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    banner: { type: String },   // 背景图
    title: { type: String },    // 别名
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        delay: { type: String },
        cost: { type: String },
        description: { type: String },
        tips: { type: String },
    }],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 出装推荐
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], // 铭文推荐
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [{    // 英雄关系
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String },
    }],
})

module.exports = mongoose.model('Hero', Schema, 'heroes');