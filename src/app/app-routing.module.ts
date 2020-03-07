import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpellGameComponent } from '@chem/spell-game/spell-game.component';
import { ResolutorComponent } from '@chem/resolutor/resolutor.component';
import { IndexComponent } from '@main/index/index.component';
import { CalculationGameComponent } from '@math/calculation-game/calculation-game.component';
import { StatisticsComponent } from '@main/statistics/statistics.component';
import { PairGameComponent } from '@chem/pair-game/pair-game.component';
import { PeriodicTableComponent } from '@chem/periodic-table/periodic-table.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'spell', component: SpellGameComponent },
  { path: 'pairs', component: PairGameComponent },
  { path: 'solve', component: ResolutorComponent },
  { path: 'calculation', component: CalculationGameComponent },
  { path: 'stats', component: StatisticsComponent },
  { path: 'table', component: PeriodicTableComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
