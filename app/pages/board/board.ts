import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Board} from '../../models/board.model';

@Component({
  templateUrl: 'build/pages/board/board.html'
})
export class BoardPage {
  board: Board;

  constructor(navParams: NavParams) {
    this.board = navParams.get('board');
  }

}