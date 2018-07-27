cc.Class({
    extends: cc.Component,
    properties: {
        blockpre: cc.Prefab,
        blockParent:cc.Node,
        createTime: 2,
    },

    onLoad: function () {
        // cc.director.getCollisionManager().enabled = true; //打开碰撞系统
        // cc.director.getPhysicsManager().enabled = true; // 开启了物理引擎
        this.durtion = 0;
    },

    creatBlocks: function (){
        var block = cc.instantiate(this.blockpre);
        block.parent = this.blockParent;
        var ran = Math.floor(Math.random() * 2);
        block.x = ran === 0 ? -180 : 180;
        block.y = 750;
        block.pos = ran;
    },

    update: function (dt) {
        if (cc.gameover) return;
        if (this.durtion < this.createTime) {
            this.durtion += dt;
            return;
        }

        this.durtion = Math.random();
        this.creatBlocks();
    },
});