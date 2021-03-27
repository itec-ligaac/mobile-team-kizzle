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
              //request at api
            });
          }
        }  
    );

  }

}
