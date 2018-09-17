cc.Class({
    extends: cc.Component,

    properties: {
        xpos: cc.Node,
        ypos: cc.Node,
        zpos: cc.Node,
        pre: cc.Prefab,
        editBox: cc.EditBox,
    },

    fanhui: function () {
        cc.director.loadScene('start');
    },

    onLoad() {
        this.pos = {};
        this.pos.X = this.xpos;
        this.pos.Y = this.ypos;
        this.pos.Z = this.zpos;
        this.arr = [];
    },

    input: function () {
        this.arr = [];
        this.stopAllNodeAction();
        this.xpos.removeAllChildren();
        this.ypos.removeAllChildren();
        this.zpos.removeAllChildren();
        var num = parseInt(this.editBox.string);
        this.createNode(num);
        this.startGame(num, "X", "Y", "Z");
        cc.log(this.arr.length);
        this.animation();
    },

    stopAllNodeAction: function (){
        for (let i = 0, len = this.xpos.childrenCount; i < len; i++){
            this.xpos.children[i].stopAllActions();
        }
        for (let i = 0, len = this.ypos.childrenCount; i < len; i++) {
            this.ypos.children[i].stopAllActions();
        }
        for (let i = 0, len = this.zpos.childrenCount; i < len; i++) {
            this.zpos.children[i].stopAllActions();
        }
    },

    createNode: function (num){
        for (let i = num; i > 0; i--){
            var node = cc.instantiate(this.pre);
            node.parent = this.xpos;
            node.name = i+"";
            node.width = 60 + 20 * i;
            node.y = 10 + (num - i) * 20;
            node.children[0].getComponent(cc.Label).string = i;
        }  
    },

    startGame: function (n, x, y, z) {
        if (n === 1) {
            this.arr.push([x, z]);
            // cc.log(x + " --> " + z);
        }
        else {
            this.startGame(n - 1, x, z, y);   //将n-1个从x移到y
            this.arr.push([x, z]);            //将最后一个从x移动到z
            // cc.log(x + " --> " + z);      
            this.startGame(n - 1, y, x, z);   //将n-1个从y移动到z
        }
    },

    animation: function () {
        if (this.arr.length == 0) return;
        let arr = this.arr[0];
        cc.log(arr);
        let num = arr[1].charCodeAt(0) - arr[0].charCodeAt(0);
        let pos = num * 240;
        let startpos = this.pos[arr[0]];
        let targetpos = this.pos[arr[1]];
        let target = getNode(startpos);
        let targetY = 10 + targetpos.childrenCount * 20;
        let action1 = cc.moveTo(1, cc.v2(target.x, 270));
        let action2 = cc.moveTo(1, cc.v2(pos, 270));
        let action3 = cc.moveTo(1, cc.v2(pos, targetY));
        // let action2 = cc.moveTo(3, cc.v2(pos, targetY));
        let action4 = cc.callFunc(() => {
            target.parent = targetpos;
            target.x = 0
            this.arr.shift();
            this.animation()
        })
        target.runAction(cc.sequence(action1, action2,action3,action4));
        

        function getNode(node){
            var index = 100;
            var targetNode = null;
            for (let i = 0, len = node.childrenCount; i < len; i++){
                var n = parseInt(node.children[i].name)
                if (index > n) {
                    targetNode = node.children[i];
                    index = n;
                }
            }
            return targetNode;
        }
    },
});
