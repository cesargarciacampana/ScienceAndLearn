import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WordService } from '@chem-shared/services/word.service';
import { WordSearchConfig } from '../../../models/word-search-config';
import { WordSearchOptionsComponent } from '../word-search-options/word-search-options.component';
import { MatDialog } from '@angular/material/dialog';

export enum Generate{
    Random = 0,
    User = 1
}

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.css']
})

export class WordSearchComponent implements OnInit {

  allowRandomGenerate = false;
  wsConfig: WordSearchConfig;
  nWords = 5;

  words: string[];

  Generate: any = Generate;
  generateWords: Generate = Generate.User;

  showSettingsDelegate: () => void;

  constructor(
    private wordService : WordService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.wsConfig = WordSearchConfig.getFromQueryString(this.actRouter);
    if (!this.wsConfig || !this.wsConfig.isValid()){
      this.wsConfig = new WordSearchConfig(
        WordSearchOptionsComponent.defaultRows, 
        WordSearchOptionsComponent.defaultCols, 
        WordSearchOptionsComponent.defaultNDirections, 
        new Array(this.nWords));
    }

    const self = this;
    this.showSettingsDelegate = () => {
      let dialogRef = self.dialog.open(WordSearchOptionsComponent, { data: { wsConfig: this.wsConfig }} );
      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.wsConfig.rows = result.rows;
          this.wsConfig.cols = result.cols;
        }
      });
    }
  }

  resetWords(){
	  this.words = null;
  }

  onGenerateChanged(){
	  this.resetWords();
  }

  generate(){
    this.wsConfig.words = this.words;
    this.router.navigateByUrl(`/word-search-result?${WordSearchConfig.paramKey}=${encodeURIComponent(this.wsConfig.Serialize())}`);
  }

  btnClick(){
    this.resetWords();

    if (this.generateWords == Generate.Random){
      this.wordService.randomWords(this.nWords).subscribe(
        data => {
          this.words = data
          this.generate();
        }
      );
    }
    else{
      var temp = [];
      for(var word of this.wsConfig.words)
      {
        if (word)	
        temp.push(word);
      }
      if (temp.length > 0){
        this.words = temp;
        this.generate();
      }
      else{
        this.snackBar.open("Debes introducir al menos una palabra", null, 
          { 
            duration: 1500, 
            verticalPosition: 'top'
          });
      }
    }
  }
}
