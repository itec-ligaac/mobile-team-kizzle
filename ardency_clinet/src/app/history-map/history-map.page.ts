import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-map',
  templateUrl: './history-map.page.html',
  styleUrls: ['./history-map.page.scss'],
})
export class HistoryMapPage implements OnInit {


  
  constructor(private geolocation: Geolocation,private auth:AuthService,private router: Router) { }


  public location = new BehaviorSubject<[any,any]>([70.72849153520343, -24.085683364175395]);
  public zoom = new BehaviorSubject<number>(6);

  editProfile(){
    this.router.navigate(['/profile']);
  }

  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("test");
      this.location.next([resp.coords.latitude,resp.coords.longitude]);
      this.zoom.next(5);
    });
  }

  ngOnInit() {
    this.auth.getProfile();
    
    this.locate();

  }


 


}
