/**
 * 生成文字
 * @config 配置信息，可单独传入图片id(string)，或完整配置对象(object)
 * @author ranchenguang
 */
interface TextFieldConfig {
  fontFamily?: string; // 字体
  text?: string; // 文字内容
  color?: any; // 颜色
  size?: number; // 文字大小
  bold?: boolean; // 是否加粗
  width?: number; // 宽度
  height?: number; // 高度
  x?: number; // x坐标
  y?: number; // y坐标
  textAlign?: string;
  verticalAlign?: string;
  rotation?: number; // 旋转角度
  anchorCenter?: boolean; // 是否已中心点为锚点
  anchorOffsetX?: number; // 锚点的X坐标 (anchorCenter为false时候有效)
  anchorOffsetY?: number; // 锚点的Y坐标 (anchorCenter为false时候有效)
  multiline?: boolean;
  lineSpacing?: number;
  
}
class TextField extends egret.TextField {
  /*******************属性******************/

  /*******************方法******************/
  // public set text(val){
  //   this.text = val;
  // }

  public set ID(val){
    this.text = `ID:${val}`;
  }
  public set IP(val){
    this.text = `IP:${val}`;
  }

  //初始化
  public constructor(config: TextFieldConfig) {
    super();
    let self = this;
    //属性赋值
    if (typeof config === 'string') {
      self.text = config;
    } else if (typeof config === 'object') {
      self.fontFamily = config.fontFamily || 'PingFang SC,Microsoft YaHei';
      config.text != undefined && (self.text = config.text);
      config.color != undefined && (self.textColor = config.color);
      config.size != undefined && (self.size = config.size);
      config.bold != undefined && (self.bold = config.bold);
      config.width != undefined && (self.width = config.width);
      config.height != undefined && (self.height = config.height);
      config.x != undefined && (self.x = config.x);
      config.y != undefined && (self.y = config.y);
      config.rotation && (self.rotation = config.rotation);
      config.anchorCenter != undefined && (self.anchorOffsetX = self.width / 2);
      config.anchorCenter != undefined && (self.anchorOffsetY = self.height / 2);
      config.anchorOffsetX != undefined && (self.anchorOffsetX = config.anchorOffsetX);
      config.anchorOffsetY != undefined && (self.anchorOffsetY = config.anchorOffsetY);
      config.textAlign != undefined && (self.textAlign = config.textAlign);
      config.verticalAlign != undefined && (self.verticalAlign = config.verticalAlign);
      config.lineSpacing != undefined && (self.lineSpacing = config.lineSpacing);
      config.multiline != undefined && (self.multiline = config.multiline);
      
    }
  }
}
