module.exports = {
    outputDir: __dirname + '/../server/webPublic',
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
}