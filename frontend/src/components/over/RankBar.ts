class RankBar extends egret.Sprite{
    private rLogo : Bitmap;
    private rCont : TextField;

    public set score(val:number){
        if(val>=0){
            this.rCont.text = "增加" + val.toString() + "分";
            this.rLogo.src = "pic_redjt_png";
        }else if(val<0){
            this.rCont.text = "降低" + val.toString() + "分";
            this.rLogo.src = "pic_bluejt_png";
        }
    }

    public set rank(val:number){
        if(val>=0){
            this.rCont.text = "排名上升" + val.toString() + "名";
            this.rLogo.src = "pic_redjt_png";
        }else if(val<0){
            this.rCont.text = "排名下降" + val.toString() + "名";
            this.rLogo.src = "pic_bluejt_png";
        }
    }

    constructor(){
        super();

        this.rLogo = new Bitmap({
            source:'pic_redjt_png',
        })
        this.addChild(this.rLogo);

        this.rCont = new TextField({
            fontFamily:'YouYuan',
            text:'增加120分',
            size:28,
            color:0x652106,
            bold:true,
        })
        this.rCont.x = this.rLogo.width + 20;
        this.rCont.y = 15;
        this.addChild(this.rCont);
        
    }
}