import {Component} from '@angular/core';
import {ViewController} from 'ionic-angular';
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

  constructor(private viewCtrl: ViewController, private boardService: BoardService) {

  }

  /**
   * Create the board and close this modal
   */
  create() {
    this.boardService.createBoard(this.board)
      .then(board => this.viewCtrl.dismiss(board));
  }
}