export class RandomHelper {
    constructor() { }
    
    static randomIntFromInterval(min, max) { // min included, max excluded 
        return Math.floor(Math.random() * (max - min) + min);
    }

    static fromArray<T>(array :T[]){
        return array[this.randomIntFromInterval(0, array.length)];
    }
}