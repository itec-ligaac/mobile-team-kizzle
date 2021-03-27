import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-history-map',
  templateUrl: './history-map.page.html',
  styleUrls: ['./history-map.page.scss'],
})
export class HistoryMapPage implements OnInit {


  
  constructor(private geolocation: Geolocation,private auth:AuthService) { }


  public location = new BehaviorSubject<[any,any]>([70.72849153520343, -24.085683364175395]);
  public zoom = new BehaviorSubject<number>(6);


  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.next([resp.coords.latitude,resp.coords.longitude]);
      this.zoom.next(5);
    });
  }

  ngOnInit() {
    this.auth.getProfile();
    this.auth.name.subscribe((val)=>{
      alert(val);
    });
  }


 


}
