import {Component} from '@angular/core';
import {NavParams, ActionSheetController, NavController} from 'ionic-angular';
import {DragulaService} from 'ng2-dragula/src/app/providers/dragula.provider';
import {Board} from '../../models/board.model';
import {BoardService} from '../../services/board.service';
import {ItemService} from '../../services/item.service';
import {CreateListPage} from '../create-list/create-list';
import {CreateItemPage} from '../create-item/create-item';
import {ListElement} from '../../components/list-element/list-element';
import {PictureService} from '../../services/picture.service';

@Component({
  templateUrl: 'build/pages/board/board.html',
  directives: [ListElement],
  providers: [DragulaService]
})
export class BoardPage {
  board: Board;

  constructor(navParams: NavParams,
              private navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private dragulaService: DragulaService,
              private boardService: BoardService,
              private itemService: ItemService,
              private pictureService: PictureService) {
    this.board = navParams.get('board');

    dragulaService.dropModel.subscribe(args => this.onElementDropped(args));
  }

  ionViewWillEnter() {
    this.boardService.populateBoardLists(this.board)
      .then(() => this.boardService.populateBoardItems(this.board));
  }

  onCreateListPressed() {
    this.navCtrl.push(CreateListPage, {
      board: this.board
    });
  }

  addIconPressed() {
    this.navCtrl.push(CreateItemPage, {
      board: this.board
    });
  }

  /**
   * Fired when an element is dropped in a different position
   */
  private onElementDropped(args) {
    switch (args[0]) {
      case 'items-bag':
        return this.onItemDropped(args.slice(0));
    }
  }

  /**
   * Fired when an item is dropped in a different position
   */
  private onItemDropped(args) {
    let itemId = args[1].dataset.itemId;
    let list;
    let item;

    // Find list and item models
    for (let i = 0; i < this.board.lists.length; i++) {
      let itemIndex;
      list = this.board.lists[i];
      itemIndex = list.items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        item = list.items[itemIndex];
        item.position = itemIndex;
        break;
      }
    }

    this.itemService.updateItem(item, list);
  }

  moreIconPressed() {
    this.actionSheetCtrl.create({
      buttons: [{
        text: 'Upload physical board',
        icon: 'camera',
        handler: () => {
          this.pictureService.getPicture()
            .then(image => this.boardService.importPrintableBoard(this.board, image));
        }
      }, {
        text: 'Print',
        icon: 'print',
        handler: () => {
          this.boardService.exportPrintableBoard(this.board);
        }
      }]
    }).present();
  }
}