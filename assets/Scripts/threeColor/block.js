cc.Class({
    extends: cc.Component,
    properties: {
        bg: cc.Node,
        speed: 100,
    },

    onLoad: function () {
        this.r = Math.floor(Math.random() * 3);
        this.bg.color = this.getRandomColor();
        this.node.value = this.r;
    },

    getRandomColor: function () {
        var c1 = new cc.Color(255, 100, 100);
        var c2 = new cc.Color(100, 255, 100);
        var c3 = new cc.Color(100, 100, 255);
        if (this.r === 0) return c1;
        else if (this.r === 1) return c2;
        else return c3;
    },

    checkPos: function (){
        if (this.node.y < -314) {
            if (this.node.pos === 0) {
                if (cc.find('Canvas/player1').curcolor !== this.r) {
                    cc.gameover = true;
                } else {
                    this.node.destroy();
                }
            } else if (this.node.pos === 1) {
                if (cc.find('Canvas/player2').curcolor !== this.r) {
                    cc.gameover = true;
                } else {
                    this.node.destroy();
                }
            }
        }
    },

    update: function (dt) {
        if (cc.gameover) return;
        this.node.y -= dt * this.speed;
        this.checkPos();
    },
});