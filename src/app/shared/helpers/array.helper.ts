import { RandomHelper } from './random.helper';

export class ArrayHelper {
    constructor() { }
    
    static isEqual(a: any[], b: any[]) : boolean
    { 
        // if length is not equal 
        if(a.length!=b.length) 
            return false; 
        else
        { 
            // comapring each element of array 
            for(var i=0;i<a.length;i++) {
                if(a[i] != b[i]) 
                return false; 
            }
        }
        return true; 
    }

    static numberArray(length: number) : number[]{
        return Array.from(Array(length)).map((x, i) => i );
		}
		
		static shuffleArray(array: any[]) : any[]{
			for(let i = array.length - 1; i > 0; i--){
				const j = RandomHelper.randomIntFromInterval(0, i);
				const temp = array[i]
				array[i] = array[j]
				array[j] = temp
			}
			return array;
		}
}