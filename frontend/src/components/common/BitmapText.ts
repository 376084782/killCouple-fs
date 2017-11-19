/**
 * 生成位图文字
 * @config 配置信息,传入的可以是string，也可以是object
 * @author wangnan
 */

interface bitmapTextConfig {
    source?: string; //位图文字资源
    width?: number; //高度
    height?: number; //宽度
    textHeight?: number;
    textWidth?:number;
    text?: string; //文字
    textAlign?: string; //文字水平对齐
    verticalAlign?: string; //文字垂直对齐
    letterSpacing?: number; //字符之间的距离
    lineSpacing?: number; //行行之间的垂直距离
    x?: number; //坐标x
    y?: number; //坐标y
    anchorOffsetX?: number; //锚点坐标x
    anchorOffsetY?: number; //锚点坐标y
    scaleX?: number;
    scaleY?: number;
}

class BitmapText extends egret.BitmapText{
    /***************属性***************/
    private _src : string;
    private _cont : string;
    public set cont(newCont){
        this._cont = newCont;
        this.text = newCont;
    }
    public set src(newSrc){
        this._src = newSrc;
        this.font = RES.getRes(newSrc);
    }
    public get src(){
        return this._src;
    }
    public get cont(){
        return this._cont;
    }
    /****************方法***************/
    //初始化
    public constructor(config : bitmapTextConfig){
        super();
        let self = this;
        if(typeof config === 'string'){
            self.src = config;
        }else if(typeof config === 'object'){
            config.source != undefined && (self.src = config.source);
            config.width != undefined && (self.width = config.width);
            config.height != undefined && (self.height = config.height);
            config.text != undefined && (self.text = config.text);
            config.textAlign != undefined && (self.textAlign = config.textAlign);
            config.verticalAlign != undefined && (self.verticalAlign = config.verticalAlign);
            config.letterSpacing != undefined && (self.letterSpacing = config.letterSpacing);
            config.lineSpacing != undefined && (self.lineSpacing = config.lineSpacing);
            config.x != undefined && (self.x = config.x);
            config.y != undefined && (self.y = config.y);
            config.anchorOffsetX != undefined && (self.anchorOffsetX = config.anchorOffsetX);
            config.anchorOffsetY != undefined && (self.anchorOffsetY = config.anchorOffsetY);
            config.scaleX != undefined && (self.scaleX = config.scaleX);
            config.scaleY != undefined && (self.scaleY = config.scaleY);
        }
    }
}