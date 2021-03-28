import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild("name") public name: ElementRef;


  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.auth.getProfile();
    this.auth.name.subscribe((val)=>{
      this.name.nativeElement.innerText = "Welcome, "+ val+"!";
    });
  }

}
