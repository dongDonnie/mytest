cc.Class({
    extends: cc.Component,
    properties: {
        
    },
    fanhui: function () {
        cc.director.loadScene('start');
    },

    onLoad: function () {
        this.g = this.node.getComponent(cc.Graphics);
        this.g.clear();
        this.g.moveTo(375, 667);
        this.node.on("touchstart", this.touchstart, this);
        this.node.on("touchmove", this.touchmove, this);
        this.node.on("touchend", this.touchend, this);
        this.node.on("touchcancel", this.touchend, this);
    },

    touchstart: function (eve){
        var pos = eve.getLocation();
        this.drawLine(pos);
    },

    touchmove: function (eve) {
        // var pos = eve.getLocation();
        // this.g.lineTo(pos.x, pos.y);
        // this.g.stroke();
        var pos = eve.getLocation();
        this.drawLine(pos);
    },

    drawLine: function (pos){
        this.g.clear();
        this.g.moveTo(375, 667);
        var time = 1600 / Math.sqrt(Math.pow((pos.y - 667), 2) + Math.pow((pos.x - 375), 2));
        var tempY = time * Math.abs(pos.y - 667);
        var tempX = time * Math.abs(pos.x - 375);
        if (pos.y > 667) tempY += 667;
        if (pos.y < 667) tempY = -(tempY - 667);
        if (pos.x > 375) tempX += 375;
        if (pos.x < 375) tempX = -(tempX - 375);
        this.g.lineTo(tempX, tempY);
        this.g.stroke();
    },

    touchend: function (){
        this.g.clear();
    },
});