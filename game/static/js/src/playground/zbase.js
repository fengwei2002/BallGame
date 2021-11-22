// 这是 playground 的总 js 入口
// 功能包含：
//          创建 div class="game-playground"，将这个 playground 容器添加到 root.game
//          保存总窗口的 宽度，高度 到成员变量
//          创建游戏地图 new GameMap()
//          创建玩家数组，
//              默认在全图的正中央创建玩家
//              添加 AI 玩家，随机颜色

class GamePlayGround {
   constructor(root) {
        this.root = root;

        this.playground = document.createElement('div');
        this.playground.className = 'game-playground';
        this.playground.innerHTML = ``;

        this.root.game.appendChild(this.playground);

        // 由于 width 的 height 会经常用到，所以这里读出
        this.width = this.playground.clientWidth;
        this.height = this.playground.clientHeight;

        this.start();
    }


    get_random_color() {
        let colors = ["blue", "red", "pink", "grey", "green", "purple"];
        return colors[Math.floor((Math.random()) * 5)];
    }


    start() {
        //this.hide();
        this.show();

		this.game_map = new GameMap(this);                                                                                                                                               23

        this.players = [];

        //playground_root, x, y, radius, color, speed, is_me
		this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, true));

        /*
 	    for (let i = 0; i < 5; i++) {
 	         this.players.push(new Player(this, this.width / 2,  this.height / 2, this.height * 0.05, this.get_random_color(), this.height * 0.15, false));
        }*/
    }

    show() { // 展示 playground 页面
        this.playground.style.display="block";
    }

    hide() { // 隐藏 playground 页面
        this.playground.style.display="none";
    }

    update() {
    }

    render() {
    }
}
