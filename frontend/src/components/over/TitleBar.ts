class TitleBar extends egret.DisplayObjectContainer{
		private sBg : Bitmap;
		private sCont : TextField;
		public set score (val : string){
			this.sCont.text = val;
		}
		public get score(){
			return this.sCont.text;
		}
    constructor(){
        super();
            this.sBg = new Bitmap({
                source:'pic_banner_png',
            }) 
            this.addChild(this.sBg);

            this.sCont = new TextField({
                fontFamily:'YouYuan',
                text: '你和XX搭档在120秒共计干掉了XX对情侣',
                color: 0xa6490e,
                x:50,
                y:100,
                size: 28,
                width: 560,
                height:50,
                textAlign: 'center',
                verticalAlign: 'middle',
            })
            this.addChild(this.sCont);

    }
}