class OfflineModal extends egret.DisplayObjectContainer {
  public spText: TextField;

  constructor() {
    super();

    this.width = 408;
    this.height = 262;
    this.x = (UIConfig.width - 408) / 2;
    this.y=80;

    let bg = new Bitmap('modal-bg_png');
    this.addChild(bg);

    let title = new Bitmap('modal-title_png');
    this.addChild(title);
    title.x = 166;
    title.y = 10;

    this.spText = new TextField({
      size: 22,
      y: 100,
      x: 0,
      width: 408,
      text: '您已断开连接，即将退出游戏...',
      color: 0x8a542e,
      bold: true,
      textAlign: 'center'
    })
    this.addChild(this.spText);

    let btn = new Bitmap('btn-sure_png');
    this.addChild(btn);
    btn.x = 100;
    btn.y = 170;
    btn.touchEnabled = true;
    btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      EventManager.pub("closeGame");
      EventManager.pub('modal/onCloseOffline')
    }, this);

  }





}