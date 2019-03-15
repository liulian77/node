const multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function(req, file, cb) {
        console.log(file);
        cb(null, Date.now() + file.originalname);
    }
})

module.exports = multer({ storage });