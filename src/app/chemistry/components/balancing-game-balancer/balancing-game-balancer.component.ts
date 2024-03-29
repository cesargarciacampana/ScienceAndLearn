import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ecuation } from '@chem-shared/models/ecuation';
import { EcuationHelper } from '@chem-shared/helpers/ecuation.helper';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { EcuationCompound } from '@chem-shared/models/ecuation-compound';

@Component({
  selector: 'app-balancing-game-balancer',
  templateUrl: './balancing-game-balancer.component.html',
  styleUrls: ['./balancing-game-balancer.component.css']
})
export class BalancingGameBalancerComponent implements OnInit {

  @Input() ecuation: Ecuation;
  @Input() graphical = false;
  balanced = false;
  hintUsed = false;
  unbalancedLeft = false;
  unbalancedRight = false;

  leftDragging = false;
  rightDragging = false;

  @Output() next = new EventEmitter<any>()

  constructor(
    private ecuationHelper : EcuationHelper
  ) { }

  ngOnInit() {
    if (this.ecuation)
      this.init();
  }

  init(){
    this.checkBalanced();
    this.hintUsed = false;
  }

  nextClick(){
    this.next.emit();
    const that = this;
    setTimeout(() => that.init(), 50);
  }

  solve(){
    let text = this.ecuation.toString();
    let solved = this.ecuationHelper.getBalancedBruteForce(text);
    if (solved){
      this.ecuation = solved;
      this.hintUsed = true;
      this.checkBalanced();
    }
    else  
      alert('No se ha encontrado solución para la ecuación ' + text);
  }

  drop(event: CdkDragDrop<any>, left: boolean){
    let current = left ? this.ecuation.left : this.ecuation.right;
    let compound = <EcuationCompound>event.item.data;
    for (let i = 0; i < current.length; i++){
      if (current[i].isSame(compound))
      {
        current[i].times += 1;
        this.checkBalanced();
        break;
      }
    }
  }

  removeCompound(compound: EcuationCompound){
    if (!this.balanced && compound.times > 1){
      compound.times--;
      this.checkBalanced();
    }
  }

  checkBalanced(){
    let balance =  this.ecuationHelper.isBalanced(this.ecuation);
    this.balanced = balance == 0;
    this.unbalancedLeft = balance < 0;
    this.unbalancedRight = balance > 0;
  }

  startLeftDrag(active: boolean){
    this.leftDragging = active;
  }

  startRightDrag(active: boolean){
    this.rightDragging = active;
  }

  counterArray(n: number): any[] {
    if (n > 4)
      n = 1;
    return Array(n);
  }
}
