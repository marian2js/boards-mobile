import {Component} from '@angular/core';
import {NavParams, NavController, ActionSheetController} from 'ionic-angular';
import {Item} from '../../models/item.model';
import {Board} from '../../models/board.model';
import {ItemService} from '../../services/item.service';
import {SelectAssigneesPage} from '../select-assignees/select-assignees';
import {LinkItemPage} from '../link-item/link-item';
import {UserList} from '../../components/user-list/user-list';

@Component({
  templateUrl: 'build/pages/item/item.html',
  directives: [UserList]
})
export class ItemPage {
  item: Item;
  board: Board;
  nameEditable: boolean = false;

  constructor(navParams: NavParams,
              private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private itemService: ItemService) {
    this.item = navParams.get('item');
    this.board = navParams.get('board');
  }

  ionViewWillEnter() {
    this.itemService.populateItem(this.item, this.board)
      .then(item => this.item = item);
  }

  toggleNameEditable() {
    this.nameEditable = !this.nameEditable;
  }

  openSelectAssignees() {
    this.navCtrl.push(SelectAssigneesPage, {
      item: this.item,
      board: this.board
    });
  }

  moreIconPressed() {
    this.actionSheetCtrl.create({
      buttons: [{
        text: 'Link with relation',
        icon: 'link',
        handler: () => {
          this.navCtrl.push(LinkItemPage, {
            item: this.item
          });
        }
      }]
    }).present();
  }

  linkItemSelected(item: Item) {
    this.navCtrl.push(ItemPage, {
      item: item,
      board: this.board
    });
  }

}
