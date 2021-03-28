import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private email: string;
  private password: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  login(){
    if(this.email != null && this.password != null){
      this.auth.login(this.email,this.password);
    }
  }

}
