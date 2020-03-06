import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatInputModule, MatSidenavModule, MatButtonModule, MatToolbarModule,
  MatTooltipModule,MatCheckboxModule, MatIconModule, MatListModule, 
  MatAutocompleteModule, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule,
  MatBottomSheetModule, MatSelectModule, MatTableModule, MatExpansionModule,
  MatRadioModule
} from '@angular/material';

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
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './main/components/login/login.component';
import { StatisticsComponent } from './main/components/statistics/statistics.component';
import { StatisticsTableComponent } from './main/components/statistics-table/statistics-table.component';
import { PairGameComponent } from './chemistry/components/pair-game/pair-game.component';
import { TimerComponent } from './main/components/timer/timer.component';
import { PairGameOptionsComponent } from './chemistry/components/pair-game-options/pair-game-options.component';
import { FormsModule } from '@angular/forms';
import { ElementCellComponent } from './chemistry/components/element-cell/element-cell.component';

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
    ElementCellComponent
  ],
  imports: [
	FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

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
	MatRadioModule
  ],
  entryComponents: [
    SpellGameOptionsComponent,
    PairGameOptionsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
