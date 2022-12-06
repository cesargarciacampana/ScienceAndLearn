export class Statistics{
    game: string;
	user: string;
	points: number;
	seconds: number;
	info: string

	private _infoObject = null;

	get infoObject() {
		if (this._infoObject == null)
			this._infoObject = JSON.parse(this.info);

		return this._infoObject;
	} 

	constructor(Game: string = '', User: string = '', Points: number = 0, Seconds: number = 0, Info: string  = ''){
		this.game = Game;
		this.user = User;
		this.points = Points;
		this.seconds = Seconds;
		this.info = Info;
    }
}