import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private geolocation: Geolocation,private nativeStorage: NativeStorage) { }

  sendLocation(){
    this.nativeStorage.getItem('jwt').then(
        data => {
          if(data!=null){
            this.geolocation.getCurrentPosition().then((resp) => {
              var http = new XMLHttpRequest();
              var url = 'http://milsugi.tech:5000/api/auth/login';
              var params = 'lat='+resp.coords.latitude+"&long="+resp.coords.longitude;
              http.open('POST', url, true);
              
              http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
              http.setRequestHeader('Authorization', data);
          
              http.withCredentials = true;
              http.send(params);
            
            });
          }
        }  
    );

  }

}
