import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpellGameComponent } from '@chem/spell-game/spell-game.component';
import { ResolutorComponent } from '@chem/resolutor/resolutor.component';
import { IndexComponent } from '@main/index/index.component';
import { CalculationGameComponent } from '@math/calculation-game/calculation-game.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'spell', component: SpellGameComponent },
  { path: 'solve', component: ResolutorComponent },
  { path: 'calculation', component: CalculationGameComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
