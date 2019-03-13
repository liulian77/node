class Header {
    constructor(container, loginContainer, registerContainer, page) {
            this.container = container;
            this.loginContainer = loginContainer;
            this.registerContainer = registerContainer;
            this.page = page;
            //把init交给proxy去代理执行，并且把init内部的this指向变成当前this
            this.createDOM().then($.proxy(this.init, this));
        }
        //加载header的html
    createDOM() {
        return new Promise(resolve => {
            this.container.load("/html/component/common/header.html", resolve);
        })

    }

    init() {
        new Login(this.loginContainer);
        new Register(this.registerContainer);
        this.nav();
    }
    nav() {
        let aLi = $("#my-nav").children();
        switch (this.page) {
            case "/":
                aLi.eq(0).addClass("active");
                break;
            case "/list":
                aLi.eq(1).addClass("active");
                break;
        }
    }

}