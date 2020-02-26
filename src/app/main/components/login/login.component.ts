import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatInput } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  saved = false;

  @Input() gameInfo: any;
  @ViewChild(MatInput, { static: false}) name: MatInput;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  login(){
    if (!this.name.value)
      return;

    let stats = {user:this.name.value, game: 'spell', info: this.gameInfo.points};
    this.firestore.collection('statistics').add(stats)
    .then(()=>
      {
        this.saved = true;
      }
    ).catch((reason) => alert('No se ha podido guardar: ' + reason));
  }
}
