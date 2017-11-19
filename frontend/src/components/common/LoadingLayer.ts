class LoadingLayer extends egret.DisplayObjectContainer {
  constructor() {
    super();
    this.width = UIConfig.stageW;
    this.height = UIConfig.stageH;
    // let shape = new Mask(.1);
    // this.addChild(shape);

    let wrap = new egret.Shape();
    wrap.graphics.beginFill(0x000000, .6);
    wrap.graphics.drawRoundRect(0, 0, 250, 250, 20);
    wrap.x = (this.width - wrap.width) / 2;
    wrap.y = (this.height - wrap.height) / 2;
    this.addChild(wrap);

    // let loading = AnimateManager.createFrames('loading');
    // loading.frameRate = 8;
    // loading.gotoAndPlay('loading', -1);
    // loading.scaleX = 3;
    // loading.scaleY = 3;
    // loading.x = (this.width - loading.width * loading.scaleX) / 2;
    // loading.y = (this.height - loading.height * loading.scaleY) / 2;
    // this.addChild(loading);
  }
}