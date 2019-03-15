const mongoose = require("../util/db");

let userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//利用结构化的schema生成一个model
let UserModel = mongoose.model('user', userSchema);

//增删该改查的工具
module.exports = {
    save: userInfo => {
        let user = new UserModel(userInfo);
        return new Promise((resolve, reject) => {
            user.save((err, docs) => {
                if (err) reject();
                else resolve(docs);
            })
        })
    },
    // 查询
    find: (userinfo) => {
        return new Promise((resolve, reject) => {
            UserModel.find(userinfo, (err, docs) => {
                if (err) reject();
                else resolve(docs);

            })
        })

    }
}