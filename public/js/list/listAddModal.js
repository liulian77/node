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
    init() {}
}