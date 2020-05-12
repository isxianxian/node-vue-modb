module.exports = (app) => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/node-vue-mododb', { useNewUrlParser: true, useUnifiedTopology: true })

    require('require-all')(__dirname + '/../model');
}