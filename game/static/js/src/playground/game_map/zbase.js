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
        this.ctx.fillStyle = "rgba(148, 0, 211, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
