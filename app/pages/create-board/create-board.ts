import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {BoardService} from '../../services/board.service';
import {Autofocus} from '../../directives/autofocus/autofocus';

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

  constructor(private navCtrl: NavController, private boardService: BoardService) {
    this.board.verticalRelationEnabled = true;
  }

  /**
   * Create the board and close this modal
   */
  create() {
    this.boardService.createBoard(this.board)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }
}