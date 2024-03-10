import { Component, Input, OnInit } from '@angular/core';
import { CrosswordConfig } from '../../../shared/models/crossword-config';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crossword',
  templateUrl: './crossword.component.html',
  styleUrls: ['./crossword.component.css']
})
export class CrosswordComponent implements OnInit {

  @Input()
  crosswordConfig: CrosswordConfig;

  nWords = 5;

  words: string[];

  constructor(
    private actRouter: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.crosswordConfig = CrosswordConfig.getFromQueryString(this.actRouter);
    if (!this.crosswordConfig || !this.crosswordConfig.isValid()){
      this.crosswordConfig = new CrosswordConfig(10, 15, new Array(this.nWords));
    }
  }

  generate(){
    this.crosswordConfig.words = this.words;
    this.router.navigateByUrl(`/crossword-result?${CrosswordConfig.paramKey}=${encodeURIComponent(this.crosswordConfig.Serialize())}`);
  }

  btnClick(){
    var temp = [];
    for(var word of this.crosswordConfig.words)
    {
      if (word)	
      temp.push(word);
    }

    if (temp.length > 0){
      this.words = temp;
      this.generate();
    }
    else{
      this.snackBar.open('Debes introducir al menos una palabra', null, 
        { 
          duration: 1500, 
          verticalPosition: 'top'
        });
    }
  }
}
