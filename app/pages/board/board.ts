import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {BoardService} from '../../services/board.service';
import {ListElement} from '../../components/list-element/list-element';

@Component({
  templateUrl: 'build/pages/board/board.html',
  directives: [ListElement]
})
export class BoardPage {
  board: Board;

  constructor(navParams: NavParams, private boardService: BoardService) {
    this.board = navParams.get('board');
  }

  ionViewWillEnter() {
    this.boardService.populateBoardLists(this.board);
  }

}