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
        this.on_destroy();

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
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
// 粒子特效类：，相当于释放一周，同颜色的，没有伤害的随机球

class Particle extends GameObject {
    constructor(playground_root, x, y, radius, vx, vy, color, speed, move_length) {
        super();
        this.playground = playground_root;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.friction = 0.9;
        this.eps = 1;
    }

    start() {
    }

    update() {
        if (this.move_length < this.eps || this.speed < this.eps) {
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_length, this.speed * this.time_delta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.speed *= this.friction;
        this.move_length -= moved;
        this.render();
    }

    render() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
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

        this.friction = 0.9;
        this.damage = 0;
        this.damage_x = 0;
        this.damgae_y = 0;
        this.damage_speed = 0;
        this.spent_time = 0;

        this.cur_skill = null;
    }


    start() {
        if (this.is_me) {
            this.add_listening_events();
        } else {
            let tx = Math.random() * this.playground_root.width;
            let ty = Math.random() * this.playground_root.height;
            this.move_to(tx, ty);
        }
    }



    add_listening_events() {
        let outer = this;

        document.oncontextmenu = function(e){
            e.preventDefault();
        };

        document.querySelector(".game-map-canvas").onmousedown = function(e){
            if (e.button === 2 ) {
                // 点了右键 执行移动函数
                outer.move_to(e.clientX, e.clientY);
            } else if (e.button === 0) {
                // 点了左键 执行发射函数
                if (outer.cur_skill === 'fireball') {
                    outer.shoot_fireball(e.clientX, e.clientY);
                }

                outer.cur_skill = null;
            } else if (e.button === 1) {
                // alert("你点了滚轮");
            }
        }



        // 添加按键事件
        // https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code

        window.addEventListener("keydown", function(event) {
            // let str = "KeyboardEvent: key='" + event.key + "' | code='" + event.code + "'";

            if (event.code === 'KeyQ') {
                outer.cur_skill = "fireball";
            }

            if (event.code === 'Space') {
                console.log('space')
            }

            if (event.code === 'ArrowUp') {
                console.log('u')
                outer_this.x = outer_this.x + 1;
            }

            if (event.code === 'ArrowDown') {
                console.log('d')
                move_to(this.x, this.y + 10);
            }

            if (event.code === 'ArrowLeft') {
                console.log('L');
                move_to(this.x - 10, this.y);
            }

            if (event.code === 'ArrowRight') {
                console.log('R')
                move_to(this.x + 10, this.y);
            }

        }, true);
    }




    shoot_fireball(fire_tx, fire_ty) {
        let begin_x = this.x;
        let begin_y = this.y;

        let fire_radius = this.playground_root.height * 0.02;

        let angle = Math.atan2(fire_ty - begin_y, fire_tx - begin_x);
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);

        let color = "#9400d3";

        let speed = this.playground_root.height * 0.5;
        let move_length = this.playground_root.height * 0.5;

        // playground_root, player, x, y, radius, vx, vy, color, speed, move_length
        new FireBall(this.playground_root, this, begin_x, begin_y, fire_radius * 0.8, vx, vy, color, speed * 1.1, move_length * 1.3, this.playground_root.height * 0.01); // 每次打玩家 20 % 血量
    }



    move_to(tx, ty) {
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);            // atan2 求角度
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }



    get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx, dy * dy);
    }



    is_attacked(angle, damage) {
        for (let i = 0; i < 20 + Math.random() * 10; i++) {
            let x = this.x, y = this.y;
            let radius = this.radius * Math.random() * 0.1;
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed * 10;
            let move_length = this.radius * Math.random() * 5;
            new Particle(this.playground_root, x, y, radius, vx, vy, color, speed, move_length);
        }

        this.radius -= damage;
        if (this.radius < 10) {  // 被攻击之后，如果像素小于 10， 就将这个玩家删除
            this.destroy();
            return false;
        }

        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed = damage * 100;
        this.speed *= 0.8;
    }



    update() {
		this.spent_time += this.timedelta / 1000;
        if (!this.is_me && this.spent_time > 4 && Math.random() < 1 / 300.0) {
            let player = this.playground_root.players[Math.floor(Math.random() * this.playground.players.length)];
            // 随机选取一名幸运观众

            // 向预判方向发射一枚子弹
            let tx = player.x + player.speed * this.vx * this.time_delta / 1000 * 0.3;
            let ty = player.y + player.speed * this.vy * this.time_delta / 1000 * 0.3;
            this.shoot_fireball(tx, ty);
        }

        if (this.damage_speed > 10) { // 伤害导致的位移优先
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damage_x * this.damage_speed * this.time_delta / 1000;
            this.y += this.damage_y * this.damage_speed * this.time_delta / 1000;
            this.damage_speed *= this.friction;
        } else {
            if (this.move_length < this.eps) {
                this.move_length = 0;
                this.vx = 0;
                this.vy = 0;

                if (!this.is_me) {
                    // 一停下来一鞭子抽上去！
                    let tx = Math.random() * this.playground_root.width;
                    let ty = Math.random() * this.playground_root.height;
                    this.move_to(tx, ty);
                }
            } else {
                let moved = Math.min(this.move_length, this.speed * this.time_delta / 1000);
                this.x += this.vx * moved;
                this.y += this.vy * moved;
                this.move_length -= moved;
            }
        }

        this.render();
    }



    render() {  // 画饼~！
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
// 火球对象， 构建之后获得一个移动的火球


class FireBall extends GameObject {

    constructor(playground_root, player, x, y, radius, vx, vy, color, speed, move_length, damage) {
        super();

        this.playground_root = playground_root;
        this.player = player;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.eps = 0.1;

        this.ctx = this.playground_root.game_map.ctx;

        this.damage = damage;
    }


    start() {

    }

    update() {
        if (this.move_length < this.eps) {
            this.destroy();
            return false;
        }

        let moved = Math.min(this.move_length, this.speed * this.time_delta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_length -= moved;

        for (let i = 0; i < this.playground_root.players.length; i++) {
            let player = this.playground_root.players[i];
            if (this.player != player && this.is_collision(player)) {
                this.attack(player);
            }
        }
        this.render();
    }


	get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }


    is_collision(player) {
        let distance = this.get_dist(this.x, this.y, player.x, player.y);
        if (distance < this.radius + player.radius)
            return true;
        return false;
    }


    attack(player) {
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage);
        this.destroy();
    }



    render() {  // 画小饼~！
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
        let return_color = this.colors[Math.floor((Math.random) * 5)]
        return return_color;
    }


    start() {
        //this.hide();
        this.show();

		this.game_map = new GameMap(this);                                                                                                                                               23

        this.players = [];
        this.colors = ["blue", "pink", "grey", "green", "orange", "#9768ab", "#145266", "#d9688f", "#2cf543", "#a37e26"];
        //playground_root, x, y, radius, color, speed, is_me
		this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.2, true));

 	    for (let i = 4; i < 4 + 6; i++) {
            let p_color = this.colors[i];
 	        this.players.push(new Player(this, this.width / 2,  this.height / 2, this.height * 0.05, p_color, this.height * 0.2, false));
        }
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
