// 这个文件是 js 实现的一个简易的游戏引擎
// 功能包含：
//          对 GAME_OBJECTS 中的所有变量进行逐帧渲染
//

let GAME_OBJECTS = []; // 创建一个数组, 数组中的所有物品都要进行渲染更新

class GameObject {
    constructor() { // 每次调用构造函数的时候，就将 this 添加到数组中
        GAME_OBJECTS.push(this);

        this.has_called_start = false; // 表示是否执行过 start 函数，如果执行过，执行 update，
        // 没执行过执行 start 函数

        this.time_delta = 0;
        // 当前距离上一帧的时间间隔
    }


    start() { // 只会在第一帧执行一次
    }


    update() { // 每一帧都会执行一次
    }


    on_destroy() { // 只会在删除物体之前执行一次，执行处理相关现场的操作
    }


    destroy() { // 调用 destory 函数就在数组中删除当前物体，不再继续提供渲染服务
        this.on_destroy();

        for (let i = 0; i < GAME_OBJECTS.length; i++) {
            if (GAME_OBJECTS[i] === this) {
                GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}


let last_time_stamp; // 记录上一次的时间戳，这样就可以根据时间来执行动画


let GAME_ANIMATION = function (time_stamp) { // 传入时间戳，代表我是哪一个时刻调用的这一个函数

    for (let i = 0; i < GAME_OBJECTS.length; i++) {
        let obj = GAME_OBJECTS[i];

        if (!obj.has_called_start) { // 如果数组中的 某一个元素没有启动的话，进行启动
            obj.start();
            obj.has_called_start = true;
        } else { // 如果之前启动过，那么就将当前元素的 time_delta 置为当前的时间戳 减去上一次的时间戳
            // 然后不停的执行 update 函数，相关的 update 函数在继承类中实现
            obj.time_delta = time_stamp - last_time_stamp;
            obj.update();
        }
    }

    last_time_stamp = time_stamp;

    requestAnimationFrame(GAME_ANIMATION); // 这个函数递归进行调用自己，形成动画
}

requestAnimationFrame(GAME_ANIMATION); // 在一秒之内调用 60 次这个函数，