cc.Class({
    extends: cc.Component,
    properties: {

    },

    onLoad: function () {
        this.node.curcolor = 0;
        this.node.on("touchstart", this.touchstart, this);
    },

    touchstart: function () {
        this.node.rotation += 120;
        this.node.rotation %= 360;
        this.node.curcolor = this.node.rotation / 120;
    },
});