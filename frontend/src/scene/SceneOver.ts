/**
 * 游戏結束界面
 * 
 */
class SceneOver extends egret.DisplayObjectContainer{
    public bg : egret.Bitmap = new egret.Bitmap(RES.getRes('public_bg_png'))


		private oScore : ScoreBar;
		private oRank : ScoreBar;
        private oTitle : TitleBar;

		private hBtn : Button;

        private diffScore : RankBar;
        private diffRank : RankBar;

		private eva : Bitmap;

    constructor(){
			super();
			this.addChild(this.bg)
      
			this.oScore = new ScoreBar(0);
			this.oScore.x = 60;
			this.oScore.y = 6;
			this.addChild(this.oScore);
			//測試
			this.oScore.score = '123456';
			this.oScore.visible = false;
		
			this.oRank = new ScoreBar(1);
			this.oRank.x = 390;
			this.oRank.y = 6;
			this.addChild(this.oRank);

			this.oRank.visible = false;

            this.oTitle = new TitleBar();
            this.oTitle.x = (UIConfig.stageW - this.oTitle.width)/2;
            this.oTitle.y = 80;
            this.addChild(this.oTitle);

            this.diffScore = new RankBar();
            this.diffScore.x = 110;
            this.diffScore.y = 265;
            this.addChild(this.diffScore);
			this.diffScore.visible = false;


            this.diffRank = new RankBar();
            this.diffRank.x = 370;
            this.diffRank.y = 265;
            this.addChild(this.diffRank);
			this.diffRank.visible = false;

			this.hBtn = new Button(0,2);
			this.hBtn.y = 335;
			this.hBtn.x = (UIConfig.stageW - this.hBtn.width)/2;
			this.addChild(this.hBtn);

			this.hBtn.touchEnabled = true;
			this.hBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				if(this.hBtn.Type == "btn_pic_hdsy_png")
					UImanager.to('hall') //回到首頁
			},this)


			this.eva = new Bitmap(
				{
					source:'',
					y:95
				}
			)
			this.eva.scaleX = this.eva.scaleY = 0.6;
			this.addChild(this.eva);


            EventManager.sub('showLevel',()=>{
				// this.oTitle.score = `你和${GameData.teamMateName}搭档在120秒共计干掉了${GameData.gameLevel}对情侣`;
				this.oTitle.score = `你和搭档在120秒共计干掉了${GameData.gameLevel}对情侣`;
			})

      		EventManager.sub('showEva',score =>{
				  if(score == 0 ){
					this.eva.src= 'text_nmsbsx_png';
			  }else if(score == 5){
				  	this.eva.src= 'text_ybjc_png';
			  }else if(score == 10){
					this.eva.src= 'text_qlsmy_png';
			  }else if(score >= 15){
					this.eva.src= 'text_hyjj_png';
			  }
			  this.eva.x = (UIConfig.stageW - 0.6 * this.eva.width)/2;
			  });


			//更新排名
			EventManager.sub('updataScore',(oData)=>{

			if(oData.score != null && oData.rank != null){

				this.oScore.visible = true;
				this.oRank.visible = true;

				this.diffRank.visible = true;
				this.diffScore.visible = true;

				this.oScore.score = oData.score;
				this.oRank.score = oData.rank;

				let diffScore = GameData.oldScore - oData.score;
				let diffRank = GameData.oldRank - oData.rank;

				GameData.oldScore = oData.score;
				GameData.oldRank = oData.rank;

				this.diffScore.score = diffScore;
				this.diffRank.rank = diffRank;
			}


			});




    }
}