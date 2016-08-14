import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {AuthPage} from '../auth/auth';
import {BoardPage} from '../board/board';
import {CreateBoardPage} from '../create-board/create-board';
import {WelcomePage} from '../welcome/welcome';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private user: User;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController,
              private userService: UserService) {

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

  /**
   * Open a modal for creating a new board
   */
  addIconTapped() {
    let modal = this.modalCtrl.create(CreateBoardPage);
    modal.onDidDismiss(board => this.openBoard(board));
    modal.present();
  }

  /**
   * Open a Board Page view
   */
  openBoard(board) {
    this.navCtrl.push(BoardPage, {
      board
    });
  }
}
