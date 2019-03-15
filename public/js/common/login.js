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
        this.userInput = $("#loginUserInput");
        this.pwdInput = $("#loginPasswordInput");
        this.btn = $("#login-btn");
        this.succ = $("#login-succ");
        this.fail = $("#login-fail");
        this.closeBtn = $("#login-close");
        this.unloginUl = $("#unlogin-ul");
        this.loginUl = $("#login-ul");
        this.userSpan = $("#user-span");
        this.logoutBtn = $("#logout-btn");
        this.bindEvents();
        this.loginState();
    }
    bindEvents() {
        this.btn.on("click", this.loginClick.bind(this));
        this.logoutBtn.on("click", this.logoutBtnClick.bind(this))
    }
    loginClick() {
        let username = this.userInput.val(),
            password = this.pwdInput.val();

        $.post(baseUrl + "/user/login", { username, password }, $.proxy(this.loginSucc, this));
    }
    loginSucc(res) {
        if (res.res_code === 1) {
            this.loginState();
        } else {
            this.fail.removeClass("hide");
            setTimeout(() => {
                this.fail.addClass("hide");

            }, 1000);
        }
    }
    loginState() {
        $.post("/user/isLogin", this.loginIsLogin.bind(this))
    }
    loginIsLogin(res) {
        if (res.res_code === 1) {
            this.succ.removeClass("hide");
            setTimeout(() => {
                this.succ.addClass("hide");
                this.closeBtn.trigger(new $.Event("click"));
                this.unloginUl.addClass("hide");
                this.userSpan.html(res.res_body.username);
                this.loginUl.removeClass("hide");
            }, 1000);
        }
    }
    logoutBtnClick() {
        $.get("/user/logout", this.logoutBtnSucc.bind(this))
    }
    logoutBtnSucc(res) {
        if (res.res_code === 1) {
            alert(res.res_message);
            this.unloginUl.removeClass("hide");
            this.loginUl.addClass("hide");
        }
    }
}