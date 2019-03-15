class PositionList {
    constructor(container) {
        this.container = container;
        //确定当前页码，以及每一页多少条数据
        this.page = {
            current: 1
        };
        //给this.page定义一个count属性，值为5，不能被修改(ES5)
        Object.defineProperty(this.page, "count", {
            value: 5,
            writable: false
        });
        this.createDOM().then($.proxy(this.init, this));
    }

    createDOM() {
        return new Promise(resolve => {
            $.get("/html/component/list/listTable.html", resolve);
        })
    }
    init(listTemplate) {
        let { current, count } = this.page;
        // console.log(current, count)
        $.get(baseUrl + "/position/get", { current, count }, $.proxy(this.getPositionSucc, this, listTemplate));

    }
    getPositionSucc(listTemplate, res) {
        this.page.current = res.res_body.current;
        this.page.total = res.res_body.total;
        let html = new EJS({ text: listTemplate }).render({
            list: res.res_body.list,
            current: this.page.current,
            count: this.page.count
        });
        this.container.html(html);
        this.addEvents();
        //渲染分页
        new Pagination(this);
    }
    addEvents() {
        this.container.on("click", "button", this.editBtnClick)
    }
    editBtnClick() {
        let $tr = $(this).parents("tr");
        if ($(this).hasClass("editBtn")) {
            $tr.addClass("edit").find("span").each(function(index, cur) {
                $(cur).next().val($(cur).html())
            })
        } else if ($(this).hasClass("okBtn")) {
            $tr.removeClass("edit").find("span").each(function(index, cur) {
                $(cur).html($(cur).next().val())
            })
        } else if ($(this).hasClass("cancelBtn")) {
            $tr.removeClass("edit");
        } else if ($(this).hasClass("delBtn")) {
            $tr.remove();
        }
    }
}