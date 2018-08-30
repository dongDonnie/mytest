cc.Class({
    extends: cc.Component,
    properties: {
        bg: cc.Node,
        speed: 100,
        sprites: [cc.SpriteFrame],
    },

    onLoad: function () {
        this.r = Math.floor(Math.random() * 4);
        this.bg.color = this.getRandomColor();
        // this.bg.getComponent(cc.Sprite).spriteFrame = this.sprites[this.r];
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

    changeSprite: function () {
        let url = "";
        if (this.r === 0) {
            url = ""
        } else if (this.r === 1) {

        } else if (this.r === 2) {

        } else {

        }

    },

    checkPos: function () {
        if (this.node.y < -314) {
            if (this.node.pos === 0) {
                if (cc.find('Canvas/player1').curcolor !== this.r && this.r !== 3) {
                    cc.gameover = true;
                    cc.find("Canvas/resultPanel").active = true;
                } else {
                    this.node.destroy();
                }
            } else if (this.node.pos === 1) {
                if (cc.find('Canvas/player2').curcolor !== this.r && this.r !== 3) {
                    cc.gameover = true;
                    cc.find("Canvas/resultPanel").active = true;
                } else {
                    this.node.destroy();
                }
            }
            if (this.r === 3) {

            }
        }
    },

    update: function (dt) {
        if (cc.gameover) return;
        this.node.y -= dt * this.speed;
        this.checkPos();
    },
});