/**
 * Created by pior on 16/9/1.
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.moveoncetag = false;
    }
    var d = __define,c=GameScene;p=c.prototype;
    p.init = function () {
        this.initdata();
        this.showbg();
        var posx = (Math.floor(Math.random() * 10)) % 4;
        var posy = (Math.floor(Math.random() * 10)) % 4;
        this.createblock(0, posx, posy);
    };
    p.initdata = function () {
        this.beginpointx = 0;
        this.beginpointy = 0;
        this.recordisempy = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    };
    p.showbg = function () {
        this.blockarr = [];
        for (var i = 0; i < 16; i++) {
            this.blockarr[i] = null;
        }
        var bg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1, 0xa0c0a3);
        this.addChild(bg);
        var ect = GameUtil.createRect(25, 500, 700, 700, 1, 0xc7cd7b);
        this.addChild(ect);
        for (var i = 0; i < 5; i++) {
            var line = GameUtil.createRect(25, 495 + 175 * i, 700, 10, 1, 0x6672a2);
            this.addChild(line);
            var lline = GameUtil.createRect(20 + 175 * i, 500, 10, 700, 1, 0x6672a2);
            this.addChild(lline);
        }
        this.blockdispcont = new egret.DisplayObjectContainer();
        this.addChild(this.blockdispcont);
        this.touchlayer = GameUtil.createRect(0, 0, this.mStageW, this.mStageH);
        this.touchlayer.alpha = 0;
        this.addChild(this.touchlayer);
        this.touchlayer.touchEnabled = true;
        this.touchlayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchbegin, this);
        this.touchlayer.addEventListener(egret.TouchEvent.TOUCH_END, this.touchend, this);
    };
    p.createblock = function (newid, posx, posy) {
        if (newid === void 0) { newid = 0; }
        if (posx === void 0) { posx = 1; }
        if (posy === void 0) { posy = 2; }
        var id = (newid == 0) ? (1 + Math.floor(Math.random() * 100) % 2) * 2 : newid;
        var block = new Blocksprite(id, posx, posy);
        this.blockdispcont.addChild(block);
        //this.recordisempy[1+2*4] = 1;
        this.blockarr[posx + posy * 4] = block;
        //console.log('blockdispcontchild====',this.blockdispcont.$children.length);
        if (this.blockdispcont.$children.length == 16) {
            console.log('gameover');
        }
    };
    p.touchbegin = function (evt) {
        this.moveoncetag = true;
        this.beginpointx = evt.localX;
        this.beginpointy = evt.localY;
    };
    p.touchend = function (evt) {
        var self = evt.currentTarget.parent;
        var ex = evt.localX;
        var ey = evt.localY;
        if (Math.abs(ex - this.beginpointx) > Math.abs(ey - this.beginpointy)) {
            if (ex - this.beginpointx > 100) {
                console.log('往右');
                for (var i = 15; i >= 0; i--) {
                    var block = self.blockarr[i];
                    if (block != null && block.posx != 3) {
                        var isameid = false;
                        for (var j = block.posx + 1; j <= 3; j++) {
                            //console.log('j===',self.blockarr[j+block.y*4]);
                            if (self.blockarr[j + block.posy * 4] != null) {
                                //console.log('j===',j);
                                if (block.blockid == self.blockarr[j + block.posy * 4].blockid) {
                                    isameid = true;
                                }
                                break;
                            }
                        }
                        var movex = isameid ? j : j - 1;
                        if (block.posx != movex) {
                            var movedis = block.x + 175 * (movex - block.posx);
                            egret.Tween.get(block).to({ x: movedis }, 100).call(self.moveEnd, self, [block, movex, isameid]);
                            if (isameid) {
                                this.blockarr[block.posx + block.posy * 4] = null;
                                this.blockarr[movex + block.posy * 4].blockid *= 2;
                            }
                        }
                    }
                }
            }
            else if (ex - this.beginpointx < -100) {
                console.log('往左');
                for (var i = 0; i < 16; i++) {
                    var block = self.blockarr[i];
                    if (block != null && block.posx != 0) {
                        var isameid = false;
                        for (var j = block.posx - 1; j >= 0; j--) {
                            //console.log('j===',self.blockarr[j+block.y*4]);
                            if (self.blockarr[j + block.posy * 4] != null) {
                                //console.log('j===',j);
                                if (block.blockid == self.blockarr[j + block.posy * 4].blockid) {
                                    isameid = true;
                                }
                                break;
                            }
                        }
                        var movex = isameid ? j : j + 1;
                        if (block.posx != movex) {
                            var movedis = block.x + 175 * (movex - block.posx);
                            egret.Tween.get(block).to({ x: movedis }, 100).call(self.moveEnd, self, [block, movex, isameid]);
                            if (isameid) {
                                this.blockarr[block.posx + block.posy * 4] = null;
                                this.blockarr[movex + block.posy * 4].blockid *= 2;
                            }
                        }
                    }
                }
            }
        }
        else {
            if (ey - this.beginpointy > 100) {
                console.log('往下');
            }
            else if (ey - this.beginpointy < -100) {
                console.log('往上');
            }
        }
    };
    p.moveEnd = function (block, movex, issameID) {
        if (issameID) {
            //this.blockarr[block.posx+block.posy*4] = null;
            this.blockdispcont.removeChild(block);
            this.blockdispcont.removeChild(this.blockarr[movex + block.posy * 4]);
            var newid = block.blockid * 2;
            this.createblock(newid, movex, block.posy);
        }
        else {
            this.blockarr[block.posx + block.posy * 4] = null;
            block.posx = movex;
            this.blockarr[block.posx + block.posy * 4] = block;
        }
        if (this.moveoncetag) {
            var pos = Math.floor(Math.random() * 100) % 16;
            while (this.jugeishad(pos)) {
                pos = (++pos) > 15 ? 0 : pos;
            }
            var posx = pos % 4;
            var posy = Math.floor(pos / 4);
            this.createblock(0, posx, posy);
            this.moveoncetag = false;
        }
    };
    p.jugeishad = function (pos) {
        if (this.blockarr[pos] != null) {
            return true;
        }
        return false;
    };
    GameScene._i = function () {
        return (this._inst == null ? new GameScene() : this._inst);
    };
    GameScene._inst = null;
    return GameScene;
})(GameUtil.BassPanel);
egret.registerClass(GameScene,"GameScene");
