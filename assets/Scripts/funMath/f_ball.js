var data = require("f_data");
cc.Class({
    extends: cc.Component,
    properties: {
        label: cc.Label,
    },

    onLoad: function () {
        this.node.on("touchstart", this.touchstart, this);
        this.node.selected = false;
    },

    touchstart: function () {
        this.node.selected = !this.node.selected;
        if (this.node.selected) this.selecteEvent();
        else this.cancelSelectEvent();
        // cc.log(data.selectArray);
    },

    selecteEvent: function () {
        data.selectArray.push(this.node.value);
        this.node.color = new cc.Color(0, 255, 0);
        this.setCurrenValue();
    },

    cancelSelectEvent: function () {
        this.node.color = new cc.Color(255, 255, 255);
        let index = data.selectArray.indexOf(this.node.value);
        if (index != -1) data.selectArray.splice(index, 1);
        this.setCurrenValue();
    },

    /**
     * 显示当前选择的气球的和,并判断是否等于目标值
     */
    setCurrenValue: function (){
        let total = 0;
        for (let i = 0, len = data.selectArray.length; i < len; i++) {
            total += data.selectArray[i];
        }
        cc.find('Canvas/curValue').getComponent(cc.Label).string = total;
        data.selectCount = total;
        cc.find('Canvas').getComponent('f_gameControl').judgeValue();
    },
});