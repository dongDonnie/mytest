cc.Class({
    extends: cc.Component,
    properties: {
        people: cc.Node,
        stairs: cc.Node,
        score: cc.Label,
        restartPanel:cc.Node,
    },

    onLoad: function () {
        // cc.director.getPhysicsManager().enabled = true; // 开启了物理引擎
        cc.director.getCollisionManager().enabled = true; //打开碰撞系统
        this.stairNumber = 0;
        cc.gameOver = false;

        for (let i = 0, len = this.stairs.childrenCount; i < len; i++){
            this.stairs.children[i].oldY = this.stairs.children[i].y;
        }
        this.people.oldY = this.people.y;
        this.people.oldX = this.people.x;

        cc.find("Canvas/bj").on("touchstart", this.touchstart, this);
    },

    init: function () {
        this.stairNumber = 0;
        cc.gameOver = false;
        this.stairs.y = 0;
        for (let i = 0, len = this.stairs.childrenCount; i < len; i++) {
            var stair = this.stairs.children[i];
            stair.y = stair.oldY;
            stair.children[0].active = true;
            stair.children[1].active = true;
        }
        this.people.y = this.people.oldY;
        this.people.x = this.people.oldX;
    },

    touchstart: function () {
        if (!cc.gameOver) {
            this.stairNumber++;
            this.obstaclesMove();
            this.setScore();
        }
    },

    setScore: function () {
        this.score.string = "分数：" + this.stairNumber;
    },

    obstaclesMove: function () {
        if (this.stairNumber > 2) {
            this.people.runAction(cc.moveBy(0.1, 0, 75));
            this.stairs.runAction(cc.moveBy(0.1, 0, -75));
            setTimeout(() => {
                this.people.runAction(cc.moveBy(0.1, 0, -75));
                this.stairs.runAction(cc.moveBy(0.1, 0, -75));
            }, 100);
        } else {
            this.people.runAction(cc.moveBy(0.1, 0, 150));
        }

        if (this.stairs.y <= -300) {
            var step = this.stairNumber - 5;
            var stair = this.stairs.children[step % 12];
            stair.y = 1100 + step * 150;
            stair.children[0].active = true;
            stair.children[1].active = true;

            var r = Math.random();
            if (r < 0.5) stair.children[0].active = false;
            else stair.children[1].active = false;
            if (this.stairNumber % 10 === 4) {
                stair.children[0].active = true;
                stair.children[1].active = true;
            }
        }
    },

    restart: function (){
        this.restartPanel.active = false;
        this.init();
        this.setScore();
    },
});