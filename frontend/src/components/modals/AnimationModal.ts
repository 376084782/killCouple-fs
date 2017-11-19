class AnimationModal extends ModalLayer{
    private aniTimer : egret.Timer;
    public pBoy : Bitmap;
    public pGirl : Bitmap;
    public ct321 : Array<Bitmap> = [];
    private ctCount : number ;

    constructor(){
        super(710,186);
        this.width = 710;
        this.height = 186;

        this.x = (UImanager.container.width - this.width)/2;
        console.log('Imanager.stageH:',UImanager.stageH)
        this.y = (UImanager.container.height - this.height)/2;

        let ct321Src = ['pic_djs_1_png','pic_djs_2_png','pic_djs_3_png'];
        for(var i=0;i < ct321Src.length;i++){
            this.ct321[i] = new Bitmap({
                source:ct321Src[i],
            })
            this.ct321[i].x = (710 - this.ct321[i].width)/2;
            this.ct321[i].y = (186 - this.ct321[i].height)/2;
            this.ct321[i].visible = false;
            if( i == 2)
            this.ct321[i].visible = true;
            this.addChild(this.ct321[i]);
        }
        
        this.pBoy = new Bitmap({
            source:'pic_man_fk_png',
            x:360,
        })
        this.pBoy.y = (186 - this.pBoy.height)/2;
        this.addChild(this.pBoy);

        this.pGirl = new Bitmap({
            x:80,
            source:'pic_woman_fk_png',
        })
        this.pGirl.y = (186-this.pGirl.height)/2;
        this.addChild(this.pGirl);
        
        this.aniTimer = new egret.Timer(800,GameData.ctTime);

        EventManager.sub("startCT",()=>{
            this.start();
            let boy = this.pBoy;
            let girl = this.pGirl;

            //开始动画
            egret.Tween.get(boy).to({ x: boy.x + GameData.offX }, 1500, egret.Ease.sineIn);
            egret.Tween.get(girl).to({ x: girl.x - GameData.offX }, 1500, egret.Ease.sineIn);
        });  

    }


    private start() {
        // this.aniTimer.repeatCount = 3;
        this.ctCount = GameData.ctTime;
        // this.aniTimer.addEventListener(egret.TimerEvent.TIMER, this.subTime, this);
        this.aniTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeOver, this);
        this.aniTimer.reset();
        this.aniTimer.start();

  }
    private subTime() {
        // if (this.ctCount == 0) {
        // return;
        // }
        this.ctCount -= 1;
            if(this.ctCount == 2){
                this.ct321[1].visible = true;
                this.ct321[0].visible = false;
                this.ct321[2].visible = false;
            }else if(this.ctCount == 1){
                this.ct321[1].visible = false;
                this.ct321[0].visible = true;
                this.ct321[2].visible = false;
            }
    }
    private timeOver(){
        console.log("???")
        EventManager.pub('sendMessage',{state:'next'})
    }

    

}