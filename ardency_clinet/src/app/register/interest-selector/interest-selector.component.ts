import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'interest-selector',
  templateUrl: './interest-selector.component.html',
  styleUrls: ['./interest-selector.component.scss'],
})
export class InterestSelectorComponent implements OnInit {

  @Input('multiple') public multiple: boolean;

  private selected = [];
  private interests = [{"id":1,"name":"test","color":"red"},{"id":2,"name":"test2","color":"blue"},{"id":3,"name":"test2","color":"pink"}]


  constructor() { }

  ngOnInit() {}

  select(id:number){
    if(this.multiple==true){
      if(this.selected.includes(id)==false){
        this.selected.push(id);
      }else{
        var index = this.selected.indexOf(id);
        this.selected.splice(index, 1);
      }
    }else{
      this.selected = [id];
    }
  }


}
