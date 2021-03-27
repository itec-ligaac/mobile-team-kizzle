import { Component } from '@angular/core';
import {LocationService} from './location.service';
import {AuthService} from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private loc: LocationService,private auth: AuthService,private router: Router) {}

  ngOninit(){
    setInterval(()=>{
      this.loc.sendLocation();
    },1800000);

    this.auth.getProfile();


    this.auth.name.subscribe((val)=>{
      if(val){
        this.router.navigate(['/history-map']);
      }
    });

  }
}
