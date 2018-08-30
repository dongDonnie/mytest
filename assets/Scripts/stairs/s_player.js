cc.Class({
    extends: cc.Component,
    properties: {
        speed: 200,
    },

    onLoad: function () {
        this.dir = 1;
        this.collision = false;
    },
    onCollisionEnter: function () {
        if (!this.collision) {
            this.collision = true;
            this.dir = this.dir === 1 ? -1 : 1;
        }
        setTimeout(() => {
            this.collision = false;
        }, 10);
    },
    update: function (dt) {
        this.node.x += dt * this.dir * this.speed;
        if (cc.gameOver) return;
        if (Math.abs(this.node.x) > 360) {
            cc.gameOver = true;
            cc.find('Canvas/restartPanel').active = true;
        }
    },
});