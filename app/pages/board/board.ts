import {Component} from '@angular/core';
import {NavParams, ModalController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {BoardService} from '../../services/board.service';
import {CreateListPage} from '../create-list/create-list';
import {CreateTaskPage} from '../create-task/create-task';
import {ListElement} from '../../components/list-element/list-element';

@Component({
  templateUrl: 'build/pages/board/board.html',
  directives: [ListElement]
})
export class BoardPage {
  board: Board;

  constructor(navParams: NavParams,
              private modalCtrl: ModalController,
              private boardService: BoardService) {
    this.board = navParams.get('board');
  }

  ionViewWillEnter() {
    this.boardService.populateBoardLists(this.board)
      .then(() => this.boardService.populateBoardTasks(this.board));
  }

  onCreateListPressed() {
    let modal = this.modalCtrl.create(CreateListPage, {
      board: this.board
    });
    modal.present();
  }

  addIconPressed() {
    let modal = this.modalCtrl.create(CreateTaskPage, {
      board: this.board
    });
    modal.present();
  }
}