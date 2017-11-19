class People extends egret.Sprite{
    private pBg : Bitmap;

    constructor(src : string){
        super();

        let source : string ; 
        if(src == '0'){
            source = 'pic_ql_png';
        }else {
            source = 'pic_dsg_' + src + '_png';
        }
        this.pBg = new Bitmap({
            source:source,
            x:0,
            y:0,
        })
        this.addChild(this.pBg);
        this.anchorOffsetX = this.width / 2 ;
    }
}