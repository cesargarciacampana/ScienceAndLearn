export class Card{
    text: string;
    selected: boolean;
    solved: boolean;

    constructor(text: string){
        this.text = text;
        this.selected = false;
        this.solved = false;
    }
}