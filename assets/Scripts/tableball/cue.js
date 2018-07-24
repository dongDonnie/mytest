cc.Class({
    extends: cc.Component,
    properties: {
        power: 18,
    },

    onLoad: function () {
        this.body = this.node.getComponent(cc.RigidBody);
    },

    shoot: function (dst) {
        var src = this.node.getPosition();
        var dir = cc.pSub(dst, src);

        var power_x = this.power * dir.x;
        var power_y = this.power * dir.y;

        // applyLinearImpulse(冲量大小向量, 球杆的原点转成世界坐标, true)
        this.body.applyLinearImpulse(cc.p(power_x, power_y), this.node.convertToWorldSpaceAR(cc.p(0, 0)), true);
    },

    onPreSolve: function () {
        this.node.active = false;
    },
});