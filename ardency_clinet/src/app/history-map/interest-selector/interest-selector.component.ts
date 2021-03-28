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

  public data = [
    {
        "_id": "605f9a3feadfc9d3c6809f18",
        "uid": "3a53df66-b5ad-44f4-b7fe-6753c209fa5f",
        "name": "Sport",
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg",
        "__v": 0,
        "color":"209, 104, 23",
        "color2": "rgb(209, 104, 23)"
    },
    {
        "_id": "605f9aceeadfc9d3c6809f19",
        "uid": "655c772a-aa7a-4c1f-98fb-29930994a3c9",
        "name": "Programmers",
        "image": "https://www.svgrepo.com/show/34496/computer-programmer.svg",
        "__v": 0,
        "color":"73, 230, 0)",
        "color2": "rgb(73, 230, 0)"
    },
    {
        "_id": "605f9af4eadfc9d3c6809f1a",
        "uid": "f4a2cd81-de01-461d-9dea-38a6b5991f74",
        "name": "Gamers",
        "image": "https://www.svgrepo.com/show/27111/game-controller.svg",
        "__v": 0,
        "color":"219, 20, 113",
        "color2": "rgb(219, 20, 113)"
    }
];
  constructor() { }

  ngOnInit() {}



  select(id:string,color:string){
    if(this.selectable){
      this.color.next(color);
      this.selected.next(id);
    }
  }


}
