/**
 * Created by pior on 16/9/1.
 */
class GameScene extends GameUtil.BassPanel
{

    private blockdispcont: egret.DisplayObjectContainer;
    private touchlayer: egret.Shape;

    private beginpointx: number;
    private beginpointy: number;

    private recordisempy: number[];
    private blockarr: Blocksprite[];

    private moveoncetag: boolean = false;

    public constructor()
    {
        super();
    }
    public init()
    {
        this.initdata();
        this.showbg();
        var posx: number = (Math.floor(Math.random()*10))%4;
        var posy: number = (Math.floor(Math.random()*10))%4;
        this.createblock(0,posx,posy);
    }

    private initdata()
    {
        this.beginpointx = 0;
        this.beginpointy = 0;
        this.recordisempy = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

    private showbg()
    {
        this.blockarr = [];
        for(var i:number=0;i < 16;i++)
        {
            this.blockarr[i] = null;
        }
        var bg:egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH,1,0xa0c0a3);
        this.addChild(bg);

        var ect:egret.Shape = GameUtil.createRect(25,500,700,700,1,0xc7cd7b);
        this.addChild(ect);

        for(var i:number=0;i <5;i++)
        {
            var line:egret.Shape = GameUtil.createRect(25,495+175*i,700,10,1,0x6672a2);
            this.addChild(line);
            var lline:egret.Shape = GameUtil.createRect(20+175*i,500,10,700,1,0x6672a2);
            this.addChild(lline);
        }

        this.blockdispcont = new egret.DisplayObjectContainer();
        this.addChild(this.blockdispcont);

        this.touchlayer = GameUtil.createRect(0,0,this.mStageW,this.mStageH);
        this.touchlayer.alpha = 0;
        this.addChild(this.touchlayer);
        this.touchlayer.touchEnabled = true;
        this.touchlayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchbegin,this);
        this.touchlayer.addEventListener(egret.TouchEvent.TOUCH_END,this.touchend,this);

    }

    private createblock(newid:number = 0,posx:number = 1,posy:number = 2)
    {
        var id:number = (newid==0) ? (1+Math.floor(Math.random()*100)%2)*2:newid;
        var block: Blocksprite = new Blocksprite(id,posx,posy);
        this.blockdispcont.addChild(block);

        //this.recordisempy[1+2*4] = 1;
        this.blockarr[posx+posy*4] = block;

        //console.log('blockdispcontchild====',this.blockdispcont.$children.length);
        if(this.blockdispcont.$children.length == 16)
        {
            console.log('gameover');
        }

    }

    private touchbegin(evt:egret.TouchEvent)
    {
        this.moveoncetag = true;
        this.beginpointx = evt.localX;
        this.beginpointy = evt.localY;
    }

    private touchend(evt:egret.TouchEvent)
    {
        var self: any = evt.currentTarget.parent;

        var ex:number = evt.localX;
        var ey:number = evt.localY;

        if(Math.abs(ex-this.beginpointx)>Math.abs(ey-this.beginpointy))
        {
            if(ex-this.beginpointx > 100)
            {
                console.log('往右');
                for(var i:number=15;i >=0;i--)
                {
                    var block: Blocksprite = self.blockarr[i];
                    if(block != null && block.posx != 3)
                    {
                        var isameid: boolean = false;
                        for(var j:number=block.posx+1;j <=3;j++)
                        {
                            //console.log('j===',self.blockarr[j+block.y*4]);
                            if(self.blockarr[j+block.posy*4] !=null)
                            {
                                //console.log('j===',j);
                                if(block.blockid == self.blockarr[j+block.posy*4].blockid)
                                {
                                    isameid = true;
                                }
                                break;
                            }
                        }
                        var movex:number = isameid?j:j-1;
                        if(block.posx != movex){
                            var movedis: number = block.x + 175*(movex-block.posx);
                            egret.Tween.get(block).to({x:movedis},100).call(self.moveEnd,self,[block,movex,isameid]);

                            if(isameid)
                            {
                                this.blockarr[block.posx+block.posy*4] = null;
                                this.blockarr[movex+block.posy*4].blockid *=2;
                            }
                        }

                    }
                }

            }
            else if(ex-this.beginpointx < -100)
            {
                console.log('往左');
                for(var i:number=0;i < 16;i++)
                {
                    var block: Blocksprite = self.blockarr[i];
                    if(block != null && block.posx != 0)
                    {
                        var isameid: boolean = false;
                        for(var j:number=block.posx-1;j >=0;j--)
                        {
                            //console.log('j===',self.blockarr[j+block.y*4]);
                            if(self.blockarr[j+block.posy*4] !=null)
                            {
                                //console.log('j===',j);
                                if(block.blockid == self.blockarr[j+block.posy*4].blockid)
                                {
                                    isameid = true;
                                }
                                break;
                            }
                        }
                        var movex:number = isameid?j:j+1;
                        if(block.posx != movex){
                            var movedis: number = block.x + 175*(movex-block.posx);
                            egret.Tween.get(block).to({x:movedis},100).call(self.moveEnd,self,[block,movex,isameid]);

                            if(isameid)
                            {
                                this.blockarr[block.posx+block.posy*4] = null;
                                this.blockarr[movex+block.posy*4].blockid *=2;
                            }
                        }

                    }
                }
            }
        }
        else
        {
            if(ey-this.beginpointy > 100)
            {
                console.log('往下');
            }
            else if(ey-this.beginpointy < -100)
            {
                console.log('往上');
            }
        }

    }

    private moveEnd(block:Blocksprite,movex:number,issameID:boolean)
    {
        if(issameID)
        {
            //this.blockarr[block.posx+block.posy*4] = null;
            this.blockdispcont.removeChild(block);
            this.blockdispcont.removeChild(this.blockarr[movex+block.posy*4]);
            var newid: number = block.blockid*2;
            this.createblock(newid,movex,block.posy);

            //console.log('blockdispcont===',this.blockdispcont);
        }
        else
        {
            this.blockarr[block.posx+block.posy*4] = null;
            block.posx = movex;
            this.blockarr[block.posx+block.posy*4] = block;
        }

        if(this.moveoncetag)
        {
            var pos: number = Math.floor(Math.random()*100)%16;
            while(this.jugeishad(pos)){
                pos = (++pos)>15 ? 0:pos;
            }
            var posx: number = pos%4;
            var posy: number = Math.floor(pos/4);
            this.createblock(0,posx,posy);

            this.moveoncetag = false;
        }

    }

    private jugeishad(pos): boolean
    {
        if(this.blockarr[pos] != null)
        {
            return true;
        }

        return false;
    }


    private static _inst: GameScene = null;
    public static  _i(): GameScene
    {
        return (this._inst==null ? new GameScene():this._inst);
    }

}