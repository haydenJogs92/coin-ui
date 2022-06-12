import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'coin-ui';
  year = new Date().getFullYear();
  userId: number;
  
  constructor(private us: UserService) {
    this.userId = this.us.getUserId()
    console.log('user id', this.userId);
  }

}
