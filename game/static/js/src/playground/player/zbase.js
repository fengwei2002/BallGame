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

        document.oncontextmenu = function (e) {
            e.preventDefault();
        };

        document.querySelector(".game-map-canvas").onmousedown = function (e) {
            if (e.button === 2) {
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

        window.addEventListener("keydown", function (event) {
            // let str = "KeyboardEvent: key='" + event.key + "' | code='" + event.code + "'";

            if (event.code === 'KeyQ') {
                outer.cur_skill = "fireball";
            }

            if (event.code === 'Space') {
                console.log('space')
            }

            if (event.code === 'ArrowUp') {
                console.log('u')
                outer.move_to(outer.x, outer.y -= 3);
            }

            if (event.code === 'ArrowDown') {
                console.log('d')
                outer.move_to(outer.x, outer.y += 3);
            }

            if (event.code === 'ArrowLeft') {
                console.log('L');
                outer.move_to(outer.x -= 3, outer.y);
            }

            if (event.code === 'ArrowRight') {
                console.log('R')
                outer.move_to(outer.x += 3, outer.y);
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
        let angle = Math.atan2(ty - this.y, tx - this.x); // atan2 求角度
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }



    get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }



    is_attacked(angle, damage) {
        for (let i = 0; i < 20 + Math.random() * 10; i++) {
            let x = this.x,
                y = this.y;
            let radius = this.radius * Math.random() * 0.1;
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle),
                vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed * 10;
            let move_length = this.radius * Math.random() * 5;
            new Particle(this.playground_root, x, y, radius, vx, vy, color, speed, move_length);
        }

        this.radius -= damage;
        if (this.radius < 10) { // 被攻击之后，如果像素小于 10， 就将这个玩家删除
            this.destroy();
            return false;
        }

        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed = damage * 100;
        this.speed *= 0.8;
    }



    update() {
        this.spent_time += this.time_delta / 1000;
        if (!this.is_me && this.spent_time > 4 && Math.random() < 1 / 300.0) {
            let player = this.playground_root.players[Math.floor(Math.random() * this.playground_root.players.length)];
            // 随机选取一名幸运观众

            // 向预判方向发射一枚子弹
            let tx = player.x + player.speed * this.vx * this.time_delta / 1000 * 0.3;
            let ty = player.y + player.speed * this.vy * this.time_delta / 1000 * 0.3;
            // this.shoot_fireball(tx, ty);
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



    render() { // 画饼~！
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
