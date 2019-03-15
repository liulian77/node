class Register {
    constructor(container) {
        this.container = container;
        this.creteDOM().then($.proxy(this.init, this));
    }

    creteDOM() {
        return new Promise(resolve => {
            this.container.load("/html/component/common/register.html", resolve);
        })

    }

    init() {
        this.userInput = $("#registerUserInput");
        this.pwdInput = $("#registerPwdInput");
        this.pwdTwoInput = $("#repasswordInput");
        this.btn = $("#register-btn");
        this.succ = $("#register-succ");
        this.fail = $("#register-fail");
        this.closeBtn = $("#register-close");
        this.userErr = $("#userErr");
        this.bindEvents();
    }
    bindEvents() {
        this.btn.on("click", this.handleBtnClick.bind(this));
        this.userInput.on("blur", this.userBlur.bind(this));
        this.pwdInput.on("blur", this.pwdInputBlur.bind(this));
        this.pwdTwoInput.on("blur", this.pwdTwoInputBlur.bind(this));
    }
    userBlur() {
        let text = this.userInput.val();
        let reg = /^.{3,16}$/;
        if (reg.test(text)) {
            this.userErr.addClass("hide")
        } else {
            this.userErr.removeClass("hide").html("请输入3~16位的用户名")
        }
    }
    pwdInputBlur() {
        let text = this.pwdInput.val();
        let reg = /^[a-zA-Z]\w{5,17}$/;
        if (!reg.test(text)) {
            this.userErr.removeClass("hide").html("请输入以字母开头，6~18位字母、数字或下划线")
        } else {
            this.userErr.addClass("hide")
        }
    }
    pwdTwoInputBlur() {
        if (this.pwdTwoInput.val() === this.pwdInput.val()) {
            this.userErr.addClass("hide")
        } else {
            this.userErr.removeClass("hide").html("两次密码要一致")
        }
    }
    handleBtnClick() {
        let username = this.userInput.val(),
            password = this.pwdInput.val(),
            pwdTwo = this.pwdTwoInput.val();
        console.log(username);

        //----------表单验证----------------
        //发送ajax请求
        $.post(baseUrl + "/user/register", { username, password }, $.proxy(this.handleRegisterSucc, this));
    }
    handleRegisterSucc(res) {
        console.log(res);
        if (res.res_code === 1) {
            this.succ.removeClass("hide");
            setTimeout(() => {
                this.succ.addClass("hide");
                this.closeBtn.trigger(new $.Event("click"));
            }, 1000);
        } else {
            this.fail.removeClass("hide");
            setTimeout(() => {
                this.fail.addClass("hide");
            }, 1000);
        }
    }
}