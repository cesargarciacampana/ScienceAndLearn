import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ecuation } from '@chem-shared/models/ecuation';
import { EcuationHelper } from '@chem-shared/helpers/ecuation.helper';

@Component({
  selector: 'app-balancing-game-balancer',
  templateUrl: './balancing-game-balancer.component.html',
  styleUrls: ['./balancing-game-balancer.component.css']
})
export class BalancingGameBalancerComponent implements OnInit {

  @Input() ecuation: Ecuation;
  @Input() graphical = false;
  balanced = false;

  @Output() next = new EventEmitter<any>()

  constructor(
    private ecuationHelper : EcuationHelper
  ) { }

  ngOnInit() {
  }

  isBalanced(){
    return this.ecuationHelper.isBalanced(this.ecuation);
  }

  nextClick(){
    this.next.emit();
  }
}
