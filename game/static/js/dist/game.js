// 这是创建 menu 对象的主 js
// 功能包含：
//          在 menu 下创建 div，game-menu
//          里面的 html 内容包含基础的菜单选项，每个选项的类用成员变量保存下来
//          为这些成员变量添加事件监听函数
//          将新创建的 menu 对象加入到 root.game 下面，根据 display 控制元素是否显示

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
// 这个文件是 js 实现的一个简易的游戏引擎
// 功能包含：
//          对 GAME_OBJECTS 中的所有变量进行逐帧渲染
//

let GAME_OBJECTS = [];  // 创建一个数组, 数组中的所有物品都要进行渲染更新

class GameObject {
    constructor() {     // 每次调用构造函数的时候，就将 this 添加到数组中
        GAME_OBJECTS.push(this);

        this.has_called_start = false;  // 表示是否执行过 start 函数，如果执行过，执行 update，
                                        // 没执行过执行 start 函数

        this.time_delta = 0;
        // 当前距离上一帧的时间间隔
    }


    start() { // 只会在第一帧执行一次
    }


    update() { // 每一帧都会执行一次
    }


    on_destroy() { // 只会在删除物体之前执行一次，执行处理相关现场的操作
    }


    destroy() { // 调用 destory 函数就在数组中删除当前物体，不再继续提供渲染服务
        this.on_destory();

        for (let i = 0; i < GAME_OBJECTS.length; i++) {
            if (GAME_OBJECTS[i] === this) {
                GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}


let last_time_stamp; // 记录上一次的时间戳，这样就可以根据时间来执行动画


let GAME_ANIMATION = function(time_stamp) { // 传入时间戳，代表我是哪一个时刻调用的这一个函数

    for (let i = 0; i < GAME_OBJECTS.length; i++) {
        let obj = GAME_OBJECTS[i];

        if (!obj.has_called_start) {       // 如果数组中的 某一个元素没有启动的话，进行启动
            obj.start();
            obj.has_called_start = true;
        } else {                           // 如果之前启动过，那么就将当前元素的 time_delta 置为当前的时间戳 减去上一次的时间戳
                                           // 然后不停的执行 update 函数，相关的 update 函数在继承类中实现
            obj.time_delta = time_stamp - last_time_stamp;
            obj.update();
        }
    }

    last_time_stamp = time_stamp;

    requestAnimationFrame(GAME_ANIMATION); // 这个函数递归进行调用自己，形成动画
}

requestAnimationFrame(GAME_ANIMATION); // 在一秒之内调用 60 次这个函数，
// 这是 GameMap 的基类创建 js，GameMap 类从 GameObject 继承而来
// 功能包含：
//          在 playground 下添加 canvas 画布
//          将 canvas 画布赋值给成员变量 this.ctx


class GameMap extends GameObject {
    constructor(root) {
        super();
        this.root = root;

        this.canvas = document.createElement('canvas');
        this.canvas.className = 'game-map-canvas';
        this.canvas.innerHTML = ``;
        this.canvas.width = root.width;
        this.canvas.height = root.height;

        // 注意这里使用原生 JS 创建 canvas 的时候必须指定长度和宽度，而不是使用 css 指定长度和宽度
        // 否则就会出现距离比例不匹配的问题，
        // 使用 css 控制 canvas的大小的话，canvas 实际还是 300 * 150，而不是具体的宽度，所以画的图就会模糊并且
        // 距离范围也会缩小到 300 * 150 下！！！！！！！！！！！！

        this.ctx = this.canvas.getContext('2d');
        this.root.playground.appendChild(this.canvas);
    }

    start() {
    }

    update() {           // 实现 GameMap 的每一帧都会调用的 update 函数
                         // 也就是不停的绘制 canvas 矩形画布
        this.render();
    }

    render() {
        this.ctx.fillStyle = "rgba(148, 0, 211, 0.1)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
class Player extends GameObject {
    constructor(playground_root, x, y, radius, color, speed, is_me) {
        super();

        this.playground_root = playground_root;
        this.ctx = this.playground_root.game_map.ctx;

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;

        this.vx = 0;
        this.vy = 0;
        this.move_length = 0;
        this.eps = 0.1;
    }

    start() {
        if (this.is_me) {
            this.add_listening_events;
        } else {
            let tx = Math.random() * this.playground_root.width;
            let ty = Math.random() * this.playground_root.wifth;
            this.move_to(tx, ty);
        }
    }

    add_listening_events() {

    }

    update() {
        this.render();
    }

    render() {
        console.log(1);
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
// 这是 playground 的总 js 入口
// 功能包含：
//          创建 div class="game-playground"，将这个 playground 容器添加到 root.game
//          保存总窗口的 宽度，高度 到成员变量
//          创建游戏地图 new GameMap()
//          创建玩家数组，
//              默认在全图的正中央创建玩家
//              添加 AI 玩家，随机颜色

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

        this.start();
    }


    get_random_color() {
        let colors = ["blue", "red", "pink", "grey", "green", "purple"];
        return colors[Math.floor((Math.random()) * 5)];
    }


    start() {
        //this.hide();
        this.show();

		this.game_map = new GameMap(this);                                                                                                                                               23

        this.players = [];

        //playground_root, x, y, radius, color, speed, is_me
		this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, true));

        /*
 	    for (let i = 0; i < 5; i++) {
 	         this.players.push(new Player(this, this.width / 2,  this.height / 2, this.height * 0.05, this.get_random_color(), this.height * 0.15, false));
        }*/
    }

    show() { // 展示 playground 页面
        this.playground.style.display="block";
    }

    hide() { // 隐藏 playground 页面
        this.playground.style.display="none";
    }

    update() {
    }

    render() {
    }
}
// 文件名是 zbase 的原因是因为按照字典序排序的话
// 这个 js 是总领的 js 文件，
// 功能包含 获取 html 中的 js game 对象
//          创建 menu 对象，使用 menu/GameMenu
//          创建 playground 对象，使用 playground/GamePlayGround
//

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
