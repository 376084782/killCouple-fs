const missReduce = 5;
const gameTime = 120;

const scoreEach = 10;

module.exports = {
  createRoom
};
function createRoom(id) {
  let room = {
    status: 0, //0连接，1可以开始游戏，2游戏中
    id,
    onlineList: [], //存用户id
    readyList: [],
    gameData: createGameData(),
    setReady(id) {
      if (this.readyList.indexOf(id) == -1) {
        this.readyList.push(id);
      }
      if (this.readyList.length == 2) {
        if (this.status < 2) {
          this.status = 2;
          this.gameData.start();
          this.readyList = [];
        }
      }
    },
    toNext(id) {
      if (this.readyList.indexOf(id) == -1) {
        this.readyList.push(id);
        if (this.readyList.length == 2) {
          // 下一关开始游戏
          this.status = 2;
          this.gameData.randomMap();
          this.readyList = [];
          return 1;
        }
        // 等待另一个玩家
        return 0;
      } else {
        // 错误
        return -1;
      }
    },
    setOnline(id) {
      if (this.onlineList.indexOf(id) == -1) {
        this.onlineList.push(id);
        return true;
      } else {
        return false;
      }
    },
    findUserId(id) {
      for (let i = 0; i < this.onlineList.length; i++) {
        if (this.onlineList[i] == id) {
          return index;
        }
      }
    }
  };
  return room;
}
function createGameData() {
  let gameInfo = {
    mapInfo: {},
    answer: null,
    level: 1,
    startTime: 0,
    timeReduced: 0,
    timeTotal: 120,
    clock: null,
    timeLeft: 0,
    stopping: false, //计时器开关控制器
    missReduce,
    lastAnswerId: 0,
    scoreInfo: {},
    finishCallback() { },
    sendAnswer(id, answer, level) {
      console.log(this.level, level)
      if (level != this.level) {
        return 0;
      }
      this.lastAnswerId = id;
      // return -1错误 0一个正确 1两个正确，下一关
      if (this.answer == answer) {
        // 找对了
        // 关闭时钟，等待进入下一关
        this.level++;
        this.stopping = true;
        this.scoreInfo[id] = this.scoreInfo[id] || 0;
        this.scoreInfo[id] += scoreEach;
        return 1;
      } else {
        this.timeReduced += missReduce;
        this.timeLeft -= missReduce;
        return -1;
      }
    },
    start() {
      this.level = 1;
      this.randomMap();
      this.startTime = new Date().getSeconds();
      this.timeReduced = 0;
      this.timeTotal = gameTime;
      this.timeLeft = gameTime;
      this.startClock();
    },
    startClock() {
      this.clock = setInterval(() => {
        if (!this.stopping) {
          this.timeLeft--;
          if (this.timeLeft <= 0) {
            this.finishGame();
            this.clearClock();
          }
        }
      }, 1000);
    },
    clearClock() {
      clearInterval(this.clock);
      this.clock = null;
    },
    finishGame() {
      this.finishCallback();
      this.status = 0;
      this.timeReduced = 0;
      this.timeTotal = gameTime;
      this.timeLeft = gameTime;
      this.level = 1;
      this.scoreInfo = {};
    },
    randomMap() {
      let randomMap = getData(this.level);
      this.mapInfo = randomMap.map;
      this.answer = randomMap.answer;
      this.stopping = false;
    }
  };
  return gameInfo;
}

function getBase(number, base) {
  return Math.floor(number / base) * base;
}

const picW = 50;
const picH = 83;
const jumpN = 3;
const countType = 10;
let width = 730 + 25;
let height = 798 - picH / 3;

let ratio = width / height;
let picR = picW / picH;
let base = 15;
let min = 6;
let step = 0.8;
function RandomNumBoth(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}

function getData(level) {
  var pixel = base - step * level;
  pixel < min && (pixel = min);
  var maxX = Math.ceil(width / pixel / jumpN);
  var maxY = Math.ceil(maxX * picR / ratio);
  var data = [];
  let Nx = (Ny = 0);
  let randomX = RandomNumBoth(1, maxX - 2);
  let randomY = RandomNumBoth(1, maxY - 2);
  let answer = randomX + randomY * maxX;
  for (let n = 0; n < maxY; n++) {
    for (let m = 0; m < maxX; m++) {
      Nx = jumpN * m + randomNumber();
      if (Nx > Math.floor(width / pixel / jumpN)) {
        Nx = jumpN * m + (width / pixel) % jumpN;
      }
      Ny = n;
      if (n > 0) {
        if (n < maxY - 1) {
          Ny += (Math.random() - 0.5) * jumpN / 3;
        } else {
          Ny -= Math.random() / 2 * jumpN / 3;
        }
      }
      let pic;
      let isRotate = 0;
      if (n * maxX + m == answer) {
        pic = 0;
      } else {
        pic = randomType();
        isRotate = Math.random() < 0.5 ? 0 : 1;
      }
      data.push(
        `${Nx * pixel},${Ny * pixel * jumpN / picR},${pic},${isRotate}`
      );
    }
  }
  return { map: data, answer: answer };
}

function randomNumber() {
  return Math.floor(Math.random() * jumpN);
}

function randomType() {
  return Math.ceil(Math.random() * countType);
}

function sortData(data, piece) {
  function sortFuc(a, b) {
    var n1 = a.split(",")[1];
    var n2 = b.split(",")[1];
    if (n1 - n2 > piece) {
      return 1;
    } else if (n1 - n2 < piece) {
      return -1;
    } else {
      var m1 = parseInt(a);
      var m2 = parseInt(b);
      return m1 - m2;
    }
  }
  return data.sort(sortFuc);
}
