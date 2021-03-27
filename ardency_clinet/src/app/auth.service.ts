import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private nativeStorage: NativeStorage,private router: Router) { }

  public name:BehaviorSubject<string>;

  storeJWT(jwt:any){
    this.nativeStorage.setItem('jwt',jwt);
  }

  getProfile(){
    this.nativeStorage.getItem('jwt').then(data=>{
      var http = new XMLHttpRequest();
      var url = 'http://milsugi.tech:5000/api/user/me';
      
      http.open('GET', url, true);

      
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      http.setRequestHeader('Authorization', data);

      http.onreadystatechange = ()=> {
          if(http.readyState == 4 && http.status == 200) {
              if(JSON.parse(http.responseText)){
                alert(this.name);
                this.name.next(JSON.parse(http.responseText).name);
              }
          }
      }
      http.withCredentials = true;
    });
    
  }

  reigster(name, email, password, living_city, interest){

  }

  login(email,password){
    var http = new XMLHttpRequest();
    var url = 'http://milsugi.tech:5000/api/auth/login';
    var params = 'email='+email+"&password="+password;
    http.open('POST', url, true);

    
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');


    http.onreadystatechange = ()=> {
        if(http.readyState == 4 && http.status == 200) {
            if(JSON.parse(http.responseText).token){
              this.storeJWT(JSON.parse(http.responseText).token);
              this.router.navigate(['/history-map']);
            }
        }else{
          console.log(http.status);
        }
    }
    http.withCredentials = true;
    http.send(params);
  
  }

}
