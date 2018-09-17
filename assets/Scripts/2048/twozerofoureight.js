import Utils from './Utils';
import {
    BADRESP
} from 'dns';
cc.Class({
    extends: cc.Component,
    properties: {
        blockPre: cc.Prefab,

    },

    fanhui: function (){
        cc.director.loadScene('start');
    },

    onLoad: function () {
        this.blocks = cc.find("Canvas/blocks");
        this.move = false;

        this.blocks.removeAllChildren();
        this.getBlockPos();
        this.dir = 0; //方向： 1 右， 2 左， 3 上， 4 下

        this.node.on("touchstart", this.touchstart, this);
        this.node.on("touchmove", this.touchmove, this);
        this.node.on("touchend", this.touchend, this);
        this.node.on("touchcancel", this.touchend, this);
    },

    touchstart: function (eve) {
        this.startpos = eve.getLocation();
    },

    touchmove: function (eve) {
        if (this.move) return;
        var pos = eve.getLocation();
        var dir = cc.pSub(pos, this.startpos);
        var len = cc.pLength(dir);
        if (len < 80) return;
        this.move = true;
        if (Math.abs(dir.x) > Math.abs(dir.y) && dir.x > 0) this.dir = 1;
        if (Math.abs(dir.x) > Math.abs(dir.y) && dir.x < 0) this.dir = 2;
        if (Math.abs(dir.x) < Math.abs(dir.y) && dir.y > 0) this.dir = 3;
        if (Math.abs(dir.x) < Math.abs(dir.y) && dir.y < 0) this.dir = 4;
        this.combineBlock();
    },

    touchend: function () {
        
    },

    combineBlock: function () {
        var arrs = [
            [],
            [],
            [],
            []
        ];
        this.canCreate = false;

        if (this.dir === 1 || this.dir === 2) {
            for (let i = 0, len = this.blocks.childrenCount; i < len; i++) {
                if (this.blocks.children[i].y === 75) {
                    arrs[0].push(this.blocks.children[i]);
                } else if (this.blocks.children[i].y === 225) {
                    arrs[1].push(this.blocks.children[i]);
                } else if (this.blocks.children[i].y === 375) {
                    arrs[2].push(this.blocks.children[i]);
                } else if (this.blocks.children[i].y === 525) {
                    arrs[3].push(this.blocks.children[i]);
                }
            }
        } else if (this.dir === 3 || this.dir === 4) {
            for (let i = 0, len = this.blocks.childrenCount; i < len; i++) {
                if (this.blocks.children[i].x === 75) {
                    arrs[0].push(this.blocks.children[i]);
                } else if (this.blocks.children[i].x === 225) {
                    arrs[1].push(this.blocks.children[i]);
                } else if (this.blocks.children[i].x === 375) {
                    arrs[2].push(this.blocks.children[i]);
                } else if (this.blocks.children[i].x === 525) {
                    arrs[3].push(this.blocks.children[i]);
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            if (arrs[i].length > 0) {
                this.moveBlock(arrs[i]);
            }
        }
        setTimeout(() => {
            if (this.checkOver()) {
                cc.find("Canvas/gameover").active = true;
                return;
            }
            if (this.canCreate)
                this.getBlockPos();
            this.move = false;
        }, 600);
    },

    moveBlock: function (arr) {
        if (this.dir === 1) {
            arr.sort((a, b) => {
                return b.x - a.x;
            })
            if (arr[0].x !== 525) this.canCreate = true;
            this.showAnimation(arr[0], 525, arr[0].y, false);
            // arr[0].x = 525;
            if (!arr[1]) return;
            if (arr[0].value === arr[1].value) {
                this.canCreate = true;
                this.showAnimation(arr[1], arr[0].x, arr[0].y, true);
                arr.splice(1, 1);
                this.setNodeValue(arr[0], arr[0].value * 2);
                if (!arr[1]) return;
                this.showAnimation(arr[1], 375, arr[1].y, false);
                // arr[1].x = 375;
                if (!arr[2]) return;
                if (arr[1].value === arr[2].value) {
                    this.showAnimation(arr[2], arr[1].x, arr[1].y, true);
                    arr.splice(2, 1);
                    this.setNodeValue(arr[1], arr[1].value * 2);
                } else {
                    this.showAnimation(arr[2], 225, arr[2].y, false);
                    // arr[2].x = 225;
                }
            } else {
                if (arr[1].x !== 375) this.canCreate = true;
                this.showAnimation(arr[1], 375, arr[1].y, false);
                // arr[1].x = 375;
                if (!arr[2]) return;
                if (arr[1].value === arr[2].value) {
                    this.canCreate = true;
                    this.showAnimation(arr[2], arr[1].x, arr[1].y, true);
                    arr.splice(2, 1);
                    this.setNodeValue(arr[1], arr[1].value * 2);
                    if (!arr[2]) return;
                    this.showAnimation(arr[2], 225, arr[2].y, false);
                } else {
                    if (arr[2].x !== 225) this.canCreate = true;
                    this.showAnimation(arr[2], 225, arr[2].y, false);
                    // arr[2].x = 225;
                    if (!arr[3]) return;
                    if (arr[2].value === arr[3].value) {
                        this.canCreate = true;
                        this.showAnimation(arr[3], arr[2].x, arr[2].y, true);
                        arr.splice(3, 1);
                        this.setNodeValue(arr[2], arr[2].value * 2);
                    }
                }
            }
        } else if (this.dir === 2) {
            arr.sort((a, b) => {
                return a.x - b.x;
            })
            if (arr[0].x !== 75) this.canCreate = true;
            this.showAnimation(arr[0], 75, arr[0].y, false);
            // arr[0].x = 75;
            if (!arr[1]) return;
            if (arr[0].value === arr[1].value) {
                this.canCreate = true;
                this.showAnimation(arr[1], arr[0].x, arr[0].y, true);
                // arr[1].destroy();
                arr.splice(1, 1);
                this.setNodeValue(arr[0], arr[0].value * 2);
                if (!arr[1]) return;
                this.showAnimation(arr[1], 225, arr[1].y, false);
                // arr[1].x = 225;
                if (!arr[2]) return;
                if (arr[1].value === arr[2].value) {
                    this.showAnimation(arr[1], arr[1].x, arr[1].y, true);
                    // arr[2].destroy();
                    arr.splice(2, 1);
                    this.setNodeValue(arr[1], arr[1].value * 2);
                } else {
                    this.showAnimation(arr[2], 375, arr[2].y, false);
                    // arr[2].x = 375;
                }
            } else {
                if (arr[1].x !== 225) this.canCreate = true;
                this.showAnimation(arr[1], 225, arr[1].y, false);
                // arr[1].x = 225;
                if (!arr[2]) return;
                if (arr[1].value === arr[2].value) {
                    this.canCreate = true;
                    this.showAnimation(arr[2], arr[1].x, arr[1].y, true);
                    // arr[2].destroy();
                    arr.splice(2, 1);
                    this.setNodeValue(arr[1], arr[1].value * 2);
                    if (!arr[2]) return;
                    this.showAnimation(arr[2], 375, arr[2].y, false);
                    // arr[2].x = 375;
                } else {
                    if (arr[2].x !== 375) this.canCreate = true;
                    this.showAnimation(arr[2], 375, arr[2].y, false);
                    // arr[2].x = 375;
                    if (!arr[3]) return;
                    if (arr[2].value === arr[3].value) {
                        this.canCreate = true;
                        this.showAnimation(arr[3], arr[2].x, arr[2].y, true);
                        // arr[3].destroy();
                        arr.splice(3, 1);
                        this.setNodeValue(arr[2], arr[2].value * 2);
                    }
                }
            }
        } else if (this.dir === 3) {
            arr.sort((a, b) => {
                return b.y - a.y;
            })
            if (arr[0].y !== 525) this.canCreate = true;
            this.showAnimation(arr[0], arr[0].x, 525, false);
            // arr[0].y = 525;
            if (!arr[1]) return;
            if (arr[0].value === arr[1].value) {
                this.canCreate = true;
                this.showAnimation(arr[1], arr[0].x, arr[0].y, true);
                // arr[1].destroy();
                arr.splice(1, 1);
                this.setNodeValue(arr[0], arr[0].value * 2);
                if (!arr[1]) return;
                this.showAnimation(arr[1], arr[1].x, 375, false);
                // arr[1].y = 375;
                if (!arr[2]) return;
                if (arr[1].value === arr[2].value) {
                    this.showAnimation(arr[2], arr[1].x, arr[1].y, true);
                    // arr[2].destroy();
                    arr.splice(2, 1);
                    this.setNodeValue(arr[1], arr[1].value * 2);
                } else {
                    this.showAnimation(arr[2], arr[2].x, 225, false);
                    // arr[2].y = 225;
                }
            } else {
                if (arr[1].y !== 375) this.canCreate = true;
                this.showAnimation(arr[1], arr[1].x, 375, false);
                // arr[1].y = 375;
                if (!arr[2]) return;
                if (arr[1].value === arr[2].value) {
                    this.canCreate = true;
                    this.showAnimation(arr[2], arr[1].x, arr[1].y, true);
                    // arr[2].destroy();
                    arr.splice(2, 1);
                    this.setNodeValue(arr[1], arr[1].value * 2);
                    if (!arr[2]) return;
                    this.showAnimation(arr[2], arr[2].x, 225, false);
                } else {
                    if (arr[2].y !== 225) this.canCreate = true;
                    this.showAnimation(arr[2], arr[2].x, 225, false);
                    // arr[2].y = 225;
                    if (!arr[3]) return;
                    if (arr[2].value === arr[3].value) {
                        this.canCreate = true;
                        this.showAnimation(arr[3], arr[2].x, arr[2].y, true);
                        // arr[3].destroy();
                        arr.splice(3, 1);
                        this.setNodeValue(arr[2], arr[2].value * 2);
                    }
                }
            }
        } else if (this.dir === 4) {
            arr.sort((a, b) => {
                return a.y - b.y;
            })
            if (arr[0].y !== 75) this.canCreate = true;
            this.showAnimation(arr[0], arr[0].x, 75, false);
            // arr[0].y = 75;
            if (!arr[1]) return;
            if (arr[0].value === arr[1].value) {
                this.canCreate = true;
                this.showAnimation(arr[1], arr[0].x, arr[0].y, true);
                // arr[1].destroy();
                arr.splice(1, 1);
                this.setNodeValue(arr[0], arr[0].value * 2);
                if (!arr[1]) return;
                this.showAnimation(arr[1], arr[1].x, 225, false);
                // arr[1].y = 225;
                if (!arr[2]) return;
                if (arr[1].value === arr[2].value) {
                    this.showAnimation(arr[2], arr[1].x, arr[1].y, true);
                    // arr[2].destroy();
                    arr.splice(2, 1);
                    this.setNodeValue(arr[1], arr[1].value * 2);
                } else {
                    this.showAnimation(arr[2], arr[2].x, 375, false);
                    // arr[2].y = 375;
                }
            } else {
                if (arr[1].y !== 225) this.canCreate = true;
                this.showAnimation(arr[1], arr[1].x, 225, false);
                // arr[1].y = 225;
                if (!arr[2]) return;
                if (arr[1].value === arr[2].value) {
                    this.canCreate = true;
                    this.showAnimation(arr[2], arr[1].x, arr[1].y, true);
                    // arr[2].destroy();
                    arr.splice(2, 1);
                    this.setNodeValue(arr[1], arr[1].value * 2);
                    if (!arr[2]) return;
                    this.showAnimation(arr[2], arr[2].x, 375, false);
                } else {
                    if (arr[2].y !== 375) this.canCreate = true;
                    this.showAnimation(arr[2], arr[2].x, 375, false);
                    // arr[2].y = 375;
                    if (!arr[3]) return;
                    if (arr[2].value === arr[3].value) {
                        this.canCreate = true;
                        this.showAnimation(arr[3], arr[2].x, arr[2].y, true);
                        // arr[3].destroy();
                        arr.splice(3, 1);
                        this.setNodeValue(arr[2], arr[2].value * 2);
                    }
                }
            }
        }
    },

    showAnimation: function (node, toX, toY, f) {
        var action1 = cc.moveTo(0.5, cc.p(toX, toY));
        var action2 = cc.callFunc(() => {
            if (f)
                node.destroy();
            node.x = toX;
            node.y = toY;
        })
        var seq = cc.sequence(action1, action2);
        node.runAction(seq);
    },

    getBlockPos: function () {
        if (this.blocks.childrenCount >= 16) return;
        var random = Utils.getRandomFrom(0, 16);
        var dy = Math.floor(random / 4);
        var dx = random % 4;
        var pos = cc.v2(dx * 150 + 75, dy * 150 + 75);
        for (let i = 0, len = this.blocks.childrenCount; i < len; i++) {
            if (this.blocks.children[i].x === pos.x && this.blocks.children[i].y === pos.y) {
                this.getBlockPos();
                return;
            }
        }
        var num = Math.random() > 0.5 ? 2 : 4;
        var block = cc.instantiate(this.blockPre);
        block.parent = this.blocks;
        block.x = pos.x;
        block.y = pos.y;
        this.setNodeValue(block, num, 1);
    },

    getNodeValue: function (node) {
        return node.getChildByName('label').getComponent(cc.Label).string * 1;
    },

    setNodeValue: function (node, num, s) {
        var st = s || 500;
        setTimeout(() => {
            node.getChildByName('label').getComponent(cc.Label).string = num;
        }, st);
        node.value = num;
        if (num == 2) node.getChildByName("bg").color = new cc.Color(238, 228, 219);
        if (num == 4) node.getChildByName("bg").color = new cc.Color(236, 224, 203);
        if (num == 8) node.getChildByName("bg").color = new cc.Color(240, 176, 127);
        if (num == 16) node.getChildByName("bg").color = new cc.Color(243, 148, 104);
        if (num == 32) node.getChildByName("bg").color = new cc.Color(241, 124, 99);
        if (num == 64) node.getChildByName("bg").color = new cc.Color(242, 93, 68);
        if (num == 128) node.getChildByName("bg").color = new cc.Color(233, 206, 119);
        if (num == 256) node.getChildByName("bg").color = new cc.Color(233, 204, 105);
        if (num == 512) node.getChildByName("bg").color = new cc.Color(235, 198, 91);
        if (num == 1024) node.getChildByName("bg").color = new cc.Color(235, 195, 80);
        if (num == 2048) node.getChildByName("bg").color = new cc.Color(238, 228, 219);
    },

    checkOver: function () {
        var block1 = null;
        var block2 = null;
        for (let i = 0, len = this.blocks.childrenCount; i < len; i++) {
            block1 = this.blocks.children[i];
            if (block1.value === 2048) {
                cc.find("Canvas/gameover/label").getComponent(cc.Label).string = "恭喜您，成功了";
                return true;
            }
            if (len < 16) return false;
            for (let j = 0; j < len; j++) {
                block2 = this.blocks.children[j];
                if (i !== j && cc.pDistance(block1.getPosition(), block2.getPosition()) < 160) {
                    if (block1.value === block2.value) {
                        return false;
                    }
                }
            }
        }
        cc.find("Canvas/gameover/label").getComponent(cc.Label).string = "继续努力哦";
        return true;
    },

    restart: function () {
        cc.find("Canvas/gameover").active = false;
        this.move = false;
        this.blocks.removeAllChildren();
        this.getBlockPos();
        this.dir = 0;
    },
});