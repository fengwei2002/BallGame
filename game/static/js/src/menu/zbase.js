class GameMenu {
    constructor(root) {
        // 传入的 root 就相当于 web.html 中定义的 Game 对象
        this.root = root;

        this.menu = document.createElement('div');
        this.menu.className = 'game-menu';
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

            <div class="game-menu-item game-menu-item-source">
                Source Code
            </div>
        </div>
            `;
        // 将 menu 的每个类绑定到成员变量
        this.single = this.menu.querySelector('.game-menu-item-single');
        this.mul = this.menu.querySelector('.game-menu-item-multi');
        this.settings = this.menu.querySelector('.game-menu-item-settings');
        this.author = this.menu.querySelector('.game-menu-item-author');
        this.source = this.menu.querySelector('.game-menu-item-source');
        this.box = this.menu.querySelector('.game-menu-background-box');

        this.root.game.appendChild(this.menu);


        this.start();
    }

    start() {
        this.add_listening_events();
    }


    add_listening_events() {
        let outer = this;

        // 为这些 class 绑定 click 的监听事件
        outer.single.addEventListener("click", () => {
            outer.hide();
            // 注意对象的调用层级，outer.root 就是 Game 对象了
            outer.root.playground.show();
        }, false);

        outer.mul.addEventListener("click", () => {console.log("multi")}, false);
        outer.settings.addEventListener("click", () => {console.log("settings")}, false);
        outer.author.addEventListener("click", () => {console.log("author")}, false);
        outer.source.addEventListener("click", () => {console.log("source")}, false);
        outer.box.addEventListener("click", () => {console.log("box")}, false);
    }

    show() {
        // 展示 menu 界面
        this.menu.style.display="block";
    }

    hide() {
        // 关闭 menu 界面
        this.menu.style.display="none";
    }

}
