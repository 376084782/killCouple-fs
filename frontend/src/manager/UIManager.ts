class UIConfig {
  public static useTransition: boolean = true //是否使用场景过度动画
  public static width: number = 750 //设计稿宽度
  public static height: number = 919 //设计稿高度
  public static stageW: number = 0  //舞台宽度
  public static stageH: number = 0  //舞台高度
  public static offsetW: number = 0  //(舞台宽度-设计稿宽度)/2
  public static offsetH: number = 0  //(舞台高度-设计稿高度)/2
}

interface NormalScene extends egret.DisplayObjectContainer {
  bg?: egret.Bitmap
  onEnter?: () => void  //每次进入场景前调用
  onLeave?: () => void
  onResize?: () => void
  noAutoResize?: boolean
}

class UIManager {
  public info: Object = {};
  // 设置最外层入口容器
  public container: egret.DisplayObjectContainer
  // 存放当前主场景，唯一
  public currentScene: NormalScene

  // 初始化主要场景,index 0
  private sceneHall: NormalScene
  private sceneGame: NormalScene
  private sceneOver: NormalScene
  // 结算层,index 20
  // private sceneResult: GameResult

  // 初始化弹层场景 ,index 50
  private currentModal: any;
  private animationModal: AnimationModal;
  private modalOffline: OfflineModal;

  // 顶层bar
  private barTop: BarTop;

  constructor(layer) {
    this.setContainer(layer);
    this.barTop = new BarTop();
    this.container.addChildAt(this.barTop, 100);
  }
  fListen() {
    let self = this;

    EventManager.sub('modal/onShowModal', function (modalType, obj = {}) {
      self.showModal(modalType, obj);
    })

    EventManager.sub('modal/onModalClose', () => {
      if (this.currentModal) {
        if (this.currentModal.parent) {
          egret.Tween.removeTweens(this.currentModal);
          egret.Tween.get(this.currentModal).to({ alpha: 0 }, 200).call(() => {
            if (this.currentModal.parent) {
              this.container.removeChild(this.currentModal);
            }
            this.currentModal = undefined;
          })
        } else {
          this.currentModal = undefined;
        }
      }
    })

    EventManager.sub('modal/onCloseOffline', () => {
      if (this.modalOffline && this.modalOffline.parent) {
        this.container.removeChild(this.modalOffline);
      }
    })

    EventManager.sub('modal/onShowOffline', (obj = {}) => {
      this.modalOffline = this.modalOffline || new OfflineModal();
      this.modalOffline.spText.text = obj['text'];
      this.container.addChildAt(this.modalOffline, 50);
    })

  }

  setContainer(layer) {
    this.container = layer
    // 初始化舞台大小
    let stage: egret.Stage = egret.MainContext.instance.stage
    UIConfig.stageW = stage.stageWidth
    UIConfig.stageH = stage.stageHeight

    UIConfig.offsetW = (stage.stageWidth - UIConfig.width) / 2
    UIConfig.offsetH = (stage.stageHeight - UIConfig.height) / 2
    // 重排容器
    this.container.width = UIConfig.stageW
    this.container.height = UIConfig.stageH
    // 绑定resize事件
    this.container.stage.addEventListener(egret.Event.RESIZE, this.onResize, this)
    this.fListen();
  }

  private onResize() {
    // 重计算舞台大小
    let stage: egret.Stage = egret.MainContext.instance.stage
    UIConfig.stageW = stage.stageWidth
    UIConfig.stageH = stage.stageHeight
    // 重排容器
    this.container.width = UIConfig.stageW
    this.container.height = UIConfig.stageH
    // 重排场景
    if (this.currentScene) {
      if (this.currentScene.noAutoResize) {
        this.currentScene.onResize();
        return;
      }
      this.currentScene.width = UIConfig.width
      this.currentScene.height = UIConfig.height
      this.currentScene.x = (UIConfig.stageW - UIConfig.width) / 2
      this.currentScene.y = (UIConfig.stageH - UIConfig.height) / 2
      // 执行场景定义resize事件
      this.currentScene.onResize && this.currentScene.onResize()
      if (this.currentScene.bg) {
        let targetPoint: egret.Point = this.currentScene.globalToLocal(0, 0)
        this.currentScene.bg.x = targetPoint.x
        this.currentScene.bg.y = targetPoint.y
        this.currentScene.bg.width = this.container.width
        this.currentScene.bg.height = this.container.height
      }
    }
    console.log('stage.stageHeight', stage.stageHeight);
    console.log('UIConfig.height', UIConfig.height)
    console.log('offsetH', UIConfig.offsetH)
    UIConfig.offsetW = (stage.stageWidth - UIConfig.width) / 2
    UIConfig.offsetH = (stage.stageHeight - UIConfig.height) / 2
  }

