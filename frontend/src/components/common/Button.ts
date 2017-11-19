class Button extends egret.Sprite{
    private btnBg : Bitmap;
    private btnType : Bitmap;
    public set Bg(val:string){
        this.btnBg.src = val;
    }
    public set Type(val:string){
        this.btnType.src = val;
    }
    public get Bg(){
        return this.btnBg.src;
    }
    public get Type(){
        return this.btnType.src;
    }
    constructor(bgType: number,staType:number){
        super();
        let bgSrc,typeSrc : string;
        // bgType 0 : 紅色； 1 ： 灰色 ； typeSrc 0 : 準備 ； 1  ： 等待對方； 2 ：回到首頁
        bgType == 0 && (bgSrc = 'btn_public_n_png') 
        bgType == 1 && (bgSrc = 'btn_public_p_png')
        staType == 0 && (typeSrc = 'btn_pic_djzb_png')
        staType == 1 && (typeSrc = 'btn_pic_dadf_png')
        staType == 2 && (typeSrc = 'btn_pic_hdsy_png')

        this.btnBg = new Bitmap({
            source:bgSrc,
        })
        this.addChild(this.btnBg);

        this.btnType = new Bitmap({
            source: typeSrc,
        })
        this.btnType.x = (this.btnBg.width - this.btnType.width)/2;
        this.btnType.y = (this.btnBg.height - this.btnType.height)/2 - 6;
        this.addChild(this.btnType);
    }
}