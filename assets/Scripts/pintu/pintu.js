var Utils = require('Utils');
var gametype = cc.Enum({
    "three": 3,
    "four": 4,
    "five": 5
})
cc.Class({
    extends: cc.Component,
    properties: {
        games: {
            default: gametype.three,
            type: gametype
        }
    },

    onLoad: function () {
        this._obj = Utils.bindNode(this.node);
        this.games = 3;
        this.init();
    },

    init: function (){
        this.near = [];
        this.lastvalue = '';
        this.len = (this.games * this.games) + 1;
        for (let i = 0; i < 3; i++){
            this._obj['game' + (i + 3)]._Node.active = false;
        }
        this._obj['game' + this.games]._Node.active = true;
        for (let i = 1; i < this.len; i++) {
            var block = this._obj['game' + this.games]['block' + i]._Node;
            block.value = i;
            block.oldvalue = i;
        }
        for (let i = 0; i < 100; i++) {
            this.random_pos();
        }
        this.startgame = true;
        this._obj.end._Node.active = false;
    },

    random_pos: function () {
        this.near = [];
        var whiteblock = this._obj['game' + this.games]['block' + this.games * this.games]._Node;
        var distance = 0;
        if (this.games === 3) {
            distance = 220;
        } else if (this.games === 4) {
            distance = 170;
        } else {
            distance = 130;
        }
        for (let i = 1; i < this.len - 1; i++) {
            var block = this._obj['game' + this.games]['block' + i]._Node;
            if (cc.pDistance(block.getPosition(), whiteblock.getPosition()) < distance) {
                this.near.push(i);
            }
        }
        var randomvalue = Utils.getRandomFrom(0, this.near.length);
        var value = this.near[randomvalue];
        if (value != this.lastvalue) {
            this.move(value);
            this.lastvalue = value;
        } else {

        }
    },

    touchblock: function (event, eventdata) {
        if (this.startgame) {
            this.move(eventdata);
        }
    },

    move: function (num) {
        var block = this._obj['game' + this.games]['block' + num]._Node;
        var whiteblock = this._obj['game' + this.games]['block' + this.games * this.games]._Node;
        var distance = 0;
        if (this.games === 3) {
            distance = 220;
        } else if (this.games === 4) {
            distance = 170;
        } else {
            distance = 130;
        }
        if (cc.pDistance(block.getPosition(), whiteblock.getPosition()) < distance) {
            var temp = cc.v2(whiteblock.x, whiteblock.y);
            var value = whiteblock.value;
            whiteblock.x = block.x;
            whiteblock.y = block.y;
            block.x = temp.x;
            block.y = temp.y;
            whiteblock.value = block.value;
            block.value = value;
        }
        if (this.check() && this.startgame) {
            cc.log('You Win');
            this._obj.end._Node.active = true;
            this.startgame = false;
        }
    },

    restart: function () {
        this.startgame = false;
        this._obj.end._Node.active = false;
        for (let i = 0; i < 100; i++) {
            this.random_pos();
        }
        this.startgame = true;
    },

    check: function () {
        // for (let i = 1; i < this.len; i++) {
        //     var block = this._obj['game' + this.games]['block' + i]._Node;
        //     if (block.value !== i) {
        //         return false;
        //     }
        // }
        // return true;
        for (let i = 1; i < this.len; i++) {
            var block = this._obj['game' + this.games]['block' + i]._Node;
            if (block.value !== block.oldvalue) {
                return false;
            }
        }
        return true;
    },

    changeDifficulty: function () {
        this._obj.xiala._Node.active = true;
        this._obj.xiala.bg._Node.scaleY = 0;
        this._obj.xiala.toggle._Node.active = false;
        var action1 = cc.scaleTo(0.5, 1);
        var action2 = cc.delayTime(0.2);
        var action3 = cc.callFunc(() => {
            this._obj.xiala.toggle._Node.active = true;
        });
        var seq = cc.sequence(action1, action2, action3);
        this._obj.xiala.bg._Node.runAction(seq);
    },

    choice: function (event,eventdata){
        this.games = eventdata * 1;
        // for (let i = 0; i < 3; i++) {
        //     this._obj['game' + (i + 3)]._Node.active = false;
        // }
        // this._obj['game' + this.games]._Node.active = true;
        // this.len = (this.games * this.games) + 1;
        this.init();
        this._obj.xiala._Node.active = false;
    },
});