  showResult(obj) {
    obj = obj || {
      isWin: true,
      mine: { "name": "我不", "base": "3", "rate": "20", "score": "50" },
      opp: { "name": "名字好难取", "base": "30000", "rate": "240", "score": "500000" },
      winType: 1,
      scoreTips: '1231',
      mult: [1, 2, 3, 4, 5]
    }
  }
  showModal(type, args = {}) {
    //   // 0个人信息,1设置
    let modal: ModalLayer;
    switch (type) {
      case 0: {
        this.animationModal = this.animationModal || new AnimationModal();
        // this.animationModal.ct321[2].visible = true;
        this.animationModal.ct321[2].visible = false;
        this.animationModal.ct321[0].visible = false;
        this.animationModal.pBoy.x = 360;
        this.animationModal.pGirl.x = 80;
        modal = this.animationModal;
        EventManager.pub('hideFindTip');
        break;
      }
      case 1: {
        break;
      }
      case 2: {

        break;
      }
      case 3: {

        break;
      }
    }
    if (this.currentModal) {
      this.container.removeChild(this.currentModal);
      this.currentModal = undefined;
    }
    if (modal) {
      this.currentModal = modal;
      this.container.addChildAt(modal, 50);
      EventManager.pub("startCT");
    } else {
      console.warn('modal类型未定义')
    }
  }

  async to(name) {
    // 清除所有已打开弹窗
    // EventManager.pub('modal/onModalClose');
    switch (name) {
      case 'hall': {
        this.sceneHall = this.sceneHall || new SceneHall();
        this.add(this.sceneHall)
        break
      }
      case 'game': {
        this.sceneGame = this.sceneGame || new SceneGame();
        this.add(this.sceneGame)
        break
      }
      case 'over': {
        this.sceneOver = this.sceneOver || new SceneOver();
        this.add(this.sceneOver)
        EventManager.pub('showLevel')

        //返回闯关情况
        let score: number = Math.floor(GameData.gameLevel / 5) * 5;
        console.log('rtScore', score)
        // let score = (GameData.gameLevel - 1) * 10;
        EventManager.pub('showEva', score);
        EventManager.pub('returnScore', score);

        break;
      }
    }
  }
  async add(scene: NormalScene) {
    // 移除原场景
    if (this.currentScene) {
      // 跳转到当前场景时返回
      if (this.currentScene == scene) {
        this.currentScene.onLeave && this.currentScene.onLeave();
        this.currentScene.onEnter && this.currentScene.onEnter();
        return;
      }
      await this.remove(this.currentScene)
      console.log('====原场景已移除====')
    }
    // 计算场景大小
    scene.width = UIConfig.width
    scene.height = UIConfig.height
    scene.x = (UIConfig.stageW - UIConfig.width) / 2
    scene.y = (UIConfig.stageH - UIConfig.height) / 2
    // 计算场景背景大小
    if (scene.bg) {
      let targetPoint: egret.Point = scene.globalToLocal(0, 0)
      scene.bg.x = targetPoint.x
      scene.bg.y = targetPoint.y
      scene.bg.width = this.container.width
      scene.bg.height = this.container.height
    }
    // 执行场景中定义的onEnter方法
    let onEnter = scene.onEnter || new Function;
    scene.once(egret.Event.ADDED_TO_STAGE, onEnter, scene);
    // 加载新场景
    this.container.addChildAt(scene, 0)
    console.log('====加载新场景成功====')
    this.currentScene = scene
    if (UIConfig.useTransition) {
      await this.transform(scene)
    }
  }

  async remove(scene) {
    if (this.container.contains(scene)) {
      if (UIConfig.useTransition) {
        await this.transform(scene, false)
      }
      // 执行场景中定义的onLeave方法
      scene.onLeave && scene.onLeave()
      this.container.removeChild(scene)
      this.currentScene = undefined
    }
  }
  async transform(ele, direction = true, duration = 300) {
    let start = {
      alpha: 0
    }
    let end = {
      alpha: 1
    }
    if (!direction) {
      // 调换start，end状态
      [start, end] = [end, start]
    }
    await (() => {
      return new Promise((resolve, reject) => {
        egret.Tween.get(ele).set(start).to(end, duration).call(function () {
          resolve()
        })
      })
    })()
  }
}

// 注册全局管理器
let UImanager