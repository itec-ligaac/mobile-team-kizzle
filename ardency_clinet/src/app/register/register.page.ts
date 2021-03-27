import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private email: string;
  private password: string;


  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  register(){
    if(this.email != null && this.password != null){
      //pass
    }
  }

}
