import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {Team} from '../../models/team.model';
import {BoardService} from '../../services/board.service';
import {Autofocus} from '../../directives/autofocus/autofocus';
import {UserService} from '../../services/user.service';

@Component({
  templateUrl: 'build/pages/create-board/create-board.html',
  providers: [
    BoardService
  ],
  directives: [
    Autofocus
  ]
})
export class CreateBoardPage {
  private board: Board = new Board();
  private teams: Array<Team> = [];
  private teamIndex = "-1";

  constructor(private navCtrl: NavController,
              private boardService: BoardService,
              private userService: UserService) {
    this.board.verticalRelationEnabled = true;
  }

  ionViewWillEnter() {
    this.userService.getUserTeams()
      .then(teams => this.teams = teams);
  }

  /**
   * Create the board and close this modal
   */
  create() {
    this.board.team = this.teams[parseInt(this.teamIndex)];
    this.boardService.createBoard(this.board)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }
}