import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'interest-selector',
  templateUrl: './interest-selector.component.html',
  styleUrls: ['./interest-selector.component.scss'],
})
export class InterestSelectorComponent implements OnInit {

  @Input('selectable') public selectable: boolean;
  @Input('interests') public interests: BehaviorSubject<any>;


  @Input('selected') public selected: any;
  @Input('color') public color: any;

  @ViewChild("selector") public selector: ElementRef;


  constructor() { }

  ngOnInit() {
    this.interests.subscribe((val)=>{
      if(val){
        this.load(val);
      }
    });
  }

  load(data){
    console.log(data);
    this.selector.nativeElement.innerHTML+='<div class="item" [class.selected]="selected.getValue()=='+data.messsage.uid+'" (click)="select('+data.messsage.uid+','+data.messsage.color+')" style.background="background:rgb('+data.messsage.color+')" ></div>';
  }

  select(id:string,color:string){
    if(this.selectable){
      this.color.next(color);
      this.selected.next(id);
    }
  }


}
