class Pagination {
    constructor(positionList) {
        this.container = $("#pagination-container");
        this.createDOM().then($.proxy(this.init, this));
        this.positionList = positionList;
    };
    createDOM() {
        return new Promise(resolve => {
            $.get("/html/component/list/pagination.html", resolve);
        })
    }
    init(pageTem) {
        let { current, total } = this.positionList.page;
        let html = new EJS({ text: pageTem }).render({ current, total });
        this.container.html(html);
        this.preBtn = $("#prev-page");
        this.nextBtn = $("#next-page");
        this.pageBtn = $(".page");
        this.bindEvents();
    };
    bindEvents() {
        this.preBtn.on("click", this.preBtnClick.bind(this));
        this.nextBtn.on("click", this.nextBtnClick.bind(this))
    }
    preBtnClick() {
        if (--this.positionList.page.current < 1) {
            this.positionList.page.current = 1;
            return;
        }

        this.positionList.createDOM().then($.proxy(this.positionList.init, this.positionList));
    }
    nextBtnClick() {
        if (++this.positionList.page.current > this.positionList.page.total) {
            //prevBtn禁用
            this.positionList.page.current = this.positionList.page.total;
            return;
        }
        this.positionList.createDOM().then($.proxy(this.positionList.init, this.positionList));
    }
}