const UserModel = require("../model/user");
const crypto = require("crypto");
module.exports = {
    register: (req, resp, next) => {
        let { username, password } = req.body;
        password = crypto.createHash("md5").update(password).digest("hex");
        UserModel.save({ username, password }).then(docs => {
            resp.json({
                "res_code": 1,
                "res_message": "注册成功"
            });
        }).catch(() => {
            resp.json({
                "res_code": 0,
                "res_message": "注册失败"
            });
        })
    },
    login: (req, resp, next) => {
        let { username, password } = req.body;
        password = crypto.createHash("md5").update(password).digest("hex");
        UserModel.find({ username, password }).then(docs => {
            if (docs.length >= 1) {
                //存session
                req.session = {
                        isLogin: true,
                        user: docs
                    },
                    resp.json({
                        "res_code": 1,
                        "res_message": "登录成功"
                    });
            } else {
                resp.json({
                    "res_code": 0,
                    "res_message": "用户名或密码错误"
                });
            }
        }).catch(() => {
            resp.json({
                "res_code": 0,
                "res_message": "网络连接失败"
            });
        })
    },
    isLogin: (req, resp, next) => {
        if (req.session.isLogin) {
            resp.json({
                res_code: 1,
                res_body: {
                    username: req.session.user[0].username
                }
            })
        } else {
            resp.json({
                res_code: 0,
                res_body: null
            })
        }
    },
    logout: (req, res, next) => {
        req.session = null;
        res.json({
            res_code: 1,
            res_message: "退出成功"
        })
    }
}