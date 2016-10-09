import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Item} from '../../models/item.model';
import {Board} from '../../models/board.model';
import {ItemPage} from '../../pages/item/item';

/**
 * Displays an item element
 */
@Component({
  selector: 'item-element',
  templateUrl: 'build/components/item-element/item-element.html'
})
export class ItemElement {
  @Input() item: Item;
  @Input() board: Board;

  constructor(private navCtrl: NavController) {

  }

  /**
   * Open Item Page
   */
  openItem() {
    this.navCtrl.push(ItemPage, {
      item: this.item,
      board: this.board
    });
  }
}