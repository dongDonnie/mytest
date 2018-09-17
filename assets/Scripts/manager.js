cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

    },

    buttonClick: function (eve, data) {
        switch (data) {
            case '2048':
                cc.director.loadScene('2048');
                break;
            case 'funMath':
                cc.director.loadScene('funMath');
                break;
            case 'graphics':
                cc.director.loadScene('graphics');
                break;
            case 'guessNumber':
                cc.director.loadScene('guessNumber');
                break;
            case 'hanoi':
                cc.director.loadScene('hanoi');
                break;
            case 'joy':
                cc.director.loadScene('joy');
                break;
            case 'magicsquare':
                cc.director.loadScene('magicsquare');
                break;
            case 'pintu':
                cc.director.loadScene('pintu');
                break;
            case 'stairs':
                cc.director.loadScene('stairs');
                break;
            case 'stick':
                cc.director.loadScene('stick');
                break;
            case 'tableball':
                cc.director.loadScene('tableball');
                break;
            case 'threeColor':
                cc.director.loadScene('threeColor');
                break;
            default:
                break;
        }
    },
});