module.exports = (app) => {
    const qiniu = require('qiniu');
    const myconfig = {
        // 个人中心->秘钥管理->AccessKey
        "AK": "r2gFCgsUDwaSX2X0IoHpeTLDj7n5ivnBN2bpvviw",
        // 个人中心->秘钥管理->SecretKey
        "SK": "fciCgvcHUt5kXFwPmQ1h--Fp1HIVq_VjkoTbnPFl",
        // 对象存储->新建存储空间的名字：(你自己创建时候空间名字)，这里我创建的是：jiuchengjsfront
        "Bucket": "hero-game"
    }

    // 获取七牛云token
    app.get('/admin/token', async (req, res) => {
        const mac = new qiniu.auth.digest.Mac(myconfig.AK, myconfig.SK);
        const options = {
            scope: myconfig.Bucket,
            expires: 3600 * 24
        };
        const putPolicy = new qiniu.rs.PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        res.send({
            status: 0,
            data: {
                uploadToken
            }
        })
    })
}