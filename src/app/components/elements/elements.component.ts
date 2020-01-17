import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ElementService } from 'src/app/shared/services/element.service';
import { ElementDTO } from 'src/app/shared/dtos/element.dto';
import { MatCheckbox } from '@angular/material/checkbox';
import { ElementCheckable } from './element.checkable';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {

  @Input()
  disableOnCheck : boolean = false;
  private _sortedElements : ElementCheckable[];

  @Output() valueChanged = new EventEmitter<ElementCheckable>();

  constructor(
    private elementService : ElementService,
  ) { }

  ngOnInit() {
    this.reset();
  }

  
  get sortedElements() {
    if (!this._sortedElements && this.elementService.elements)
    {
        let temp = Array.from(this.elementService.elements);
        temp.sort(this.compare);
        this._sortedElements = [];
        for(let i = 0; i < temp.length; i++)
          this._sortedElements.push(new ElementCheckable(temp[i]));
    }
      
    return this._sortedElements;
  }

  private compare(e1: ElementDTO, e2 : ElementDTO){
    return e1.name.localeCompare(e2.name);
  }

  reset(){
    if (this._sortedElements){
      for(let i = 0; i < this._sortedElements.length; i++)
        this._sortedElements[i].checked = false;
    }
  }

  updateElement(chk : MatCheckbox, elementChk : ElementCheckable){
    if (elementChk.checked != chk.checked){
      elementChk.checked = chk.checked;
      this.valueChanged.emit(elementChk);
    }
  }
}
