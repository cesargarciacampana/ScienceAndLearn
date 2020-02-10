import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatInputModule, MatSidenavModule, MatButtonModule, MatToolbarModule,
  MatTooltipModule,MatCheckboxModule, MatIconModule, MatListModule, 
  MatAutocompleteModule, MatChipsModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { HttpClientModule } from '@angular/common/http';
import { ResolutorComponent } from './components/resolutor/resolutor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { WordComponent } from './components/word/word.component';
import { ElementsComponent } from './components/elements/elements.component';
import { GameWordComponent } from './components/game.word/game-word.component';
import { HangedGameComponent } from './components/hanged-game/hanged-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ResolutorComponent,
    MenuComponent,
    WordComponent,
    ElementsComponent,
    GameWordComponent,
    HangedGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
