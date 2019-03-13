//登录模块
class Login {
    constructor(container) {
        this.container = container;
        this.createDOM().then($.proxy(this.init, this));
    }

    createDOM() {
        return new Promise(resolve => {
            $(this.container).load("/html/component/common/login.html", resolve);
        })
    }

    init() {

    }

}