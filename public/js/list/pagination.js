class Pagination {
    constructor() {
        this.container = $("#pagination-container");
        this.createDOM().then($.proxy(this.init, this))
        this.page = {
            current: 5
        };
        Object.defineProperty(this.page, "count", {
            value: 5,
            writable: false
        })
    };
    createDOM() {
        return new Promise(resolve => {
            $.get("/html/component/list/pagination.html", resolve);
        })
    }
    init(pageTem) {
        let html = new EJS({ text: pageTem }).render({ current: 5, total: 10 });
        this.container.html(html);
        this.preBtn = $("#prev-page");
        this.nextBtn = $("#next-page");
        this.pageBtn = this.container.find(".page");
        this.bindEvents();
    };
    bindEvents() {
        this.preBtn.on("click", this.preBtnClick.bind(this))
    }
    preBtnClick() {
        if (--this.page.current <= 1) {
            this.preBtn.addClass("disabled");
        }
    }
}