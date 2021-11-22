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
            this.add_listening_events();
        } else {
            let tx = Math.random() * this.playground_root.width;
            let ty = Math.random() * this.playground_root.wifth;
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
           } else if (e.button === 1) {
                // alert("你点了滚轮");
           }
        }
    }


	move_to(tx, ty) {
		this.move_length = this.get_dist(this.x, this.y, tx, ty);
		let angle = Math.atan2(ty -this.y, tx - this.x); // atan2 求角度
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
        } else {
            // 每秒钟移动 speed
            // v = s / t, s = v * t
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
