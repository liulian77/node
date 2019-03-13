class PositionList {
    constructor(container) {
        this.container = container;
        this.createDOM().then($.proxy(this.addEvents, this));
    }

    createDOM() {
        return new Promise(resolve => {
            this.container.load("/html/component/list/listTable.html", resolve);
        })
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