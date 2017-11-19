
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"polyfill/promise.js",
	"js/EventManager/EventManager.js",
	"js/Net/Connection.js",
	"bin-debug/components/common/ModalLayer.js",
	"bin-debug/components/game/People.js",
	"bin-debug/components/common/BitmapText.js",
	"bin-debug/components/common/Button.js",
	"bin-debug/components/common/ImageLoader.js",
	"bin-debug/components/common/LoadingLayer.js",
	"bin-debug/components/common/Mask.js",
	"bin-debug/components/common/Modal.js",
	"bin-debug/components/BarTop.js",
	"bin-debug/components/common/TextField.js",
	"bin-debug/components/game/Clock.js",
	"bin-debug/components/game/FindTip.js",
	"bin-debug/components/game/KillTip.js",
	"bin-debug/components/common/Bitmap.js",
	"bin-debug/components/game/TimeTip.js",
	"bin-debug/components/hall/ScoreBar.js",
	"bin-debug/components/modals/AnimationModal.js",
	"bin-debug/components/modals/OfflineModal.js",
	"bin-debug/components/over/RankBar.js",
	"bin-debug/components/over/TitleBar.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/manager/GameData.js",
	"bin-debug/manager/UIManager.js",
	"bin-debug/scene/SceneGame.js",
	"bin-debug/scene/SceneHall.js",
	"bin-debug/scene/SceneOver.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedNarrow",
		contentWidth: 750,
		contentHeight: 919,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};