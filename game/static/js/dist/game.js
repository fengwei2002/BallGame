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
        this.show();
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
        this.menu.style.display="none";
    }

    hide() {
        // 关闭 menu 界面
        this.menu.style.display="none";
    }

}
let GAME_OBJECTS = [];
// 创建一个数组

class GameObject {
    constructor() {
        // 每次调用构造函数的时候，就将 this 添加到数组中
        GAME_OBJECTS.push(this);

        this.has_called_start = false; // 表示是否执行过 start 函数，如果执行过，执行 update，没执行过执行，start 函数
        this.timedelta = 0; // 当前距离上一帧的时间间隔

    }
    start() { // 只会在第一帧执行一次
    }

    update() { // 每一帧都会执行一次

    }

    on_destroy() { // 在删除物体之前执行一次，处理相关现场的操作

    }
    destroy() { // 删除当前物体
        this.on_destory();

        for (let i = 0; i < GAME_OBJECTS.length; i++) {
            if (GAME_OBJECTS[i] = this) {
                GAME_OBJECTS.splice(i, 1);
                // 从 i 开始删除一个元素
                break;
            }
        }
    }

}

let last_timestamp; // 记录上一次的时间戳，这样就可以根据时间来执行动画

let GAME_ANIMATION = function(timestamp) { // 传入时间戳，代表我是哪一个时刻调用的这一个函数
    for (let i = 0; i < GAME_OBJECTS.length; i++) {
        let obj = GAME_OBJECTS[i];
        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timesdelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(GAME_ANIMATION); // 这个函数递归进行调用自己，形成动画
}

requestAnimationFrame(GAME_ANIMATION); // 在一秒之内调用 60 次这个函数，
class GameMap extends GameObject {
    // 创建 GameMap 类，是基类 GameObject 的继承类
    // 自己没有定义的函数会调用基类的成员函数
    constructor(root) {
        super();
        this.root = root;

        // 使用 canvas 创建画布
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'game-map-canvas';
        this.canvas.innerHTML = ``;

        this.ctx = this.canvas.getContext('2d');
        this.root.playground.appendChild(this.canvas);
        this.start();
    }

    start() {
    }

    update() {
        this.render();
    }

    render() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
class Player extends GameObject {
    constructor(root, x, y, radius, color, speed, is_me) {
        super();

        this.root = root;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;

        this.ctx = this.root.game_map.ctx;
        this.eps = 0.1; // 控制精度
    }


    start() {
    }

    update() {
        this.render();
    }

    render() {
        let a = Number(this.x);
        let b = Number(this.y);
        let c = Number(this.radius);

        this.ctx.beginPath();
        this.ctx.arc(a, b, 40, 0, Math.PI * 2, false);
        this.ctx.fillStyle = 'white';
        this.ctx.fill();

    }
}
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
        this.game_map = new GameMap(this);

		this.players = [];
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, true));

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
