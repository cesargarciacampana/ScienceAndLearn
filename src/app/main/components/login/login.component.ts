import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GameInfo } from '@shared/models/game-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  saved = false;

  @Input() gameInfo: GameInfo;
  @Input() gameName: string;
  @ViewChild(MatInput) name: MatInput;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  login(){
    if (!this.name.value)
      return;

    let stats = {
      user: this.name.value, points: this.gameInfo.points,
      seconds: this.gameInfo.seconds, info: this.gameInfo.toJson()
    };
    this.firestore.collection(this.gameName + '-statistics').add(stats)
    .then(()=>
      {
        this.saved = true;
      }
    ).catch((reason) => alert('No se ha podido guardar: ' + reason));
  }
}
