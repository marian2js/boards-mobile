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
  private verticalRelationIndex = 0;
  private horizontalRelationIndex = 0;

  constructor(params: NavParams,
              private navCtrl: NavController,
              private itemService: ItemService) {
    this.board = params.get('board');
  }

  /**
   * Create the item and close this modal
   */
  create() {
    if (this.board.verticalRelationEnabled) {
      this.item.verticalRelation = this.board.verticalRelations[this.verticalRelationIndex];
    }
    if (this.board.horizontalRelationEnabled) {
      this.item.horizontalRelation = this.board.horizontalRelations[this.horizontalRelationIndex];
    }
    this.itemService.createItem(this.item, this.board)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }
}