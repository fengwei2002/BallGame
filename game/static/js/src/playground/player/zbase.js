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

        // playground_root, player, x, y, radius, vx, vy, color, spedd, move_length
        new FireBall(this.playground_root, this, begin_x, begin_y, fire_radius, vx, vy, color, speed, move_length);
    }


	move_to(tx, ty) {
		this.move_length = this.get_dist(this.x, this.y, tx, ty);
		let angle = Math.atan2(ty -this.y, tx - this.x);            // atan2 求角度
		this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
	}



	get_dist(x1, y1, x2, y2) {
		let dx = x1 - x2;
		let dy = y1 - y2;
		return Math.sqrt(dx * dx, dy * dy);
	}



    update() {
        if (this.move_length < this.eps) {
            this.move_length = 0;
            this.vx = 0;
            this.vy = 0;

            if (!this.is_me) {
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
        this.render();
    }



    render() {  // 画饼~！
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
