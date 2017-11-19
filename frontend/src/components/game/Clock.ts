class Clock extends egret.Sprite{
    public cTime : egret.Timer;
    private cText : BitmapText;
    private allTime : number = 120;

    public set time(val : number){
        this.allTime = val;
    }
    constructor(){
        super();

        this.cTime = new egret.Timer(1000,120);

        this.cText = new BitmapText({
            text:'00:00',
            source:'pic_djs_fnt',
            width:150,
            textAlign:'center',
            letterSpacing:5,
        })
        this.addChild(this.cText);

        EventManager.sub("startClock",(time)=>{
            this.allTime = time;
            this.start();
        });    

        EventManager.sub("stopClock",()=>{
            this.stop();    
        }); 
    }
    private start() {
        this.cTime.repeatCount = GameData.countDown;
        // this.allTime = GameData.countDown;
        this.cText.text = this.transFormat(this.allTime);
        this.cTime.addEventListener(egret.TimerEvent.TIMER, this.subTime, this);
        this.cTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeOver, this);
        this.cTime.reset();
        this.cTime.start();
        console.info('clock start');
        this.visible = true;
  }
    private timeOver() {
        this.cTime && this.cTime.stop();
        this.cTime == null;
        console.info('clock stop')
        //触发游戏结束
    }
    //双方找出后操作
    public stop() {
        this.visible = false;
        this.timeOver();
    }
  private subTime() {
    if (this.allTime == 0) {
      return;
    }
    this.allTime -= 1;
    this.cText.text = this.transFormat(this.allTime)
  }

  private transFormat(time : number){
      var tempM : string;
      var tempS : string;

      if((time % 60) == 0){
          tempM = Math.floor(time/60).toString();
          return '0' + tempM + ':00';
      }else{
          tempM = Math.floor(time/60).toString();
          tempS = (time - (parseInt(tempM)*60)).toString();
          if(tempM.length == 1) tempM = '0' + tempM; 
          if(tempS.length == 1) tempS = '0' + tempS; 
          return tempM + ":" + tempS;
      }
  }
}