import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from '@chem/game/game.component';
import { ResolutorComponent } from '@chem/resolutor/resolutor.component';
import { IndexComponent } from '@main/index/index.component';
import { CalculationComponent } from '@math/calculation/calculation.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'spell', component: GameComponent },
  { path: 'solve', component: ResolutorComponent },
  { path: 'calculation', component: CalculationComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
