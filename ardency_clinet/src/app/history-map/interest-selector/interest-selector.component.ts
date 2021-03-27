import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'interest-selector',
  templateUrl: './interest-selector.component.html',
  styleUrls: ['./interest-selector.component.scss'],
})
export class InterestSelectorComponent implements OnInit {

  @Input('multiple') public multiple: boolean;
  @Input('selected') public selected: BehaviorSubject<[number]>;



  constructor() { }

  ngOnInit() {}

  select(id:number){
    var selected = this.selected.getValue();
    if(selected.includes(id)==false){
      selected.push(id);
      this.selected.next(selected);
    }
  }


}
