cc.Class({
    extends: cc.Component,
    properties: {
        label: cc.EditBox,
        result: cc.Label,
    },

    onLoad: function () {
        this.getRandomNumber();
    },

    getRandomNumber: function () {
        var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.target = [];
        for (let i = 0; i < 4; i++) {
            let index = Math.floor(Math.random() * arr.length);
            this.target.push(arr[index]);
            arr.splice(index, 1);
        }
        cc.log(this.target);
    },

    compareNumber: function () {
        var num = this.label.string.split('');
        var a = 0;
        var b = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0, len = num.length; j < len; j++) {
                if (num[j] == this.target[i]) {
                    if (i === j) {
                        a++;
                    } else {
                        b++;
                    }
                    break;
                }
            }
        }
        this.result.string = "输入数字为：" + this.label.string + "\n\n结果为：" + a + "A" + b + "B";
        if (a === 4) {
            this.getRandomNumber();
        }
    },
});