import {Component} from '@angular/core';
import {NavController, ActionSheetController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {AuthPage} from '../auth/auth';
import {BoardPage} from '../board/board';
import {CreateBoardPage} from '../create-board/create-board';
import {WelcomePage} from '../welcome/welcome';
import {BoardList} from '../../components/board-list/board-list';
import {TeamsPage} from '../teams-page/teams-page';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [BoardList]
})
export class HomePage {
  private user: User;
  boards: Array<Board> = [];

  constructor(private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
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
        return this.userService.getUserBoards();
      })
      .then(boards => this.boards = boards);
  }

  /**
   * Open a modal for creating a new board
   */
  addIconTapped() {
    this.navCtrl.push(CreateBoardPage);
  }

  /**
   * Open a Board Page view
   */
  openBoard(board) {
    this.navCtrl.push(BoardPage, {
      board
    });
  }

  moreIconPressed() {
    this.actionSheetCtrl.create({
      buttons: [{
        text: 'Teams',
        icon: 'people',
        handler: () => {
          this.navCtrl.push(TeamsPage);
        }
      }]
    }).present();
  }
}
