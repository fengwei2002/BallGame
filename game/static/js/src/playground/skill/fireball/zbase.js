class FireBall extends GameObject {
    constructor(playground_root, player, x, y, radius, vx, vy, color, speed, move_length) {
        super();

        // console.log('make fire');
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
    }


    start() {

    }

    update() {
        if (this.move_length < this.eps) {
            this.destroy();
            this.move_length = 0;
            this.vx = 0;
            this.vy = 0;
            return false;
        }
        // console.log('update fire %d', this.move_length);

        let moved = Math.min(this.move_length, this.speed * this.time_delta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_length -= moved;

        this.render();
    }

    render() {  // 画小饼~！
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
