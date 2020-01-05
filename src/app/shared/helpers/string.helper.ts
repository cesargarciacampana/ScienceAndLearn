export class StringHelper {
    constructor() { }
    
    static removeAccents(s: String){
        return s.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
    }
}