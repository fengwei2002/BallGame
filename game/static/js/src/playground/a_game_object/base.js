let GAME_OBJECTS = [];
// 创建一个数组

class GameObject {
    constructor() {
        // 每次调用构造函数的时候，就将 this 添加到数组中
        GAME_OBJECTS.push(this);

        this.has_called_start = false; // 表示是否执行过 start 函数，如果执行过，执行 update，没执行过执行，start 函数
        this.timedelta = 0; // 当前距离上一帧的时间间隔

    }
    start() { // 只会在第一帧执行一次
    }

    update() { // 每一帧都会执行一次

    }

    on_destroy() { // 在删除物体之前执行一次，处理相关现场的操作

    }
    destroy() { // 删除当前物体
        this.on_destory();

        for (let i = 0; i < GAME_OBJECTS.length; i++) {
            if (GAME_OBJECTS[i] = this) {
                GAME_OBJECTS.splice(i, 1);
                // 从 i 开始删除一个元素
                break;
            }
        }
    }

}

let last_timestamp; // 记录上一次的时间戳，这样就可以根据时间来执行动画

let GAME_ANIMATION = function(timestamp) { // 传入时间戳，代表我是哪一个时刻调用的这一个函数
    for (let i = 0; i < GAME_OBJECTS.length; i++) {
        let obj = GAME_OBJECTS[i];
        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timesdelta = timestamp - last_timestamp;
            obj.update();
        }
    }
    last_timestamp = timestamp;

    requestAnimationFrame(GAME_ANIMATION); // 这个函数递归进行调用自己，形成动画
}

requestAnimationFrame(GAME_ANIMATION); // 在一秒之内调用 60 次这个函数，
