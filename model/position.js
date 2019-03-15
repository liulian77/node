const mongoose = require("../util/db");

let positionSchema = new mongoose.Schema({
    position: String,
    company: String,
    salary: String,
    logo: String
});

//利用结构化的schema生成一个model
let positionModel = mongoose.model('position', positionSchema);

//增删该改查的工具
module.exports = {
    find: (current, count) => {
        return new Promise((resolve, reject) => {
            positionModel.find(null, null, { skip: (current - 1) * count, limit: Number(count) }, (err, docs) => {
                if (err) reject();
                else resolve(docs);
            })
        })
    },
    findAll: () => {
        return new Promise((resolve, reject) => {
            positionModel.find((err, docs) => {
                if (err) reject();
                else resolve(docs);
            })
        })
    },
    save: (positionInfo) => {
        let position = new positionModel(positionInfo);
        // console.log(positionInfo);
        return new Promise((resolve, reject) => {
            position.save(err => {
                if (err) reject();
                else resolve();
            });
        })
    }
}