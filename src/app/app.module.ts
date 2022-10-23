import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpellGameComponent } from '@chem/spell-game/spell-game.component';
import { HttpClientModule } from '@angular/common/http';
import { ResolutorComponent } from '@chem/resolutor/resolutor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from '@main/menu/menu.component';
import { WordComponent } from '@chem/word/word.component';
import { ElementSelectorComponent } from '@chem/element-selector/element-selector.component';
import { SpellGameWordComponent } from '@chem/spell-game-word/spell-game-word.component';
import { IndexComponent } from './main/components/index/index.component';
import { CalculationComponent } from './mathematics/components/calculation/calculation.component';
import { CalculationGameComponent } from './mathematics/components/calculation-game/calculation-game.component';
import { FormatTimePipe } from '@shared/pipes/format-time.pipe';
import { SpellGameOptionsComponent } from './chemistry/components/spell-game-options/spell-game-options.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './main/components/login/login.component';
import { StatisticsComponent } from './main/components/statistics/statistics.component';
import { StatisticsTableComponent } from './main/components/statistics-table/statistics-table.component';
import { PairGameComponent } from './chemistry/components/pair-game/pair-game.component';
import { TimerComponent } from './main/components/timer/timer.component';
import { PairGameOptionsComponent } from './chemistry/components/pair-game-options/pair-game-options.component';
import { FormsModule } from '@angular/forms';
import { ElementCellComponent } from './chemistry/components/element-cell/element-cell.component';
import { PeriodicTableComponent } from './chemistry/components/periodic-table/periodic-table.component';
import { ElementInfoComponent } from './chemistry/components/element-info/element-info.component';
import { BalancingGameComponent } from './chemistry/components/balancing-game/balancing-game.component';
import { EcuationComponent } from './chemistry/components/ecuation/ecuation.component';
import { CompoundComponent } from './chemistry/components/compound/compound.component';
import { BalancingGameBalancerComponent } from './chemistry/components/balancing-game-balancer/balancing-game-balancer.component';
import { ElementService } from '@chem-shared/services/element.service';
import { BalancingGameOptionsComponent } from './chemistry/components/balancing-game-options/balancing-game-options.component';
import { WordSearchComponent } from './general/word-search/components/word-search/word-search.component';
import { WordGridComponent } from './general/word-search/components/word-grid/word-grid.component';
import { WordSearchResultComponent } from './general/word-search/components/word-search-result/word-search-result.component';
import { WordSearchOptionsComponent } from './general/word-search/components/word-search-options/word-search-options.component';

@NgModule({
    declarations: [
        AppComponent,
        SpellGameComponent,
        ResolutorComponent,
        MenuComponent,
        WordComponent,
        ElementSelectorComponent,
        SpellGameWordComponent,
        IndexComponent,
        CalculationComponent,
        CalculationGameComponent,
        FormatTimePipe,
        SpellGameOptionsComponent,
        LoginComponent,
        StatisticsComponent,
        StatisticsTableComponent,
        PairGameComponent,
        TimerComponent,
        PairGameOptionsComponent,
        ElementCellComponent,
        PeriodicTableComponent,
        ElementInfoComponent,
        BalancingGameComponent,
        EcuationComponent,
        CompoundComponent,
        BalancingGameBalancerComponent,
        BalancingGameOptionsComponent,
        WordSearchComponent,
        WordGridComponent,
        WordSearchResultComponent,
        WordSearchOptionsComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        DragDropModule,
        MatInputModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatIconModule,
        MatListModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatBottomSheetModule,
        MatSelectModule,
        MatTableModule,
        MatExpansionModule,
        MatRadioModule,
        MatBadgeModule,
		MatDialogModule,
		MatSliderModule
    ],
    providers: [
        ElementService,
        { provide: APP_INITIALIZER, useFactory: (elementService: ElementService) => () => elementService.load(), deps: [ElementService], multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
