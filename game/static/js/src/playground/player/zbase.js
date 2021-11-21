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
