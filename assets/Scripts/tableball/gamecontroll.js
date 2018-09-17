cc.Class({
    extends: cc.Component,
    properties: {
        gravity: cc.v2(0, -320)
    },

    fanhui: function () {
        cc.director.loadScene('start');
    },
    onLoad: function () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = this.gravity;
    },

    restart: function () {
        var balls = cc.find("Canvas/balls");
        for (let i = 0,len = balls.childrenCount; i < len; i++){
            balls.children[i].getComponent("ball").restart();
        }
        cc.find("Canvas/whiteball").getComponent("white").restart();
    },
});