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
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
