/**
 * websocket连接模块
 */
var Connection = {
  bConnectSuccess: false,
  //初始化socket
  initWS: function (host) {
    var self = this;
    ws = TikigameConnector(host);
    ws.on("connect", function (e) {
      self.bConnectSuccess = true;
      self.start();
      console.log("连接成功");
    });
    ws.on("10011", function (data) {
      if (data.code == 0) console.log("准备请求成功");
      else console.log("准备请求失败");
    });
    ws.on("10023", function (oData) {
      if (oData.code == 0) {
        console.log("游戏开始~");
        UImanager.to("game");
      }
    });
    ws.on("10033", function (oData) {
      console.log(
        "游戏时间：",
        oData.time,
        "地图数据:",
        oData.mapInfo,
        "情侣位置：",
        oData.answer,
        "当前关卡：" + oData.level
      );
      GameData.gameLevel = oData.level;
      console.log("数据类型：", typeof oData.mapInfo);
      EventManager.pub("startClock", oData.time); //开启倒计时
      EventManager.pub("produceMap", oData.mapInfo); //生成地图
      EventManager.pub("isLover", oData.answer); //记录情侣位置
      EventManager.pub("currentOff", oData.level); //显示当前关卡、已杀情侣数
    });
    ws.on("10043", function (oData) {
      if (oData.code == 0) {
        console.log("游戏结束");
        //调游戏结束页面
        EventManager.pub("storeLevel", oData.level);
        UImanager.to("over");
      }
    });
    ws.on("10053", function (oData) {
      if (oData.code == 100) {
        //扣時間 校準時間 根據ID顯示提示
        EventManager.pub("findFalse", oData.data);
        console.log("答錯，返回100");
      } else if (oData.code == 0) {
        //根据ID显示提示 显示红色圆圈  关闭触控区
        console.log("答對，返回0");
        EventManager.pub("findTrue", oData);
      }
    });
    ws.on("10063", function (oData) {
      //停止时间、进入动画、倒计时
      console.log("进入动画");
      EventManager.pub("stopTime");
      EventManager.pub("modal/onShowModal", 0);
    });
    ws.on("10071", function (oData) {
      console.log("进入下一关");
      //关闭modal 打开触控区
      EventManager.pub("modal/onModalClose");
    });
    ws.on("12003", function () {
      EventManager.pub('modal/onShowOffline', { text: '对方已断开连接，即将退出游戏...' })
    });
    ws.on("disconnect", function () {
      //调用关闭游戏API
      EventManager.pub('modal/onShowOffline', { text: '您已断开连接，即将退出游戏...' })
      ws.close();
    });
    EventManager.sub("sendMessage", oData => {
      switch (oData.state) {
        case "ready":
          ws.emit(10010, { id: GameData.nId, roomid: GameData.roomId });
          break;
        case "find":
          ws.emit(10050, { id: GameData.nId, answer: oData.answer, x: oData.x, y: oData.y, level: GameData.gameLevel });
          break;
        case "next":
          ws.emit(10070, { id: GameData.nId, roomid: GameData.roomId });
          break;
      }
    });
  },
  sendMessage: function (message) {
    //客户端主动发送数据
    ws.readyState === 1 && ws.send(message);
  },
  start: function () {
    //从tiki获取排名、分数，这边假设获取到 id为001、002，roomid都为1
    //发送房间、id信息给自己的后台
    ws.on("10001", function (data) {
      if (data.code == 0) console.log("发送房间成功");
      else console.log("发送房间失败");
    });
    // id = Math.floor(Math.random() * 1000);
    // GameData.nId = id;
    // GameData.roomId = 1;
    ws.emit(10000, { id: GameData.nId, roomid: GameData.roomId });
  },
  onMsg: function () {
    //接收到服务器信息、解析、分发
  }
};
// 1、获取自己的排名、分数       2、发送准备数据、误操作数据、找到情侣数据、游戏结束、游戏分数、返回首页   2、接收开始游戏、对家找到情侣、游戏进入下一关、进入结束页面、游戏新排名、分数
TikiGame.$(function (auth) {
  // 所有sdk函数在此内部调用
  // 回调内参数 auth.data 内包含了当前用户自己的信息
  if (auth.code == 0) {
    TikiGame.getRoomInfo(function (resp) {
      let dataTmp = resp.to;
      let userRoomId = resp.roomid;
      let userId = resp.uid;
      let sio = resp.sio;

      GameData.nId = userId;
      GameData.roomId = userRoomId;
      // let dizhi = `ws://${sio}?_d=gameId&_t=${userRoomId}&cid=${userId}`;

      // 获取得分
      TikiGame.getUserScore(function (resp) {
        // resp.score;// 在pa内的得分
        // resp.rank; //在pa内的排行
        EventManager.pub("updataScore", { score: resp.score, rank: resp.rank });
      });

      TikiGame.showGameView();
      Connection.initWS(sio);
    });

    //返回得分
    EventManager.sub("returnScore", rtScore => {
      TikiGame.increaseScore(rtScore, function (resp) {
        // resp.score; //修改后的得分
        // resp.rank; // 修改分数后的排行
        EventManager.pub("updataScore", { score: resp.score, rank: resp.rank });
      });
    });

    //结束游戏
    EventManager.sub("closeGame", () => {
      TikiGame.exitView(true);
    });
  } else {
    setTimeout(function () {
      console.log('返回異常')
      id = Math.floor(Math.random() * 1000);
      GameData.nId = id;
      GameData.roomId = 1;
      Connection.initWS('localhost:5555');
    }, 0)
  }
});

// Connection.initWS('ws://116.62.204.200:5555');
// Connection.initWS("ws://localhost:5555");
