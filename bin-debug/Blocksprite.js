/**
 * Created by pior on 16/9/1.
 */
var Blocksprite = (function (_super) {
    __extends(Blocksprite, _super);
    function Blocksprite(blockid, posx, posy) {
        this.dicbw = 175;
        this.blockid = blockid;
        this.posx = posx;
        this.posy = posy;
        _super.call(this);
    }
    var d = __define,c=Blocksprite;p=c.prototype;
    p.init = function () {
        var block = GameUtil.createRect(30 + this.posx * this.dicbw, 505 + this.posy * this.dicbw, 165, 165, 1, 0xf2d9d9);
        this.addChild(block);
        var idtext = new GameUtil.MyTextField(30 + 82 + this.posx * this.dicbw, 505 + 82 + this.posy * this.dicbw, 40);
        idtext.setText(this.blockid + '');
        this.addChild(idtext);
    };
    return Blocksprite;
})(GameUtil.BassPanel);
egret.registerClass(Blocksprite,"Blocksprite");
