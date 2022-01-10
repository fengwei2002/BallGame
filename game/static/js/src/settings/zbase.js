class Settings {
    constructor(game_root) {
        this.game_root = game_root;
        this.platform = "WEB";
        if (this.game_root.AcWingOS) this.platform = "ACAPP";
        this.username = "no_user";
        this.photo = "no_photo";

        this.settings_box = $(`<h1> hhhh <h1/>`);
        this.login_box = $(`<div>login </div>`);
        this.register_box = $(`<div> register </div>`);

        this.game_root.game.append(this.settings_box);

        this.start();
    }

    start() {
        this.settings_box.show();
        this.get_info(this.game_root);
    }

    // TODO fetch api 实现
    // TODO 使用 XMLHttp 请求库实现对象的具体赋值。。。。。
    get_info() {
        let outer = this;

        $.ajax({
            url: "https://app786.acapp.acwing.com.cn/settings/get_info/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function (resp) {
                if (resp.result === "success") {
                    console.log(resp);
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.settings_box.hide();
                    outer.game_root.menu.show();
                } else {
                    outer.game_root.menu.hide();
                    outer.start_login();
                }
            },
        });
    }

    start_register() {
        this.login_box.hide();
        this.register_box.show();
    }

    start_login() {
        this.register_box.hide();
        this.login_box.show();
    }
}
