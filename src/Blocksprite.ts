/**
 * Created by pior on 16/9/1.
 */
class Blocksprite extends GameUtil.BassPanel
{

    private dicbw: number;

    public blockid: number;
    public posx: number;
    public posy: number;

    public constructor(blockid:number,posx:number,posy:number)
    {
        this.dicbw = 175;
        this.blockid = blockid;
        this.posx = posx;
        this.posy = posy;
        super();
    }
    public init()
    {
        var block: egret.Shape = GameUtil.createRect(30+this.posx*this.dicbw,505+this.posy*this.dicbw,165,165,1,0xf2d9d9);
        this.addChild(block);
        var idtext: GameUtil.MyTextField = new GameUtil.MyTextField(30+82+this.posx*this.dicbw,505+82+this.posy*this.dicbw,40);
        idtext.setText(this.blockid+'');
        this.addChild(idtext);
    }


}