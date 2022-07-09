// 这是创建 menu 对象的主 js
// 功能包含：
//          在 menu 下创建 div，game-menu
//          里面的 html 内容包含基础的菜单选项，每个选项的类用成员变量保存下来
//          为这些成员变量添加事件监听函数
//          将新创建的 menu 对象加入到 root.game 下面，根据 display 控制元素是否显示

class GameMenu {
    constructor(game_root) {
        // 传入的 root 就相当于 web.html 中定义的 Game 对象
        this.game_root = game_root;

        this.menu = document.createElement("div");
        this.menu.className = "game-menu";
        this.menu.innerHTML = `
        <div class = "game-menu-background-box">
            <div class="game-menu-item game-menu-item-single" >
                Single Player Mode
            </div>

            <div class="game-menu-item game-menu-item-multi">
                Multi Player Mode
            </div>

            <div class="game-menu-item game-menu-item-settings">
                Settings
            </div>
            <div class="game-menu-item game-menu-item-author">
                About Author
            </div>

            <div class="game-menu-item game-menu-item-sign-out">
                Sign Out

            </div>
        </div>
            `;

        // 将 menu 的每一个zi class 绑定到成员变量
        this.single = this.menu.querySelector(".game-menu-item-single");
        this.mul = this.menu.querySelector(".game-menu-item-multi");
        this.settings = this.menu.querySelector(".game-menu-item-settings");
        this.author = this.menu.querySelector(".game-menu-item-author");
        this.sign_out = this.menu.querySelector(".game-menu-item-sign-out");
        this.box = this.menu.querySelector(".game-menu-background-box");

        this.game_root.game.appendChild(this.menu);

        this.start();
    }

    start() {
        this.add_listening_events();
        // 因为需要优先展示登录界面，所以这里先隐藏掉 menu
    }

    add_listening_events() {
        let outer = this;

        // 为这些 class 绑定 click 的监听事件
        outer.single.addEventListener(
            "click",
            () => {
                outer.hide();
                // 注意对象的调用层级，outer.root 就是 Game 对象了
                outer.game_root.create_playground(); // 点击开始游戏之后才创建画布对象
            },
            false
        );

        outer.mul.addEventListener(
            "click",
            () => {
                console.log("multi");
            },
            false
        );
        outer.settings.addEventListener(
            "click",
            () => {
                console.log("settings");
            },
            false
        );
        outer.author.addEventListener(
            "click",
            () => {
                console.log("author");
            },
            false
        );
        outer.sign_out.addEventListener(
            "click",
            () => {
                if (this.game_root.settings.platform === "ACAPP") return false;
                $.ajax({
                    url: "http://47.97.213.122:8000/menu/sign_out/",
                    type: "GET",
                    success: function (resp) {
                        console.log(resp);
                        if (resp.result === "logout_success") {
                            outer.game_root.menu.hide();
                            outer.game_root.settings.login_box.style.display =
                                "flex";
                            window.document.location.reload();
                        }
                    },
                });
            },
            false
        );
        outer.box.addEventListener(
            "click",
            () => {
                console.log("box");
            },
            false
        );
    }

    show() {
        // 展示 menu 界面
        console.log("show menu");
        this.menu.style.display = "block";
    }

    hide() {
        // 关闭 menu 界面
        console.log("hide menu");
        this.menu.style.display = "none";
    }
}
