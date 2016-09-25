import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Item} from '../../models/item.model';

@Component({
  templateUrl: 'build/pages/item/item.html'
})
export class ItemPage {
  item: Item;
  nameEditable: boolean = false;

  constructor(navParams: NavParams) {
    this.item = navParams.get('item');
  }

  toggleNameEditable() {
    this.nameEditable = !this.nameEditable;
  }

}