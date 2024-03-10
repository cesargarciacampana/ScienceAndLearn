import { Injectable } from "@angular/core";
import { ArrayHelper } from "@shared/helpers/array.helper";
import { RandomHelper } from "@shared/helpers/random.helper";
import { StringHelper } from "@shared/helpers/string.helper";
import { Letter, WordDirection, WordPosition, WordGridModel, PlacedWord } from "../models/word-grid.model";

@Injectable({providedIn: 'root'})
export class WordGridHelper {

	private isPositionValid(
    wsModel: WordGridModel,
    position: number,
    direction: WordDirection,
    word: string,
    forceOverlap: boolean
  ){
    var overlapping = false;
		for (let j = 0; j < word.length; j++){
				let index = this.calculateIndex(wsModel.cols, position, direction, j);
				let gridChar = wsModel.grid[index];
				if (gridChar){
          if (gridChar.letter != StringHelper.removeAccents(word[j]).toUpperCase()
            || gridChar.words.findIndex(x => x.direction == direction) >= 0){
            return false;
          }
          else{
            overlapping = true;
          }
        }
			}
			return !forceOverlap || overlapping;
	}
	
	private generateRandomPositionsList(rows: number, cols: number, direction: WordDirection, wordLength: number) : number[]{
		let list = [];
		let rowinit, rowend, colinit, colend;
		switch(direction){
			case WordDirection.HRight:
				rowinit = 0;
				rowend = rows - 1;
				colinit = 0;
				colend = cols - wordLength;
				break;
			case WordDirection.HLeft:
				rowinit = 0;
				rowend = rows - 1;
				colinit = wordLength - 1;
				colend = cols - 1;
				break;
			case WordDirection.VDown:
				rowinit = 0;
				rowend = rows - wordLength;
				colinit = 0;
				colend = cols - 1;
				break;
			case WordDirection.VUp:
				rowinit = wordLength - 1;
				rowend = rows - 1;
				colinit = 0;
				colend = cols - 1;
				break;
		}
		for (let i = rowinit; i <= rowend; i++){
			for (let j = colinit; j <= colend; j++){
				list.push(j + cols * i);
			}
		}
		list = ArrayHelper.shuffleArray(list);
		return list;
	}

	private generateAllPossibleWordPositions(wsModel: WordGridModel, words: string[], nDirections: number) : WordPosition[]{
		let wordPositions = new Array<WordPosition>(words.length);

		for (let i = 0; i < words.length; i++){
			let word = words[i];
			let wordPosition = new WordPosition();
			wordPosition.word = word;			
			wordPosition.directions = ArrayHelper.shuffleArray(ArrayHelper.numberArray(nDirections));
			wordPosition.positions = new Array<number[]>(nDirections);
			for(let j = 0; j < nDirections; j++)
				wordPosition.positions[j] = this.generateRandomPositionsList(wsModel.rows, wsModel.cols, wordPosition.directions[j], word.length);

				wordPositions[i] = wordPosition;
		}

		return wordPositions;
	}

	private calculateIndex(cols: number, basePosition: number, direction: WordDirection, index: number){
		switch(direction){
			case WordDirection.HRight:
				return basePosition + index;
			case WordDirection.HLeft:
				return basePosition - index;
			case WordDirection.VDown:
				return basePosition + cols * index;
			case WordDirection.VUp:
				return basePosition - cols * index;
		}
	}

	private placeWord(wsModel: WordGridModel, position: number, direction: WordDirection, word: string){
		for (let j = 0; j < word.length; j++){
			let index = this.calculateIndex(wsModel.cols, position, direction, j);
      if (!wsModel.grid[index]){
			  wsModel.grid[index] = new Letter(StringHelper.removeAccents(word[j]).toUpperCase(), true);
      }
      const placedWord = new PlacedWord();
      placedWord.word = word;
      placedWord.direction = direction;
      wsModel.grid[index].words.push(placedWord);
		}
	}

	private placeWords(
    wsModel: WordGridModel,
    words: string[],
    nDirections: number,
    wordPositions: WordPosition[],
    forceOverlap: boolean
  ){
		let size = words.length;
		let placed = new Array<boolean>();

		let wordIndex = 0;
		while (wordIndex < size){
			let word = words[wordIndex];
			let wordPosition = wordPositions[wordIndex];
			let directionIndex = 0;
			while(!placed[wordIndex] && directionIndex < nDirections)
			{
				let direction = wordPosition.directions[directionIndex];

				let positionIndex = 0;		
				let positions = wordPosition.positions[directionIndex];			
				while(positions.length > 0 && !placed[wordIndex] && positionIndex < positions.length){
					let position = positions[positionIndex];

					if (this.isPositionValid(wsModel, position, direction, word, forceOverlap && wordIndex > 0)){
						this.placeWord(wsModel, position, direction, word);
						placed[wordIndex] = true;
					}
					positionIndex++;
				}
				directionIndex++;
			}
			wordIndex++;
		}
	}
	
	generate(
    rows: number,
    cols: number,
    words: string[],
    nDirections: number,
    fillBlanks = true,
    forceOverlap = false
  ) : WordGridModel{
		let wsModel = new WordGridModel(rows, cols);

		let positions = this.generateAllPossibleWordPositions(wsModel, words, nDirections);
		this.placeWords(wsModel, words, nDirections, positions, forceOverlap);

    if (fillBlanks){
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let i = 0; i < wsModel.cols * wsModel.rows; i++){
        if (!wsModel.grid[i])
          wsModel.grid[i] = new Letter(chars[RandomHelper.randomIntFromInterval(0, chars.length)]);
      }
    }

		return wsModel;
	}
}