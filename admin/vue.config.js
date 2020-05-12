module.exports = {
    outputDir: __dirname + '/../server/adminPublic',
    publicPath: process.env.NODE_ENV === 'production' ? '/admin' : '/'
}