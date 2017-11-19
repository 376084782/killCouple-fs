class FindTip extends egret.DisplayObjectContainer{
		private fBg : Bitmap;
		private fCont : TextField;
        private fCopy : string[] = ["目前你们都没有找到情侣哦，抓紧时间找到他们并拆散这对情侣吧","已锁定情侣，帮助对方也找到这对狗男女，即可干掉这对情侣！","对方已锁定情侣，多听一下对方的描述，会帮助你更快的找到这对情侣哦"];
		public set cont (val : string){
			this.fCont.text = val;
		}
		public get cont(){
			return this.fCont.text;
		}
    constructor(){
        super();
            this.fBg = new Bitmap({
                source:'public_bgk_png',
                width:230,
                height:53,
            }) 
            // this.fBg.y = 5;
            // this.fBg.x = 20;
            this.addChild(this.fBg);

            this.fCont = new TextField({
                fontFamily:'YouYuan',
                text: this.fCopy[0],
                color: 0xffffff,
                size: 14,
                width: 220,
                height:50,
                textAlign: 'center',
                verticalAlign: 'middle',
                multiline:true,
                lineSpacing: 4,
            })
            // this.fCont.x= 20;
            // this.fCont.y = 5;
            this.addChild(this.fCont);

    }
}