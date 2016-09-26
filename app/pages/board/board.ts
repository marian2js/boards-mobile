import {Component} from '@angular/core';
import {NavParams, ActionSheetController, NavController} from 'ionic-angular';
import {DragulaService} from 'ng2-dragula/src/app/providers/dragula.provider';
import {Board} from '../../models/board.model';
import {BoardService} from '../../services/board.service';
import {ItemService} from '../../services/item.service';
import {CreateRelationPage} from '../create-relation/create-relation';
import {CreateItemPage} from '../create-item/create-item';
import {RelationElement} from '../../components/relation-element/relation-element';
import {PictureService} from '../../services/picture.service';

@Component({
  templateUrl: 'build/pages/board/board.html',
  directives: [RelationElement],
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
    this.boardService.populateBoardRelations(this.board)
      .then(() => this.boardService.populateBoardItems(this.board));
  }

  onCreateRelationPressed() {
    this.navCtrl.push(CreateRelationPage, {
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
    let relation;
    let item;

    // Find relation and item models
    for (let i = 0; i < this.board.relations.length; i++) {
      let itemIndex;
      relation = this.board.relations[i];
      itemIndex = relation.items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        item = relation.items[itemIndex];
        item.position = itemIndex;
        break;
      }
    }

    this.itemService.updateItem(item, relation);
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