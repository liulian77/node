// list页面的主要业务逻辑

class List {
    constructor() {
        this.createHeader();
        this.createList();
    }

    createHeader() {
        new Header($("header"), $("#login-model-contanier"), $("#register-model-contanier"), "list");

    }

    createList() {
        new PositionList($("#list-container"));
        new PositionAdd();
        new Pagination();
    }

}
new List();