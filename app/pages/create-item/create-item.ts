import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {Item} from '../../models/item.model';
import {ItemService} from '../../services/item.service';
import {Autofocus} from '../../directives/autofocus/autofocus';

@Component({
  templateUrl: 'build/pages/create-item/create-item.html',
  providers: [
    ItemService
  ],
  directives: [
    Autofocus
  ]
})
export class CreateItemPage {
  private item: Item = new Item();
  private board: Board;
  private listIndex = 0;

  constructor(params: NavParams,
              private navCtrl: NavController,
              private itemService: ItemService) {
    this.board = params.get('board');
  }

  /**
   * Create the item and close this modal
   */
  create() {
    let list = this.board.lists[this.listIndex];
    this.item.position = list.items.length;
    this.itemService.createItem(this.item, list, this.board)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }
}