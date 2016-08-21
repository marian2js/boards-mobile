import {Component} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {List} from '../../models/list.model';
import {ListService} from '../../services/list.service';
import {Autofocus} from '../../directives/autofocus/autofocus';

@Component({
  templateUrl: 'build/pages/create-list/create-list.html',
  providers: [
    ListService
  ],
  directives: [
    Autofocus
  ]
})
export class CreateListPage {
  private list: List = new List();
  private board: Board;
  private customPosition = 1;
  private position;

  constructor(params: NavParams,
              private viewCtrl: ViewController,
              private listService: ListService) {
    this.board = params.get('board');
  }

  /**
   * Create the list and close this modal
   */
  create() {
    switch (this.position) {
      case 'first':
        this.list.position = 0;
        break;
      case 'last':
        this.list.position = this.board.lists.length;
        break;
      case 'custom':
        this.list.position = this.customPosition;
        break;
      default:
        this.list.position = 0;
    }
    this.listService.createList(this.list, this.board)
      .then(list => this.viewCtrl.dismiss(list));
  }
}