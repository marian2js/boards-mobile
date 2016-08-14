import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {HomePage} from '../home/home';

@Component({
  templateUrl: 'build/pages/welcome/welcome.html'
})
export class WelcomePage {
  private user: User;

  constructor(private navCtrl: NavController, private userService: UserService) {

  }

  ionViewWillEnter() {
    this.userService.getCurrentUser()
      .then(user => {
        this.user = user;
      });
  }

  /**
   * After everything is save, redirect to HomePage
   */
  save() {
    this.userService.saveCurrentUser()
      .then(() => this.navCtrl.setRoot(HomePage));
  }
}
