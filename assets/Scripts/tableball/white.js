cc.Class({
    extends: cc.Component,
    properties: {

    },

    onLoad: function () {
        this.oldX = this.node.x;
        this.oldY = this.node.y;
        this.cue = cc.find("Canvas/cue");
        this.body = this.node.getComponent(cc.RigidBody);

        this.g = cc.find("Canvas/bg").getComponent(cc.Graphics);
        this.g.clear();

        this.node.on("touchmove", this.touchmove, this);
        this.node.on("touchend", this.touchend, this);
        this.node.on("touchcancel", this.touchend, this);
    },

    touchmove: function (eve) {
        var touchPos = this.node.parent.convertToNodeSpaceAR(eve.getLocation());
        var thisPos = this.node.getPosition();
        var dir = cc.pSub(touchPos, thisPos);
        var len = cc.pLength(dir);
        if (len < 30) {
            this.cue.active = false;
            return;
        }

        // this.drawLine(touchPos);

        // var results = cc.director.getPhysicsManager().rayCast(touchPos, thisPos, cc.RayCastType.Any);
        // cc.log(results)

        this.cue.active = true;
        var r = Math.atan2(dir.y, dir.x);
        var degree = r * 180 / Math.PI;
        this.cue.rotation = 180 - degree;
        this.cue.x = touchPos.x;
        this.cue.y = touchPos.y;
    },

    touchend: function () {
        if (this.cue.active)
            this.cue.getComponent("cue").shoot(this.node.getPosition());
        this.g.clear();
    },

    restart: function (){
        this.node.scale = 1;
        this.node.x = this.oldX;
        this.node.y = this.oldY;

        this.body.linearVelocity = cc.p(0, 0);
        this.body.angularVelocity = 0;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.group == "pocket") {
            this.node.scale = 0;
            this.scheduleOnce(this.restart, 1);
        }
    },

    drawLine: function (pos) {
        this.g.clear();
        var nodepos = this.node.getPosition();
        nodepos = this.node.parent.convertToWorldSpaceAR(nodepos);
        pos = this.node.parent.convertToWorldSpaceAR(pos);
        this.g.moveTo(pos.x, pos.y);
        var time = 1600 / Math.sqrt(Math.pow((nodepos.y - pos.y), 2) + Math.pow((nodepos.x - pos.x), 2));
        var tempY = time * Math.abs(nodepos.y - pos.y);
        var tempX = time * Math.abs(nodepos.x - pos.x);
        if (nodepos.y > pos.y) tempY += pos.x;
        if (nodepos.y < pos.y) tempY = -(tempY - pos.y);
        if (nodepos.x > pos.x) tempX += pos.x;
        if (nodepos.x < pos.x) tempX = -(tempX - pos.x);
        this.g.lineTo(tempX, tempY);
        this.g.stroke();
    },
});