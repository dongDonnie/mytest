cc.Class({
    extends: cc.Component,
    properties: {

    },

    onLoad: function () {
        this.gametype = 3;
        cc.find("Canvas/end").active = false;
        for (let i = 3; i < 6; i++) {
            cc.find("Canvas/game" + i).active = false;
        }
        cc.find("Canvas/game" + this.gametype).active = true;
        this.breakRand();
        this.setSprite();
    },

    setSprite: function () {
        var game = cc.find("Canvas/game" + this.gametype);
        if (this.gametype === 3) {
            for (var i = 0; i < 9; i++) {
                var value = this.myArr[i];
                game.getChildByName("block" + value).value = i + 1;
                if (i % 3 === 0) {
                    game.getChildByName("block" + value).x = -210;
                } else if (i % 3 === 1) {
                    game.getChildByName("block" + value).x = 0;
                } else {
                    game.getChildByName("block" + value).x = 210;
                }
                if (Math.floor(i / 3) === 0) {
                    game.getChildByName("block" + value).y = 210;
                } else if (Math.floor(i / 3) === 1) {
                    game.getChildByName("block" + value).y = 0;
                } else {
                    game.getChildByName("block" + value).y = -210;
                }
            }
        } else if (this.gametype === 4) {
            for (var i = 0; i < 16; i++) {
                var value = this.myArr[i];
                game.getChildByName("block" + value).value = i + 1;
                if (i % 4 === 0) {
                    game.getChildByName("block" + value).x = -232.5;
                } else if (i % 4 === 1) {
                    game.getChildByName("block" + value).x = -77.5;
                } else if (i % 4 === 2) {
                    game.getChildByName("block" + value).x = 77.5;
                } else {
                    game.getChildByName("block" + value).x = 232.5;
                }
                if (Math.floor(i / 4) === 0) {
                    game.getChildByName("block" + value).y = 232.5;
                } else if (Math.floor(i / 4) === 1) {
                    game.getChildByName("block" + value).y = 77.5;
                } else if (Math.floor(i / 4) === 2) {
                    game.getChildByName("block" + value).y = -77.5;
                } else {
                    game.getChildByName("block" + value).y = -232.5;
                }
            }
        } else {
            for (var i = 0; i < 25; i++) {
                var value = this.myArr[i];
                game.getChildByName("block" + value).value = i + 1;
                if (i % 5 === 0) {
                    game.getChildByName("block" + value).x = -246;
                } else if (i % 5 === 1) {
                    game.getChildByName("block" + value).x = -123;
                } else if (i % 5 === 2) {
                    game.getChildByName("block" + value).x = 0;
                } else if (i % 5 === 3) {
                    game.getChildByName("block" + value).x = 123;
                } else {
                    game.getChildByName("block" + value).x = 246;
                }
                if (Math.floor(i / 5) === 0) {
                    game.getChildByName("block" + value).y = 248.5;
                } else if (Math.floor(i / 5) === 1) {
                    game.getChildByName("block" + value).y = 125.5;
                } else if (Math.floor(i / 5) === 2) {
                    game.getChildByName("block" + value).y = 2.5;
                } else if (Math.floor(i / 5) === 3) {
                    game.getChildByName("block" + value).y = -120.5;
                } else {
                    game.getChildByName("block" + value).y = -243.5;
                }
            }
        }
    },

    touchblock: function (event, eventdata) {
        var whiteblock = cc.find("Canvas/game" + this.gametype + "/block" + this.gametype * this.gametype);
        var block = event.target;
        var distance = 0;
        if (this.gametype === 3) {
            distance = 220;
        } else if (this.gametype === 4) {
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
        if (this.check()) {
            cc.find("Canvas/end").active = true;
        }
    },

    check: function () {
        var len = this.gametype * this.gametype;
        var game = cc.find("Canvas/game" + this.gametype);
        for (var i = 1; i <= len; i++) {
            var block = game.getChildByName("block" + i);
            if (block.value !== i) {
                return false;
            }
        }
        return true;
    },

    breakRand: function () {
        var temp = [];
        var len = this.gametype * this.gametype;
        for (var i = 1; i <= len; i++) {
            temp[i] = i;
        }
        var value = 0;
        temp.sort(function () {
            return Math.random() - 0.5;
        })
        for (var i = 0; i < len - 1; i++) {
            for (var j = i + 1; j < len; j++) {
                if (temp[i] > temp[j]) {
                    value++;
                }
            }
        }
        if (value % 2 == 1) {
            this.breakRand();
        } else {
            cc.log(temp + "   value = " + value);
            this.myArr = temp;
        }
    },

    restart: function () {
        cc.find("Canvas/end").active = false;
        this.breakRand();
        this.setSprite();
    },

    changeDifficulty: function () {
        var xiala = cc.find("Canvas/xiala");
        xiala.active = true;
        xiala.children[0].scaleY = 0;
        xiala.children[1].active = false;
        var action1 = cc.scaleTo(0.5, 1);
        var action2 = cc.delayTime(0.2);
        var action3 = cc.callFunc(() => {
            xiala.children[1].active = true;
        });
        var seq = cc.sequence(action1, action2, action3);
        xiala.children[0].runAction(seq);
    },

    choice: function (event, eventdata) {
        this.gametype = eventdata * 1;
        for (let i = 3; i < 6; i++){
            cc.find("Canvas/game" + i).active = false;
        }
        cc.find("Canvas/game" + this.gametype).active = true;
        cc.find("Canvas/xiala").active = false;
        this.breakRand();
        this.setSprite();
    },
});