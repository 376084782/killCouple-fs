class Mask extends egret.Shape {
  constructor(alpha = .5) {
    super();
    // 绘制阴影
    this.graphics.beginFill(0x000000, alpha);
    this.graphics.drawRect(0, 0, 1, 1);
    // BUG: 诡异的触控区域与所在区域不匹配
    this.scaleX = UImanager.container.width + 500;
    this.scaleY = UImanager.container.height + 500;
    this.touchEnabled = true;
    this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
    }, this);
  }
}