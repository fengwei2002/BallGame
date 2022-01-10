// 这是 GameMap 的基类创建 js，GameMap 类从 GameObject 继承而来
// 功能包含：
//          在 playground 下添加 canvas 画布
//          将 canvas 画布赋值给成员变量 this.ctx

class GameMap extends GameObject {
    constructor(playground_root) {
        super();
        this.playground_root = playground_root;

        this.canvas = document.createElement("canvas");
        this.canvas.className = "game-map-canvas";
        this.canvas.innerHTML = ``;

        const rect = this.canvas.getBoundingClientRect();
        // rect 得到当前的盒子左边界距离浏览器的左上方的距离

        this.canvas.width = playground_root.width;
        this.canvas.height = playground_root.height;
        // 为了实现自适应，所以 root 的 height 和 width 就需要进行自适应[

        // 注意这里使用原生 JS 创建 canvas 的时候必须指定长度和宽度，而不是使用 css 指定长度和宽度
        // 否则就会出现距离比例不匹配的问题，
        // 使用 css 控制 canvas的大小的话，canvas 实际还是 300 * 150，而不是具体的宽度，所以画的图就会模糊并且
        // 距离范围也会缩小到 300 * 150 下！！！！！！！！！！！！

        this.ctx = this.canvas.getContext("2d");
        this.playground_root.playground.appendChild(this.canvas);
    }

    start() {}

    update() {
        // 实现 GameMap 的每一帧都会调用的 update 函数
        // 也就是不停的绘制 canvas 矩形画布
        this.render();
    }

    render() {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
