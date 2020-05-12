const modelObj = {
    'categories': 'Category',
    'items': 'Item',
    'heros': 'Hero',
    'articles': 'Article',
    'ads': 'Ad',
    'adminusers': 'AdminUser',
    'videos': 'Video'
}

module.exports = option => {
    return async (req, res, next) => {
        const model = modelObj[req.params.resource];
        req.model = require(`../model/${model}`);
        next();
    }
}