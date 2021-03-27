import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-history-map',
  templateUrl: './history-map.page.html',
  styleUrls: ['./history-map.page.scss'],
})
export class HistoryMapPage implements OnInit {

  
  
  constructor(private geolocation: Geolocation,private auth:AuthService,private router: Router,private nativeStorage:NativeStorage) { }


  public location = new BehaviorSubject<[any,any]>([45.7590576, 21.2336543]);
  public zoom = new BehaviorSubject<number>(6);
  public interest = new BehaviorSubject<string>('3a53df66-b5ad-44f4-b7fe-6753c209fa5f');
  public color = new BehaviorSubject<string>('209, 104, 23');

  public interests=new BehaviorSubject<any>(null);

  loadInterests(){
    this.nativeStorage.getItem('jwt').then(data=>{

      var http = new XMLHttpRequest();
      var url = 'http://milsugi.tech:5000/api/interest/get/';
  
      var location = this.location.getValue();

      var params = 'interest='+this.interest.getValue()+"&lat="+location[0]+"&long="+location[1];
  
      http.open('POST', url, true);
  
      
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.setRequestHeader('Authorization', data);
  
  
      http.onreadystatechange = ()=> {
          if(http.readyState == 4 && http.status == 200) {
              if(JSON.parse(http.responseText)){
                this.interests.next(JSON.parse(http.responseText));
              }
          }else{
            console.log(http.status);
          }
      }
      http.withCredentials = true;
      http.send(params);
  
    });
  }

  editProfile(){
    this.router.navigate(['/profile']);
  }

  locate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.location.next([resp.coords.latitude,resp.coords.longitude]);
      this.zoom.next(15);
    });
  }

  ngOnInit() {
    this.auth.getProfile();
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.zoom.next(20);
      this.interest.next('3a53df66-b5ad-44f4-b7fe-6753c209fa5f');
    },6000);
  }

 


}
