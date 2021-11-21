class GamePlayGround {
   constructor(root) {
        this.root = root;
        this.playground = document.createElement('div');
        this.playground.className = 'game-playground';
        this.playground.innerHTML = ``;

        this.root.game.appendChild(this.playground);

        // 由于 width 的 height 会经常用到，所以这里读出
        this.width = this.playground.clientWidth;
        this.height = this.playground.clientHeight;
        this.canvas = new GameMap(this);

        this.start();
    }

    start() {
        //this.hide();
    }

    show() { // 展示 playground 页面
        this.playground.style.display="block";
    }

    hide() { // 隐藏 playground 页面
        this.playground.style.display="none";
    }

    update() {
    }

}
