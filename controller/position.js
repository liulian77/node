const PositionModel = require("../model/position");

module.exports = {
    get: (req, resp, next) => {
        let { current, count } = req.query;
        let total;
        // 判断current是否越界
        // 从数据库里取到所有数据，判断是否有current这一页
        PositionModel.findAll().then(docs => {
            // 根据总数据量集权总页数
            total = Math.ceil(docs.length / count);
            if (current > total) current = total;
        }).then(() => {
            PositionModel.find(current, count).then(docs => {
                resp.json({
                    "res_code": 1,
                    "res_body": {
                        "list": docs,
                        "current": current,
                        "total": total
                    }
                })
            }).catch(() => {
                resp.json({
                    "res_code": 0,
                    "res_body": {}
                })
            })
        })

    },

    add: (req, resp, next) => {
        let { position, company, salary } = req.body;
        // let logo = req.file.filename;
        if (req.file) {
            var logo = req.file.filename;
        } else {
            var logo = "";
        }
        PositionModel.save({ position, company, salary, logo }).then(() => {
            resp.json({
                "res_code": 1,
                "res_message": "新增职位信息成功"
            })
        }).catch(() => {
            resp.json({
                "res_code": 0,
                "res_message": "网络错误，请重试"
            })
        })
    }
}