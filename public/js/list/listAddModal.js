class PositionAdd {
    constructor() {
        this.container = $("#position-add-model-container");
        this.createDOM().then($.proxy(this.init, this))
    }
    createDOM() {
        return new Promise(resolve => {
            this.container.load("/html/component/list/listAddModal.html", resolve);
        })
    }
    init() {
        this.nameInput = $("#nameInput");
        this.companyInput = $("#companyInput");
        this.salaryInput = $("#salaryInput");
        this.logoInput = $("#logoInput");
        this.addBtn = $("#add-position-btn");
        this.succ = $("#add-succ");
        this.fail = $("#add-fail");
        this.closeBtn = $("#add-position-close");
        this.addPosition();
    }
    addPosition() {
        this.addBtn.on("click", this.addBtnClick.bind(this))
    }
    addBtnClick() {
        let formData = new FormData();
        formData.append("position", this.nameInput.val());
        formData.append("company", this.companyInput.val());
        formData.append("salary", this.salaryInput.val());
        formData.append("logo", this.logoInput.get(0).files[0]);
        $.ajax({
            url: baseUrl + "/position/add",
            method: "POST",
            // 告诉jQuery不用再去处理数据了，因为formData已经处理好了
            processData: false,
            // 告诉jquery不要处理content-type
            contentType: false,
            data: formData,
            success: $.proxy(this.handleAddPositionSucc, this)
        })

    }
    handleAddPositionSucc(res) {
        if (res.res_code === 1) {
            this.succ.html(res.res_message).removeClass("hide");
            setTimeout(() => {
                this.succ.addClass("hide");
                this.closeBtn.trigger(new $.Event("click"));
            }, 1000);
        } else {
            this.fail.html(res.res_message).removeClass("hide");
            setTimeout(() => {
                this.fail.addClass("hide");
            }, 1000);
        }
    }
}