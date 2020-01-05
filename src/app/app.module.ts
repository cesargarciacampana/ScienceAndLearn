import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { HttpClientModule } from '@angular/common/http';
import { ResolutorComponent } from './components/resolutor/resolutor.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ResolutorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
