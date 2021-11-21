// 文件名是 zbase 的原因是因为按照字典序排序的话
// zbase 一定会在最后面


class Game {
    constructor(id) {
        // js 中的构造函数
        this.id = id;
        this.game = document.getElementById(id);
        this.menu = new GameMenu(this);
        this.playground = new GamePlayGround(this);
        this.start();
    }

    start() {
    }
}

export {Game}
