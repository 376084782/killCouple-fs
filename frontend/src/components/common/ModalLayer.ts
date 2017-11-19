class ModalLayer extends egret.DisplayObjectContainer {
  public modal: Modal;
  constructor(width, height) {
    super();
    // this.width = width;
    // this.height = height;

    // 绘制中心弹框
    this.modal = new Modal(width, height)
    this.addChild(this.modal);

    this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
    //   let point = this.parent.globalToLocal(0, 0);
    //   this.x = point.x;
    //   this.y = point.y;
      egret.Tween.get(this).set({ alpha: .3 }).to({ alpha: 1 }, 200);
    }, this)
  }
}