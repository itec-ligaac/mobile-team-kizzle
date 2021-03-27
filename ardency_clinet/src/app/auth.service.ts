import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private nativeStorage: NativeStorage) { }

  storeJWT(jwt:any){
    this.nativeStorage.setItem('jwt',jwt);
  }

  reigster(name, email, password, living_city, interest){
    var jwt;
    //make request
    this.storeJWT(jwt);
  }

  login(email,password){
    var jwt;
    //make request
    this.storeJWT(jwt);
  }

  getProfile(){

  }


}
