//首页业务逻辑
function Index() {

}

$.extend(Index.prototype, {
    init() {
        //处理header模块
        //传入header、login、register的容器盒子
        new Header($("header"), $("#login-model-contanier"), $("#register-model-contanier"));
    }
});


new Index().init();