import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {AuthPage} from '../auth/auth';
import {WelcomePage} from '../welcome/welcome';

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

        // If the user is new, go to welcome page
        if (user.isNew()) {
          return this.navCtrl.setRoot(WelcomePage);
        }

        this.user = user;
      });
  }
}
