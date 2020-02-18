export class RandomHelper {
    constructor() { }
    
    static randomIntFromInterval(min, max) { // min included, max excluded 
        return Math.floor(Math.random() * (max - min) + min);
    }
}