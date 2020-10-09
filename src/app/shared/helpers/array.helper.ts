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
}