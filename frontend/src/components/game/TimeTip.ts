class TimeTip extends egret.DisplayObjectContainer{
		private tBg : Bitmap;
		private tCont : TextField;
        private tCopy : string[] = ["点错会减少5秒哦","对友点错，减少5秒！","你点错了，减少5秒！"];
		public set cont (val : string){
			this.tCont.text = val;
		}
		public get cont(){
			return this.tCont.text;
		}
    constructor(){
        super();
            this.tBg = new Bitmap({
                source:'public_bgk_png',
                width:126,
                height:37,
            }) 
            // this.tBg.y = 5;
            // this.tBg.x = 20;
            this.addChild(this.tBg);

            this.tCont = new TextField({
                fontFamily:'YouYuan',
                text: this.tCopy[0],
                color: 0xffffff,
                size: 14,
                width: 116,
                height:30,
                textAlign: 'center',
                verticalAlign: 'middle',
                lineSpacing: 3,
            })
            // this.tCont.x= 20;
            // this.tCont.y = 5;
            this.addChild(this.tCont);

    }
}