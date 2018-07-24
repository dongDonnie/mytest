cc.Class({
    extends: cc.Component,
    properties: {
        bg: cc.Node,
        block: cc.Prefab,
        editor: cc.EditBox,
        title: cc.Label,

    },

    onLoad: function () {
        this.num = 3;
        this.getInterface();
    },

    print: function () {
        var total = [];
        var i, j, len;
        for (i = 0, len = this.num * 2 + 2; i < len; i++) {
            total[i] = 0;
        }
        for (i = 0; i < this.num; i++) {
            for (j = 0; j < this.num; j++) {
                total[i] += this.arr[i][j];
                total[i + this.num] += this.arr[j][i];
            }
            total[total.length - 2] += this.arr[i][i];
            total[total.length - 1] += this.arr[this.num - 1 - i][this.num - 1 - i];
        }

        cc.log(total);
    },

    getInterface: function () {
        this.num = parseInt(this.editor.string) || 3;
        this.num = this.num < 3 ? 3 : this.num;
        this.title.string = this.num + "阶幻方\n 幻和为：" + this.num * (this.num * this.num + 1) / 2;

        if (this.num % 2 === 1) this.oddmMagicSquare(this.num);
        else if (this.num % 4 === 0) this.doubleEvenMagicSquare(this.num);
        else if (this.num % 4 !== 0) this.singleEvenMagicSquare(this.num);
        this.print();
        var width = Math.floor(700 / this.num);
        this.bg.width = this.num * width;
        this.bg.height = this.bg.width;
        this.bg.removeAllChildren();

        for (let i = 0; i < this.arr.length; i++) {
            for (let j = 0; j < this.arr[i].length; j++) {
                var temp = cc.instantiate(this.block);
                temp.parent = this.bg;
                temp.width = width;
                temp.height = width;
                temp.getChildByName('bg').width = width - 2;
                temp.getChildByName('bg').height = width - 2;
                temp.getChildByName('label').getComponent(cc.Label).string = this.arr[i][j];
                temp.getChildByName('label').getComponent(cc.Label).fontSize = 40 - (2 * this.num);
            }
        }
    },

    oddmMagicSquare: function (n) {
        var arr = [];
        for (let i = 0; i < n; i++) {
            arr[i] = [];
            for (let j = 0; j < n; j++) arr[i][j] = 0;
        }

        //方法一：
        var y = Math.floor(n / 2),
            x = 0,
            num = 1;

        while (num <= n * n) {
            arr[x][y] = num;

            let x0 = x;
            let y0 = y;
            x0--;
            y0++;
            if (x0 < 0) x0 += n;
            if (y0 === n) y0 = 0;
            if (arr[x0][y0] === 0) {
                x = x0;
                y = y0;
            } else {
                x++;
                if (x === n) x = 0;
            }
            num++;
        }

        var judge = function (i, j, num, n, arr) {
            var i0 = (i - 1 + n) % n;
            var j0 = (j + 1 + n) % n;
            var i1 = (i + 2 + n) % n;
            var j1 = (j - 1 + n) % n;
            if (arr[i0][j0] == 0) {
                return arr[i0][j0] = num;
            } else {
                judge(i1, j1, num, n, arr);
            }
        }

        var setValue = function (num, n, arr) {
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (arr[i][j] == (num - 1)) {
                        judge(i, j, num, n, arr);
                        break;
                    }
                }
            }
        }

        //方法二：
        // arr[0][(n - 1) / 2] = 1;
        // for (let m = 2; m < n * n + 1; m++) {
        //     setValue(m, n, arr);
        // }
        this.arr = arr;
    },

    doubleEvenMagicSquare: function (n) {
        var arr = [];
        var num = 1;
        for (let i = 0; i < n; i++) {
            arr[i] = [];
            for (let j = 0; j < n; j++) {
                arr[i][j] = num++;
            }
        }
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (((i % 4 === 0 || i % 4 === 3) && (j % 4 == 0 || j % 4 === 3)) ||
                    ((i % 4 == 1 || i % 4 === 2) && (j % 4 == 1 || j % 4 === 2))) {
                    arr[i][j] = n * n - arr[i][j] + 1;
                }
            }
        }

        this.arr = arr;
    },

    singleEvenMagicSquare: function (n) {
        var k = n / 2;
        this.oddmMagicSquare(k);
        var arr = [];
        let i, j, temp
        for (i = 0; i < n; i++) {
            arr[i] = [];
            for (j = 0; j < n; j++) arr[i][j] = 0;
        }
        for (i = 0; i < k; i++) {
            for (j = 0; j < k; j++) {
                arr[i][j] = this.arr[i][j];
                arr[i][j + k] = this.arr[i][j] + k * k * 2;
                arr[i + k][j] = this.arr[i][j] + k * k * 3;
                arr[i + k][j + k] = this.arr[i][j] + k * k;
            }
        }

        let m = (n - 2) / 4;
        for (i = 0; i < k; i++) { //A象限和C象限对换数据  
            for (j = 0; j < m; j++) {
                temp = arr[i][j];
                arr[i][j] = arr[i + k][j];
                arr[i + k][j] = temp;
            }
        }

        let p = (k - 1) / 2; //1
        temp = arr[p][p];
        arr[p][p] = arr[p + k][p];
        arr[p + k][p] = temp;

        temp = arr[p][p - 1];
        arr[p][p - 1] = arr[p + k][p - 1];
        arr[p + k][p - 1] = temp;

        for (i = 0; i < k; i++) {
            for (j = 1; j < m; j++) {
                temp = arr[i][n - j];
                arr[i][n - j] = arr[i + k][n - j]
                arr[i + k][n - j] = temp;
            }
        }

        this.arr = arr;
    },

});