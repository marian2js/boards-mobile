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
  private relationIndex = 0;

  constructor(params: NavParams,
              private navCtrl: NavController,
              private itemService: ItemService) {
    this.board = params.get('board');
  }

  /**
   * Create the item and close this modal
   */
  create() {
    let relation = this.board.relations[this.relationIndex];
    this.item.position = relation.items.length;
    this.itemService.createItem(this.item, relation, this.board)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }
}