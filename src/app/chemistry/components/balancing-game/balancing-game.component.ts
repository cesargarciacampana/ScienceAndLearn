import { Component, OnInit } from '@angular/core';
import { EcuationElement } from '@chem-shared/models/ecuation-element';
import { ElementService } from '@chem-shared/services/element.service';
import { Ecuation } from '@chem-shared/models/ecuation';
import { EcuationCompound } from '@chem-shared/models/ecuation-compound';
import { EcuationHelper } from '@chem-shared/helpers/ecuation.helper';

@Component({
  selector: 'app-balancing-game',
  templateUrl: './balancing-game.component.html',
  styleUrls: ['./balancing-game.component.css']
})
export class BalancingGameComponent implements OnInit {

/*     
    'NaOH + HCl = NaCl + H2O',
    'S + O2 = SO2',
    'ZnS + O2 = ZnO + SO2',
*/

  private ecuationStrings = [
    'CH4 + O2 = CO2 + H2O',
    'Fe + Cl2 = FeCl3',
    'Mg + HCl = MgCl2 + H2',
    //'Fe2O3 + H2O = Fe(OH)3',
    //'HCl + Ca(OH)2 = CaCl2 + H2O',
    //'Al2O3 + H2SO4 = Al2(SO4)3 + H2O',
    'Cu + H2SO4 = CuSO4 + SO2 + H2O',
    'N2 + O2 = N2O3',
    'Hg + H2SO4 = HgSO4 + H2O + SO2',
    'P + Cl2 = PCl5',
    //'Cu + HNO3 = Cu(NO3)2 + H2O + NO',

    'H2 + O2 = H2O',
    'N2 + H2 = NH3',
    'H2O + Na = NaOH + H2',
    'KClO3 = KCl + O2',
    'BaO2 + HCl = BaCl2 + H2O2',
    'H2SO4 + NaCl = Na2SO4 + HCl',
    'FeS2 = Fe3S4 + S2',
    'H2SO4 + C = H2O + SO2 + CO2',
    'SO2 + O2 = SO3',
    'HCl + MnO2 = MnCl2 + H2O + Cl2',
    'K2CO3 + C = CO + K',
    'Ag2SO4 + NaCl = Na2SO4 + AgCl',
    'NaNO3 + KCl = NaCl + KNO3',
    'Fe2O3 + CO = CO2 + Fe',
    'Na2CO3 + H2O + CO2 = NaHCO3',
    'Cr2O3 + Al = Al2O3 + Cr',
    'Ag + HNO3 = NO + H2O + AgNO3',
    'CuFeS2 + O2 = SO2 + CuO + FeO',
    'C2H6 + O2 = CO2 + H2O',
    'FeS2 + O2 = Fe2O3 + SO2',
    'Zn + HCl = ZnCl2 + H2',
    'Al + HCl = AlCl3 + H2',
    //'CaC2 + H2O = C2H2 + Ca(OH)2',
    //'HCl + Al(OH)3 = AlCl3 + H2O',
    'Fe + O2 = Fe2O3',
    'HBr + NaOH = NaBr + H2O',
    'C6H12O6 + O2 = CO2 + H2O',
  ];
  ecuation: Ecuation;
  emptyEcuation: Ecuation;
  index = -1;

  constructor(
    private elementService : ElementService,
    private ecuationHelper: EcuationHelper
  ) { }

  ngOnInit() {
    this.init();
  }

  private init(){
    this.elementService.elementsObservable.subscribe(() => {
      this.next();
    });
  }

  next(){
    this.index++;
    this.ecuation = this.ecuationHelper.parseEcuation(this.ecuationStrings[this.index]);
  }
}
