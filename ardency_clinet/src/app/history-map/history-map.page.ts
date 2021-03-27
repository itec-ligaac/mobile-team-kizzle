import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-history-map',
  templateUrl: './history-map.page.html',
  styleUrls: ['./history-map.page.scss'],
})
export class HistoryMapPage implements OnInit {


  
  constructor(private geolocation: Geolocation) { }


  public location = new BehaviorSubject<[any,any]>([45.759171,21.234150]);
  public zoom = new BehaviorSubject<number>(15);


  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.next([resp.coords.latitude,resp.coords.longitude]);
      this.zoom.next(20);
    });
  }

  ngOnInit() {
  }

 


}
