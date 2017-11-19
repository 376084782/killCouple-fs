
class Modal extends egret.DisplayObjectContainer{
    private bgMask : Mask;
    private modalBg : egret.Shape;
    private cirBg : Bitmap;

    constructor(width, height){
        super();
        this.width = width;
        this.height = height;

        this.bgMask = new Mask();
        this.addChild(this.bgMask);

        this.bgMask.x = - (UImanager.container.width - this.width)/2;
        this.bgMask.y = - (UImanager.container.height - this.height)/2;

        this.modalBg = new egret.Shape();
        this.modalBg.graphics.beginFill(0xfff5a5,1);
        this.modalBg.graphics.drawRect(0,0,width,height);
        this.modalBg.graphics.endFill();
        this.addChild(this.modalBg);

        // this.cirBg = new Bitmap({
        //     source: 'pic_djs_bg_png',       
        // }) 
        // this.cirBg.x = (width - this.cirBg.width)/2;
        // this.cirBg.y = (height - this.cirBg.height)/2;
        // this.addChild(this.cirBg);
    }
};
