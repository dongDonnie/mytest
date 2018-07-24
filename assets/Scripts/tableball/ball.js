cc.Class({
    extends: cc.Component,
    properties: {
        
    },

    onLoad: function () {
        this.oldX = this.node.x;
        this.oldY = this.node.y;
        this.body = this.node.getComponent(cc.RigidBody);
        this.balls = cc.find("Canvas/balls");
        this.gameControll = cc.find("Canvas").getComponent("gamecontroll");
    },

    restart: function () {
        this.node.active = true;
        this.node.x = this.oldX;
        this.node.y = this.oldY;

        this.body.linearVelocity = cc.p(0, 0);
        this.body.angularVelocity = 0;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.group == "pocket") {
            this.node.active = false;
            for (let i = 0,len = this.balls.childrenCount; i < len; i++){
                if (this.balls.children[i].active === true) {
                    return;
                }
            }
            this.gameControll.restart();
        }
    },
});