var data = require("f_data");
cc.Class({
    extends: cc.Component,
    properties: {
        ball: cc.Prefab,
        balls: cc.Node,
        targetValue: cc.Label,
    },

    onLoad: function () {
        cc.director.getPhysicsManager().enabled = true; // 开启了物理引擎

        this.createball(9);
        this.targetValue.string = 12;
        cc.find('Canvas/curValue').getComponent(cc.Label).string = 0;
    },

    /**
     * 生成气球
     * value: 气球的值   num: 生成气球的数目
     */
    createball: function (num) {
        var n = 1;
        var s = setInterval(() => {
            n++;
            let b = cc.instantiate(this.ball);
            b.parent = this.balls;
            b.x = Math.random() * 20;
            b.y = 700;
            b.value = 3;
            b.getChildByName('label').getComponent(cc.Label).string = b.value;
            if (n > num) clearInterval(s);
        }, 10)
    },

    /**
     * 判断选中的气球的和
     */
    judgeValue: function () {
        if (data.selectCount === data.targetValue) {
            var p = cc.find("Canvas/balls");
            for (let i = 0, len = p.childrenCount; i < len; i++) {
                if (p.children[i].selected) p.children[i].destroy();
            }
            data.selectArray = [];
            cc.find('Canvas/curValue').getComponent(cc.Label).string = 0;
        }
    },
});