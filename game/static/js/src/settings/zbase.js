class Settings {
    constructor(game_root) {
        this.game_root = game_root;
        this.platform = "WEB";
        if (this.game_root.AcWingOS) this.platform = "ACAPP";
        this.username = "no_user";
        this.photo = "no_photo";

        this.settings_box = document.createElement("div");
        this.settings_box.className = "game-settings";
        this.settings_box.innerHTML = `
        <section class="game-settings-login">
        <!-- 背景颜色 -->
        <div class="color"></div>
        <div class="color"></div>
        <div class="color"></div>
        <div class="box">
            <!-- 背景圆 -->
            <div class="circle" style="--x: 0"></div>
            <div class="circle" style="--x: 1"></div>
            <div class="circle" style="--x: 2"></div>
            <div class="circle" style="--x: 3"></div>
            <div class="circle" style="--x: 4"></div>
            <div class="circle" style="--x: 5"></div>
            <div class="circle" style="--x: 6"></div>
            <!-- 登录框 -->
            <div class="container">
                <div class="form">
                    <div class="info-title">
                        <span
                            >Made by
                            <a href="http://github.com/fengwei2002"
                                >github.com/fengwei2002</a
                            ></span
                        >
                    </div>
                    <form action="/">
                        <div class="inputBox">
                            <input
                                id = "login-username"
                                class="game-settings-login-username"
                                type="text"
                                placeholder="username"
                                name="text"
                            />
                        </div>
                        <div class="inputBox">
                            <input
                                id = "login-password"
                                class="game-settings-login-password"
                                type="password"
                                placeholder="password"
                                name="password"
                            />
                        </div>
                        <div class="inputBox">
                            <input
                                class="game-settings-login-sign-in"
                                type="submit"
                                value="sign in"
                            />
                            <input
                                class="game-settings-login-sign-up"
                                type="button"
                                value="sign up"
                            />
                        </div>
                        <div></div>
                        <p class="game-settings-login-forget">
                            forget password?<a href="#"> click here </a>
                        </p>
                        <p class="game-settings-login-error-message">
                            error message
                        </p>
                        <p class=".game-settings-login-third">
                            第三方登录
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    
    <section class="game-settings-register">
        <!-- 背景颜色 -->
        <div class="color"></div>
        <div class="color"></div>
        <div class="color"></div>
        <div class="box">
            <!-- 背景圆 -->
            <div class="circle" style="--x: 0"></div>
            <div class="circle" style="--x: 1"></div>
            <div class="circle" style="--x: 2"></div>
            <div class="circle" style="--x: 3"></div>
            <div class="circle" style="--x: 4"></div>
            <div class="circle" style="--x: 5"></div>
            <div class="circle" style="--x: 6"></div>
            <!-- 登录框 -->
            <div class="container">
                <div class="form">
                    <div class="info-title">
                        <span
                            >Made by
                            <a href="http://github.com/fengwei2002"
                                >github.com/fengwei2002</a
                            ></span
                        >
                    </div>
                    <form action="/">
                        <div class="inputBox">
                            <input
                                id = "register-username"
                                class="game-settings-register-username"
                                type="text"
                                placeholder="username"
                                name="text"
                            />
                        </div>
                        <div class="inputBox">
                            <input
                                id = "register-password"
                                class="game-settings-register-password"
                                type="password"
                                placeholder="password"
                                name="password"
                            />
                        </div>
                        <div class="inputBox">
                            <input
                                id = "register-repeat-password"
                                class="game-settings-register-repeat-password"
                                type="password"
                                placeholder="repeat password"
                                name="repeat_password"
                            />
                        </div>
                        <div class="inputBox">
                            <input
                                class="game-settings-register-sign-in"
                                type="submit"
                                value="sign in"
                            />
                            <input
                                class="game-settings-register-sign-up"
                                type="submit"
                                value="sign up"
                            />
                        </div>
                        <div></div>
                        <p class="game-settings-register-forget">
                            forget password?<a href="#"> click here </a>
                        </p>
                        <p class="game-settings-register-error-message">
                            error message
                        </p>
                        <p class=".game-settings-register-third">
                            第三方登录
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
`;
        this.game_root.game.appendChild(this.settings_box);

        // login 相关组件
        this.login_box = this.settings_box.querySelector(
            ".game-settings-login"
        );
        this.login_username = this.login_box.querySelector(
            ".game-settings-login-username"
        );
        this.login_password = this.login_box.querySelector(
            ".game-settings-login-password"
        );
        this.login_sign_in = this.login_box.querySelector(
            ".game-settings-login-sign-in"
        );
        this.login_sign_up = this.login_box.querySelector(
            ".game-settings-login-sign-up"
        );
        this.login_forget = this.login_box.querySelector(
            ".game-settings-login-forget"
        );
        this.login_error_message = this.login_box.querySelector(
            ".game-settings-login-error-message"
        );
        this.login_third = this.login_box.querySelector(
            ".game-settings-login-third"
        );
        this.login_forget.style.display = "none";
        this.login_box.style.display = "none";

        // register 相关组件
        this.register_box = this.settings_box.querySelector(
            ".game-settings-register"
        );
        this.register_username = this.register_box.querySelector(
            ".game-settings-register-username"
        );
        this.register_password = this.register_box.querySelector(
            ".game-settings-register-password"
        );
        this.register_repeat_password = this.register_box.querySelector(
            ".game-settings-register-repeat-password"
        );
        this.register_sign_in = this.register_box.querySelector(
            ".game-settings-register-sign-in"
        );
        this.register_sign_up = this.register_box.querySelector(
            ".game-settings-register-sign-up"
        );
        this.register_forget = this.register_box.querySelector(
            ".game-settings-register-forget"
        );
        this.register_error_message = this.register_box.querySelector(
            ".game-settings-register-error-message"
        );
        this.register_third = this.register_box.querySelector(
            ".game-settings-register-third"
        );
        this.register_forget.style.display = "none";
        this.register_error_message.style.display = "none";
        this.register_box.style.display = "none";

        this.start();
    }

    start() {
        // 开始时，menu 隐藏，error 信息隐藏，forget 信息隐藏
        this.game_root.menu.hide();
        this.login_error_message.style.display = "none";
        this.register_error_message.style.display = "none";
        this.login_box.style.display = "flex";

        if (this.platform === "ACAPP") {
            this.getinfo_acapp();
        } else {
            this.get_info_web();
            this.add_listening_events();
        }
    }

    add_listening_events() {
        let outer = this;
        // 添加切换页面的处理事件
        this.add_listening_events_login_sign_up();
        this.add_listening_events_register_sign_in();
        // 添加与服务器通信的处理事件
        this.add_listening_events_login_sign_in();
        this.add_listening_events_register_sign_up();
    }

    // 点击登录界面的注册，跳转到注册界面
    add_listening_events_login_sign_up() {
        let outer = this;
        outer.login_sign_up.addEventListener(
            "click",
            () => {
                // 点击之后跳到注册界面
                outer.login_box.style.display = "none";
                outer.register_box.style.display = "flex";
            },
            false
        );
    }

    // 点击注册界面的登录，跳转到登录界面
    add_listening_events_register_sign_in() {
        let outer = this;
        outer.register_sign_in.addEventListener(
            "click",
            () => {
                // 点击之后跳到注册界面
                outer.login_box.style.display = "flex";
                outer.register_box.style.display = "none";
            },
            false
        );
    }

    // 点击登录界面的登录，与服务器进行通信
    add_listening_events_login_sign_in() {
        let outer = this;
        outer.login_sign_in.addEventListener(
            "click",
            () => {

            }
        )
    }

    // 点击注册界面的注册，与服务器进行通信
    add_listening_events_register_sign_up() {
        let outer = this;
        outer.register_sign_up.addEventListener(
            "click",
            () => {
                
            }
        )
    }

    acwing_login() {}

    login_on_remote() { // 在远程服务器上登录
        let outer = this;
        let username = this.login_username.val();
        let password = this.login_pass;
    }
    register_on_remote() { // 在远程服务器上注册

    }
    logout_on_remote() { // 在远程服务器上登出

    }
    logout_on_remote() { // 在远程服务器上登出

    }

    // TODO fetch api 实现
    // TODO 使用 XMLHttp 请求库实现对象的具体赋值。。。。。
    get_info_web() {
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
                    // outer.game_root.menu.show();
                } else {
                    // outer.game_root.menu.hide();
                    outer.start_login();
                }
            },
        });
    }

    start_register() {
        this.login_box.hide();
        this.register_box.show();
    }

    start_login() {}
}
