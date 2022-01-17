// 文件名是 zbase 的原因是因为按照字典序排序的话
// 这个 js 是总领的 js 文件，
// 功能包含 获取 html 中的 js game 对象
//          创建 menu 对象，使用 menu/GameMenu
//          创建 playground 对象，使用 playground/GamePlayGround
//

class Game {
    constructor(id, AcWingOS) {
        // js 中的构造函数
        this.AcWingOS = AcWingOS;
        // 用来判断是在哪一个平台执行的代码

        this.id = id;
        this.game = document.getElementById(id);
        this.menu = new GameMenu(this);
        this.settings = new Settings(this);
        this.playground;
        this.start();
    }

    start() {}
    create_playground() {
        let outer = this;
        outer.playground = new GamePlayGround(outer);
    }
}

export { Game };
