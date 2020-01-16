import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ElementService } from 'src/app/shared/services/element.service';
import { ElementDTO } from 'src/app/shared/dtos/element.dto';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {

  checkedElements : String[];
  private _sortedElements : ElementDTO[];

  @Output() valueChanged = new EventEmitter<any>();

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
        this._sortedElements = temp;
    }
      
    return this._sortedElements;
  }

  private compare(e1: ElementDTO, e2 : ElementDTO){
    return e1.name.localeCompare(e2.name);
  }

  reset(){
    this.checkedElements = [];
  }

  selectElement(chk : MatCheckbox, element : ElementDTO){ 
    if (chk.disabled)
      return;

    this.valueChanged.emit({checked: chk.checked, element: element});

    this.checkedElements.push(element.name);
  }
  
  isElementChecked(name : String){
    return this.checkedElements.includes(name);
  }
}
