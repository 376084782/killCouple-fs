/**
 * @qly
 * 图片加载
 * 
 */
interface ImageLoaderConfig {
  width?: number;
  height?: number;
  src?: string; //图片地址
  mask?: any; //遮罩,传入绘制好的shape
  maskConfig?: [number, number, number]; //[width,height,radius]不可缺参数(width=height=radius=r/2为圆)
  x?:number;
  y?:number;
}

class ImageLoader extends egret.Sprite {
  private image: egret.Bitmap;
  private imgMask: egret.Shape;
  private W: number;
  private H: number;
  private _src: string;
  public set src(src) {
    this._src = src;
    this.setSrc(src);
  }
  public get src() {
    return this._src;
  }

  constructor(config: ImageLoaderConfig) {
    super();
    let self = this;
    // 记录必要参数
    self.imgMask = config['mask'] || null;
    self.W = config['width'] || 0;
    self.H = config['height'] || 0;
    if (config['maskConfig']) {
      // 存在遮罩配置属性时绘制一个遮罩
      self.imgMask = new egret.Shape();
      self.imgMask.graphics.beginFill(0xcccccc);
      self.imgMask.graphics.drawRoundRect(0, 0, config['maskConfig'][0] || 0, config['maskConfig'][1] || 0, config['maskConfig'][2] || 0);
      self.imgMask.graphics.endFill();
    }
    self.src = config['src'];
    this.x=config['x']||this.x;
    this.y=config['y']||this.y;
  }

  private setSrc(src) {
    let self = this;
    // 不存在src属性时return
    if (!src) return;
    // 创建图像加载器
    let imgLoader: egret.ImageLoader = new egret.ImageLoader;
    imgLoader.once(egret.Event.COMPLETE, function (evt: egret.Event) {
      self.removeChildren();
      let loader: egret.ImageLoader = evt.currentTarget;
      // 加载完成，创建图片
      self.image = new egret.Bitmap(loader.data);
      // 按需缩放图片
      self.W && (self.image.scaleX = self.W / self.image.width);
      self.H && (self.image.scaleY = self.H / self.image.height);
      if (self.imgMask) {
        //如果存在遮罩属性，为图片增加遮罩
        self.addChild(self.imgMask);
        self.image.mask = self.imgMask;
      }
      self.addChild(self.image);
    }, this);
    imgLoader.load(src);
  }
}