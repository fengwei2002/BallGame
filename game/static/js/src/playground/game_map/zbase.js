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
