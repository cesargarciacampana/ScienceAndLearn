import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ecuation } from '@chem-shared/models/ecuation';
import { EcuationHelper } from '@chem-shared/helpers/ecuation.helper';
import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
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
      this.checkBalanced();
  }

  nextClick(){
    this.next.emit();
    const that = this;
    setTimeout(() => that.checkBalanced(), 50);
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
    return Array(n);
  }
}
