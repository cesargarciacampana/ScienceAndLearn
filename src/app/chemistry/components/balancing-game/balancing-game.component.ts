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

  private ecuationStrings = [
    'H2 + O2 = H2O',
    'N2 + H2 = NH3',
    'CH4 + O = CO2 + H2O',
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
    'Al + HCl = AlCl3 + H2'
  ];
  ecuations: Ecuation[];

  constructor(
    private elementService : ElementService,
    private ecuationHelper: EcuationHelper
  ) { }

  ngOnInit() {
    this.init();
  }

  private init(){
    this.elementService.elementsObservable.subscribe(() => {
      let ecuations = [];
      for (let i = 0; i < this.ecuationStrings.length; i++)
        ecuations.push(this.ecuationHelper.parseEcuation(this.ecuationStrings[i]));
      this.ecuations = ecuations;
    });
  }

  private create(symbol: string, index = 1){
    return new EcuationElement(this.elementService.findElement(symbol), index)
  }
}
