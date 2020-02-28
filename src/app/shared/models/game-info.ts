export class GameInfo{
    started = false;
    finished = false;
    points = 0;
    seconds = 0;

    constructor(){

    }

    toJson(){
        let temp = { points: this.points, seconds: this.seconds };
        return JSON.stringify(temp);
    }
}