import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpellGameComponent } from '@chem/spell-game/spell-game.component';
import { ResolutorComponent } from '@chem/resolutor/resolutor.component';
import { IndexComponent } from '@main/index/index.component';
import { CalculationGameComponent } from '@math/calculation-game/calculation-game.component';
import { StatisticsComponent } from '@main/statistics/statistics.component';
import { PairGameComponent } from '@chem/pair-game/pair-game.component';
import { PeriodicTableComponent } from '@chem/periodic-table/periodic-table.component';
import { BalancingGameComponent } from '@chem/balancing-game/balancing-game.component';
import { WordSearchComponent } from './general/word-search/components/word-search/word-search.component';
import { WordSearchResultComponent } from './general/word-search/components/word-search-result/word-search-result.component';
import { CrosswordComponent } from './general/crossword/components/crossword/crossword.component';
import { CrosswordResultComponent } from './general/crossword/components/crossword-result/crossword-result.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'spell', component: SpellGameComponent },
  { path: 'pairs', component: PairGameComponent },
  { path: 'balancing', component: BalancingGameComponent },
  { path: 'spell-solver', component: ResolutorComponent },
  { path: 'calculation', component: CalculationGameComponent },
  { path: 'stats', component: StatisticsComponent },
  { path: 'table', component: PeriodicTableComponent },
  { path: 'word-search', component: WordSearchComponent },
  { path: 'word-search-result', component: WordSearchResultComponent },
  { path: 'crossword', component: CrosswordComponent },
  { path: 'crossword-result', component: CrosswordResultComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
