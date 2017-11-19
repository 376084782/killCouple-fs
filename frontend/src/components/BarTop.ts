class BarTop extends egret.Sprite {
    set name1(name) {
        this.spName1.text = name;
    }
    get name1() {
        return this.spName1.text;
    }
    set name2(name) {
        this.spName2.text = name;
    }
    get name2() {
        return this.spName2.text;
    }
    private spName1: TextField;
    private spName2: TextField;
    set time(time) {
        this._time = time
    }
    get time() {
        return this._time;
    }
    private _time;
    private spTime;
    private spScore1:BitmapText;
    private spScore2:BitmapText;
    set score1(name) {
        this.spScore1.text = name;
    }
    get score1() {
        return this.spScore1.text;
    }
    set score2(name) {
        this.spScore2.text = name;
    }
    get score2() {
        return this.spScore2.text;
    }
    private spLevel;

    constructor() {
        super();

        this.width = UIConfig.stageW;
        this.height = 140;
        this.x = 0;
        this.y = 0;

        this.spName1 = new TextField({
            size: 40,
            color: 0x000000,
            text: 'name1',
            x: 20,
            y: 10
        });
        this.addChild(this.spName1);

        this.spName2 = new TextField({
            size: 40,
            color: 0x000000,
            text: 'name2',
            y: 10
        });
        this.spName2.x = this.width - this.spName2.width - 20;
        this.addChild(this.spName2);

        
        this.spScore1 = new BitmapText({
            source:'pic_djs_fnt',
            text: '1000',
            x: 30,
            y: 85
        });
        this.addChild(this.spScore1);

        this.spScore2 = new BitmapText({
            source:'pic_djs_fnt',
            text: '1000',
            y: 85
        });
        this.spScore2.x = this.width - this.spScore2.width - 30;
        this.addChild(this.spScore2);



    }
    hideClock() {

    }
}