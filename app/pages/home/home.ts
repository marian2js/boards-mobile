import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {AuthPage} from '../auth/auth';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private user: User;

  constructor(private navCtrl: NavController, private userService: UserService) {

  }

  ionViewWillEnter() {
    this.userService.getCurrentUser()
      .then(user => {
        // If the user is not authenticated, go to authentication page
        if (!user) {
          return this.navCtrl.setRoot(AuthPage);
        }

        this.user = user;
      });
  }
}
