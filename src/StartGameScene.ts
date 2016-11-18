/**
 * Created by pior on 16/9/1.
 */
class StartGameScene extends GameUtil.BassPanel
{
    public constructor()
    {
        super();
    }
    public init()
    {
        var bg:egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,1);
        this.addChild(bg);

        var gametitle: GameUtil.MyTextField = new GameUtil.MyTextField(this.mStageW/2,300,60);
        gametitle.textColor = 0x53a3e1;
        gametitle.setText('2048GAME');
        gametitle.$setItalic(true);
        gametitle.$setBold(true);
        gametitle.strokeColor = 0xc6def1;
        gametitle.stroke = 2;
        this.addChild(gametitle);

        var startbtn: GameUtil.Menu = new GameUtil.Menu(this,'startgamebtn_png','startgamebtn_png',this.startgame);
        startbtn.setScaleMode();
        startbtn.x = this.mStageW/2;
        startbtn.y = GameUtil.setscreenY(900);
        this.addChild(startbtn);

    }

    private startgame()
    {
        GameUtil.GameScene.runscene(GameScene._i());
    }



}