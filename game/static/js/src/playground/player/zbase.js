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
        let a = Number(this.x) / 10;
        let b = Number(this.y) / 10;
        let c = Number(this.radius) / 10;

        this.ctx.beginPath();
        this.ctx.arc(a, b, c, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    }
}
