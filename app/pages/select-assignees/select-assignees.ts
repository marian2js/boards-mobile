import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {Item} from '../../models/item.model';
import {ItemService} from '../../services/item.service';
import {UserList} from '../../components/user-list/user-list';

@Component({
  templateUrl: 'build/pages/select-assignees/select-assignees.html',
  providers: [
    ItemService
  ],
  directives: [
    UserList
  ]
})
export class SelectAssigneesPage {
  private item: Item;
  private board: Board;

  constructor(params: NavParams, private itemService: ItemService) {
    this.item = params.get('item');
    this.board = params.get('board');
  }

  onUserSelected() {
    this.itemService.updateItem(this.item, this.board);
  }
}