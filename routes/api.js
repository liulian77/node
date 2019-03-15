var express = require('express');
var router = express.Router();
const UserController = require("../controller/user");
const PositionController = require("../controller/position");
const upload = require("../util/upload");

router.post("/user/register", UserController.register);
router.post("/user/login", UserController.login);

router.post("/user/isLogin", UserController.isLogin);
router.get("/user/logout", UserController.logout);

router.get("/position/get", PositionController.get);
router.post("/position/add", upload.single("logo"), PositionController.add);
module.exports = router;