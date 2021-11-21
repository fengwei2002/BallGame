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
            <div class="game-menu-item game-menu-item-settings">
                About Author
            </div>

            <div class="game-menu-item game-menu-item-settings">
                Source Code
            </div>
        </div>
            `;
        this.single = this.menu.querySelector('.game-menu-item-single');
        this.mul = this.menu.querySelector('game-menu-item-multi');
        this.settings = this.menu.querySelector('game-menu-item-settings');
        this.box = this.menu.querySelector('game-menu-background-box');

        this.root.game.appendChild(this.menu);
    }
}
