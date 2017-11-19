/**
 * 生成位图
 * @config 配置信息，可单独传入图片src（string），也可传入完整配置对象（object）
 * @author wangnan
 */

interface bitmapConfig {
    source ?: string; //位图资源
    width ?: number;    
    height ?: number;
    x?: number;
    y?: number;
    anchorCenter?: boolean; //是否以中心点为锚点
    anchorOffsetX?: number; //位图锚点坐标（只有当anchorCenter为false时有效）
    anchorOffsetY?: number; //位图锚点坐标（只有当anchorCenter为false时有效）
    rotation?: number; //旋转角度
    alpha?: number; //透明度
    visible?: boolean; //是否可见
    touchEnabled?: boolean;
}
class Bitmap extends egret.Bitmap{
    /***************属性***************/
    private _src : string;

    public set src(newSrc){
        this._src = newSrc;
        this.texture = RES.getRes(newSrc);
    }

    public get src(){
        return this._src;
    }

    /****************方法***************/
    //初始化
    public constructor(config : bitmapConfig){
        super();
        let self = this;
        if( typeof config === 'string'){
            self.src = config;
        }else if( typeof config === 'object'){
            config.source != undefined && (self.src = config.source);
            config.width != undefined && (self.width = config.width);
            config.height != undefined && (self.height = config.height);
            config.x != undefined && (self.x = config.x);
            config.y != undefined && (self.y = config.y);
            config.rotation != undefined && (self.rotation = config.rotation);
            if(config.anchorCenter){
              self.anchorOffsetX = (self.width /2);
              self.anchorOffsetY = (self.height /2);
            } else{
              (config.anchorOffsetX != undefined) &&(self.anchorOffsetX = config.anchorOffsetX);
              (config.anchorOffsetY != undefined) &&(self.anchorOffsetY = config.anchorOffsetY);
            }
            config.alpha != undefined && (self.alpha = config.alpha);
            config.visible != undefined && (self.visible = config.visible);
            config.touchEnabled != undefined && (self.touchEnabled = config.touchEnabled);
        }
    }
}

