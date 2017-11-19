class GameData {
    public static countDown: number = 0;
    public static nId: number;
    public static roomId: number;
    public static loverID: number;
    public static ctTime: number = 2;
    public static gameLevel: number = 1;
    public static teamMateName: string = 'XX'
    public static offX: number = 50;
    public static isAnswer: boolean = false;
    public static oldScore: number;
    public static oldRank: number;

    public static tCopy: string[] = ["点错会减少5秒哦", "对友点错，减少5秒！", "你点错了，减少5秒！"]
    public static fCopy: string[] = ["目前你们都没有找到情侣哦，抓紧时间找到他们并拆散这对情侣吧", "你已锁定情侣，帮助对方也找到这对狗男女，即可干掉这对情侣！", "对方已锁定情侣，听取对方的建议，你可以更快的找到情侣哦", "恭喜你们都成功的锁定了情侣，马上进入下一关！"]
}