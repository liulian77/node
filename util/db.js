//只负责连接数据库
//引入模块
const mongoose = require('mongoose');
//连接本地1810数据库
mongoose.connect('mongodb://localhost/lagou');

//得到连接的实例
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected!");
});

module.exports = mongoose;