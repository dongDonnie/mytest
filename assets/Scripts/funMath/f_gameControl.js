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
        this.targetValue.string = 9;
        cc.find('Canvas/curValue').getComponent(cc.Label).string = 0;
        var s = setInterval(() => {
            if (!data.gameOver) {
                let num = Math.floor(Math.random() * 3 + 3);
                this.createball(num);
            } else {
                clearInterval(s);
            }
        },5000)
    },

    /**
     * 生成气球
     */
    createball: function (num) {
        var n = 1;
        var s = setInterval(() => {
            n++;
            let b = cc.instantiate(this.ball);
            b.parent = this.balls;
            b.x = Math.random() * 20;
            b.y = 700;
            b.value = Math.floor(Math.random() * 5 + 3);
            b.getChildByName('label').getComponent(cc.Label).string = b.value;
            data.ballPool.push(b.value);
            if (n > num) clearInterval(s);
        }, 10)

        setTimeout(() => {
            for (let i = 0, len = this.balls.childrenCount; i < len; i++){
                if (this.balls.children[i].y >650) {
                    data.gameOver = true;
                    cc.log("gameOver");
                    break;
                }
            }
        }, 3000);
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
            for (let i = 0, len = data.selectArray.length; i < len; i++) {
                for (let j = 0, len = data.ballPool.length; j < len; j++) {
                    if (data.ballPool[j] === data.selectArray[i]) {
                        data.ballPool.splice(j, 1);
                        break;
                    }
                }
            }
            data.selectArray = [];
            cc.find('Canvas/curValue').getComponent(cc.Label).string = 0;
            this.getTargetValue();
        }
    },

    /**
     * 获取目标值
     */
    getTargetValue: function () {
        let poolLength = data.ballPool.length;
        if (poolLength === 0) return;
        let num = Math.floor(Math.random() * poolLength + 1);
        num = num > 5 ? 5 : num;
        let tempArr = [];
        let total = 0;
        for (let i = 0, len = poolLength; i < len; i++) {
            tempArr.push(data.ballPool[i]);
        }
        for (let i = 0; i < num; i++){
            let index = Math.floor(Math.random() * tempArr.length);
            total += tempArr[index];
            tempArr.splice(index, 1);
        }
        data.targetValue = total;
        this.targetValue.string = total;
    },
});