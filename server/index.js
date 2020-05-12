const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// 给app实例设置一个属性
app.set('secret', 'h8hdghsglk');

app.use(require('cors')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(__dirname + '/webPublic'))
app.use('/admin', express.static(__dirname + '/adminPublic'))
app.use('/uploads', express.static(__dirname + '/uploads'))


require('./plugins/db.js')(app);
// admin路由
require('./admin/index.js')(app);
require('./web/index.js')(app);



app.listen(4000, () => {
    console.log('4000端口 admin服务已经开启！')
})