import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild } from '@angular/core';
import { ElementService } from '@chem-shared/services/element.service';
import { ElementDTO } from '@chem-shared/dtos/element.dto';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material';
import { ElementCheckable } from './element.checkable';
import { StringHelper } from '@shared/helpers/string.helper';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {

  private _sortedElements : ElementCheckable[];

  @Input() readonly = false;

  @Output() valueChanged = new EventEmitter<ElementCheckable>();

  @ViewChild('elementInput', {static:false}) elementInput: ElementRef<HTMLInputElement>;

  constructor(
    private elementService : ElementService,
  ) { }

  ngOnInit() {
    this.reset();
  }

  get selectedElements(){
    let list = [];
    for(let i = 0; i < this.sortedElements.length; i++){
      if (this.sortedElements[i].checked)
      list.push(this.sortedElements[i]);
    }
    return list;
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

  get filteredElements() {
    let emptyFilter = !this.elementInput || !this.elementInput.nativeElement.value;

    return this.sortedElements.filter(x => 
      !x.checked 
      && (emptyFilter || StringHelper.removeAccents(x.element.name.toLowerCase()).indexOf(StringHelper.removeAccents(this.elementInput.nativeElement.value.toLowerCase())) >= 0));
  }

  private compare(e1: ElementDTO, e2 : ElementDTO){
    return e1.name.localeCompare(e2.name);
  }

  reset(){
    if (this._sortedElements){
      for(let i = 0; i < this._sortedElements.length; i++){
        let element = this._sortedElements[i];
        element.checked = false;
        element.valid = false;
        element.points = 0;
        element.isClue = false;
      }
    }
  }

  updateElement(elementChk : ElementCheckable, selected: boolean){
    if (elementChk.checked != selected){
      elementChk.checked = selected;
      this.valueChanged.emit(elementChk);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.updateElement(event.option.value, true);
    this.elementInput.nativeElement.value = '';
    this.elementInput.nativeElement.blur();
  }
}
