import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { HangedGameComponent } from './components/hanged-game/hanged-game.component';
import { ResolutorComponent } from './components/resolutor/resolutor.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'hanged', component: HangedGameComponent },
  { path: 'solve', component: ResolutorComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
