import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {BoardPage} from '../../pages/board/board';

@Component({
  selector: 'board-list',
  templateUrl: 'build/components/board-list/board-list.html'
})
export class BoardList {
  @Input() boards: Array<Board>;

  constructor(private nav: NavController) {

  }

  openBoard(board: Board) {
    this.nav.push(BoardPage, {
      board
    });
  }
}