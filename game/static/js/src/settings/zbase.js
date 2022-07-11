class Settings {
    constructor(game_root) {
        this.game_root = game_root;
        this.platform = "WEB";
        this.username = "no_user";
        this.photo = "https://s2.loli.net/2021/12/09/SG5unjPJftqULgI.jpg";

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
                    <form name="login_from">
                        <div class="inputBox">
                            <input
                                id = "login-username"
                                class="game-settings-login-username"
                                type="text"
                                placeholder="username"
                                name="login_username"
                            />
                        </div>
                        <div class="inputBox">
                            <input
                                id = "login-password"
                                class="game-settings-login-password"
                                type="password"
                                placeholder="password"
                                name="login_password"
                            />
                        </div>
                        <div class="inputBox">
                            <input
                                class="game-settings-login-sign-in"
                                type="button"
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
                        <p class="game-settings-login-third">
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
                    <form name="register-from">
                        <div class="inputBox">
                            <input
                                id = "register-username"
                                class="game-settings-register-username"
                                type="text"
                                placeholder="username"
                                name="register_username"
                            />
                        </div>
                        <div class="inputBox">
                            <input
                                id = "register-password"
                                class="game-settings-register-password"
                                type="password"
                                placeholder="password"
                                name="register_password"
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
                                type="button"
                                value="sign in"
                            />
                            <input
                                class="game-settings-register-sign-up"
                                type="button"
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
                        <p class="game-settings-register-third">
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
        this.login_third.style.display = "none";

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
        this.register_third.style.display = "none";

        this.start();
    }

    start() {
        // 开始时，menu 隐藏，error 信息隐藏，forget 信息隐藏
        this.game_root.menu.hide();
        this.login_error_message.style.display = "none";
        this.register_error_message.style.display = "none";
        this.login_box.style.display = "flex";

        this.get_info_web();
        this.add_listening_events();
    }

    add_listening_events() {
        // 添加切换页面的处理事件
        this.add_listening_events_login_sign_up();
        this.add_listening_events_register_sign_in();
        // 添加与服务器通信的处理事件
        this.add_listening_events_login_sign_in();
        this.add_listening_events_register_sign_up();
    }

    // 1. 点击登录界面的注册，跳转到注册界面
    add_listening_events_login_sign_up() {
        let outer = this;
        outer.login_sign_up.addEventListener(
            "click",
            () => {
                outer.login_box.style.display = "none";
                outer.register_box.style.display = "flex";
            },
            false
        );
    }

    // 2. 点击注册界面的登录，跳转到登录界面
    add_listening_events_register_sign_in() {
        let outer = this;
        outer.register_sign_in.addEventListener(
            "click",
            () => {
                outer.login_box.style.display = "flex";
                outer.register_box.style.display = "none";
            },
            false
        );
    }

    // 3. 点击登录界面的登录，与服务器进行通信, 同时关闭 error
    add_listening_events_login_sign_in() {
        let outer = this;
        // outer.get_info_web();
        outer.login_sign_in.addEventListener("click", () => {
            outer.login_on_remote();
            if (outer.login_error_message.style.display === "flex") {
                outer.login_error_message.style.display === "none";
            }
        });
    }

    // 4. 点击注册界面的注册，与服务器进行通信，同时关闭 error
    add_listening_events_register_sign_up() {
        let outer = this;
        outer.register_sign_up.addEventListener("click", () => {
            outer.register_on_remote();
            if (outer.register_error_message.style.display === "flex") {
                outer.register_error_message.style.display === "none";
            }
        });
    }
    login_on_remote() {
        // 在远程服务器上登录
        let outer = this;
        let username = outer.login_username.value; // 获取输入的 username
        let password = outer.login_password.value; // 获取输入的 password
        $.ajax({
            url: "http://47.97.213.122:8000/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function (resp) {
                console.log(resp);
                if (resp.result === "success") {
                    // 登录成功之后刷新用户的相关信息
                    outer.username = resp.username;
                    outer.password = resp.password;

                    // 登录成功之后进行页面的切换
                    outer.login_box.style.display = "none";
                    outer.register_box.style.display = "none";
                    outer.game_root.menu.show();
                } else {
                    // 登录失败展示 error 信息
                    outer.login_error_message.innerHTML = resp.result;
                    outer.login_error_message.style.display = "flex";
                }
            },
        });
    }

    register_on_remote() {
        // 在远程服务器上注册
        let outer = this;
        let username = outer.register_username.value;
        let password = outer.register_password.value;
        let repeat_password = outer.register_repeat_password.value;
        $.ajax({
            url: "http://47.97.213.122:8000/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                repeat_password: repeat_password,
            },
            success: function (resp) {
                console.log(resp);
                if (resp.result === "success") {
                    outer.register_box.style.display = "none";
                    outer.login_box.style.display = "flex";
                    // 新注册的用户获得一张默认头像
                    // outer.photo = resp.photo;
                } else {
                    outer.register_error_message.innerHTML = resp.result;
                    outer.register_error_message.style.display = "flex";
                }
            },
        });
    }

    // TODO 使用 fetch api 实现
    // TODO 使用 XMLHttp 请求库实现
    get_info_web() {
        let outer = this;
        let username = outer.login_username.value;
        $.ajax({
            url: "http://47.97.213.122:8000/settings/get_info/",
            type: "GET",
            data: {
                username: username,
                platform: outer.platform,
            },
            success: function (resp) {
                console.log(resp);
                if (resp.result === "success") {
                    // 如果得到用户的信息，将这些信息保存下来
                    outer.username = resp.username;
                    // outer.photo = resp.photo;
                    // 执行页面切换
                    outer.login_box.style.display = "none";
                    outer.game_root.menu.show();
                } else {
                    outer.game_root.menu.hide();
                    outer.login_box.style.display = "flex";
                }
            },
        });
    }
}
