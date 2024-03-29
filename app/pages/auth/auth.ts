import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {AuthService} from '../../services/auth.service';

@Component({
  templateUrl: 'build/pages/auth/auth.html'
})
export class AuthPage {
  constructor(private navCtrl: NavController, private authService: AuthService) {

  }

  /**
   * Process Google authentication
   */
  googleLogin() {
    this.authService.processGoogleAuth()
      .then(() => this.completeAuth());
  }

  /**
   * Process Facebook authentication
   */
  facebookLogin() {
    this.authService.processFacebookAuth()
      .then(() => this.completeAuth());
  }

  /**
   * Process Facebook authentication
   */
  githubLogin() {
    this.authService.processGitHubAuth()
      .then(() => this.completeAuth());
  }

  /**
   * On successful authentication, redirect to HomePage
   */
  private completeAuth() {
    this.navCtrl.setRoot(HomePage);
  }
}
