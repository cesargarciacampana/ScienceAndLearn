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

  ecuation: Ecuation;

  constructor(
    private elementService : ElementService,
    private ecuationHelper: EcuationHelper
  ) { }

  ngOnInit() {
    this.init();
  }

  private init(){
    this.elementService.elementsObservable.subscribe(() => {
      this.ecuation = this.ecuationHelper.parseEcuation('CH4 + O = CO2 + H2O');
    });
  }

  private create(symbol: string, index = 1){
    return new EcuationElement(this.elementService.findElement(symbol), index)
  }
}
