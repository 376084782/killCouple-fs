class ScoreBar extends egret.DisplayObjectContainer{
    private sType : Bitmap;
		private sBg : Bitmap;
		private sCont : BitmapText;
		public set score (val : string){
			this.sCont.text = val;
		}
		public get score(){
			return this.sCont.text;
		}
    constructor(type:number){
        super();
        // type 0 : 縂得分 ； 1 ： 縂排名
				let src : string;
				type == 0 && (src = "pic_zdf_png");
				type == 1 && (src = "pic_zpm_png");

        this.sType = new Bitmap({
          source : src,
        })
				this.addChild(this.sType);

				this.sBg = new Bitmap({
					source:'public_bgk_png',
					width:115,
					height:35,
				}) 
				this.sBg.x = this.sType.width;
				this.addChild(this.sBg);

				this.sCont = new BitmapText({
					text: '',
					source:'pic_sz_fnt',
					// size: 21,
					width: 115,
					height:34,
					textAlign: 'center',
					verticalAlign: 'middle',
				})
				this.sCont.x= this.sBg.x + 5;
				this.sCont.y = this.sBg.y;
				this.addChild(this.sCont);

    }
}