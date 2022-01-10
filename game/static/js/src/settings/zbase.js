class Settings {
    constructor(game_root) {
        this.game_root = game_root;
        this.platform = "WEB";
        if (this.game_root.AcWingOS) this.platform = "ACAPP";

        this.username = "no_user";
        this.photo = "no_photo";

        this.start();
    }

    start() {
        this.get_info(this.game_root);
    }

    register() {

    }

    login() {

    }

    // TODO fetch api 实现
    // TODO 使用 XMLHttp 请求库实现对象的具体赋值。。。。。
    get_info(game_root) {

    }

    hide() {
        console.log("outer hide")
    }

    show() {
        console.log("outer show")
    }
}