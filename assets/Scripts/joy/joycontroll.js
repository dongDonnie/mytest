var Utils = require('Utils');
var DirectionType = cc.Enum({
    FOUR: 4,
    EIGHT: 8,
    ALL: 0,
})
cc.Class({
    extends: cc.Component,
    properties: {
        directiontype: {
            default: DirectionType.ALL,
            type: DirectionType
        }
    },

    onLoad: function () {
        this._obj = Utils.bindNode(this.node);
        this.rocker = this._obj.JoystickBG.Joystick._Node;
        this.rockerparent = this._obj.JoystickBG._Node;
        this.initEvent();
        this.move = false;
    },

    initEvent: function () {
        this.rocker.on('touchstart', this.touchstart, this);
        this.rocker.on('touchmove', this.touchmove, this);
        this.rocker.on('touchend', this.touchend, this);
        this.rocker.on('touchcancel', this.touchcancel, this);
    },

    touchstart: function () {
        
    },

    touchmove: function (event) {
        var radius = this.rockerparent.width / 2;
        var moveToPos = this.rockerparent.convertToNodeSpaceAR(event.getLocation());
        var scale = cc.pDistance(moveToPos, cc.v2(0, 0)) / radius;
        if (cc.pDistance(moveToPos, cc.v2(0, 0)) <= radius) {
            this.rocker.x = moveToPos.x;
            this.rocker.y = moveToPos.y;
        } else {
            this.rocker.x = moveToPos.x / scale;
            this.rocker.y = moveToPos.y / scale;
        }
        this.move = true;
        this.pNormalize = cc.pNormalize(moveToPos);
        if (this.directiontype === 4) {
            if (Math.abs(this.pNormalize.x) > Math.abs(this.pNormalize.y)) {
                this.pNormalize.y = 0;
            } else {
                this.pNormalize.x = 0;
            }
        } else if (this.directiontype === 8) {
            var angle = Math.atan(this.pNormalize.y / this.pNormalize.x) * (180 / Math.PI);
            if (-22.5< angle && angle < 22.5) {
                this.pNormalize.y = 0;
            } else if (angle > 67.5 || angle<-67.5) {
                this.pNormalize.x = 0;
            } else {
                this.pNormalize.x > 0 ? 0.5 : -0.5;
                this.pNormalize.y > 0 ? 0.5 : -0.5;
            }
        }
        this.pNormalize = cc.pNormalize(this.pNormalize);
    },

    touchend: function () {
        this.rocker.x = 0;
        this.rocker.y = 0;
        this.move = false;
    },

    touchcancel: function (){
        this.rocker.x = 0;
        this.rocker.y = 0;
        this.move = false;
    },

    update: function (dt){
        if (this.move) {
            var hero = this._obj.hero._Node;
            var speed = cc.pDistance(this.rocker.getPosition(), cc.v2(0, 0))
            hero.x += this.pNormalize.x * speed / 10;
            hero.y += this.pNormalize.y * speed / 10;
        }
    },
});