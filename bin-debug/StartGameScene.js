/**
 * Created by pior on 16/9/1.
 */
var StartGameScene = (function (_super) {
    __extends(StartGameScene, _super);
    function StartGameScene() {
        _super.call(this);
    }
    var d = __define,c=StartGameScene;p=c.prototype;
    p.init = function () {
        var bg = GameUtil.createRect(0, 0, this.mStageW, this.mStageH, 1);
        this.addChild(bg);
        var gametitle = new GameUtil.MyTextField(this.mStageW / 2, 300, 60);
        gametitle.textColor = 0x53a3e1;
        gametitle.setText('2048GAME');
        gametitle.$setItalic(true);
        gametitle.$setBold(true);
        gametitle.strokeColor = 0xc6def1;
        gametitle.stroke = 2;
        this.addChild(gametitle);
        var startbtn = new GameUtil.Menu(this, 'startgamebtn_png', 'startgamebtn_png', this.startgame);
        startbtn.setScaleMode();
        startbtn.x = this.mStageW / 2;
        startbtn.y = GameUtil.setscreenY(900);
        this.addChild(startbtn);
    };
    p.startgame = function () {
        GameUtil.GameScene.runscene(GameScene._i());
    };
    return StartGameScene;
})(GameUtil.BassPanel);
egret.registerClass(StartGameScene,"StartGameScene");
