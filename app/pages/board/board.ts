import {Component} from '@angular/core';
import {NavParams, ActionSheetController, NavController} from 'ionic-angular';
import {DragulaService} from 'ng2-dragula/src/app/providers/dragula.provider';
import {Board} from '../../models/board.model';
import {Relation} from '../../models/relation.model';
import {Item} from '../../models/item.model';
import {BoardService} from '../../services/board.service';
import {ItemService} from '../../services/item.service';
import {PictureService} from '../../services/picture.service';
import {CreateRelationPage} from '../create-relation/create-relation';
import {CreateItemPage} from '../create-item/create-item';
import {VerticalRelation} from '../../components/vertical-relation/vertical-relation';
import {HorizontalRelation} from '../../components/horizontal-relation/horizontal-relation';

@Component({
  templateUrl: 'build/pages/board/board.html',
  directives: [VerticalRelation, HorizontalRelation],
  providers: [DragulaService]
})
export class BoardPage {
  board: Board;
  items = [];
  defaultRelation: Relation;

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
    this.boardService.populateBoard(this.board)
      .then(board => {
        this.board = board;
        return this.boardService.populateBoardRelations(this.board)
      })
      .then(() => this.boardService.populateBoardItems(this.board))
      .then(() => this.prepareBoard());
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
    let item = this.board.items.find(item => item.id === itemId);
    let verticalRelationId;
    let horizontalRelationId;
    if (this.board.horizontalRelationEnabled) {
      let relationIds = args[2].id.split('-');
      verticalRelationId = relationIds[0];
      horizontalRelationId = relationIds[1];
    } else if (this.board.verticalRelationEnabled) {
      verticalRelationId = args[2].id;
    }
    if (verticalRelationId) {
      item.verticalRelation = this.board.verticalRelations
        .find(relation => relation.id === verticalRelationId);
    }
    if (horizontalRelationId) {
      item.horizontalRelation = this.board.horizontalRelations
        .find(relation => relation.id === horizontalRelationId);
    }
    let verticalPosition = item.verticalRelation ? item.verticalRelation.position : 0;
    let horizontalPosition = item.horizontalRelation ? item.horizontalRelation.position : 0;
    let itemsRelation = this.items[verticalPosition][horizontalPosition];
    item.position = itemsRelation.findIndex((it: Item) => item.id === it.id);
    if (item.position === -1) {
      item.position = 0;
    }
    this.itemService.updateItem(item, this.board);
  }

  private prepareBoard() {
    let verticalRelations = [null];
    let horizontalRelations = [null];
    if (this.board.verticalRelationEnabled) {
      verticalRelations = this.board.verticalRelations;
    }
    if (this.board.horizontalRelationEnabled) {
      horizontalRelations = this.board.horizontalRelations;
    }
    this.items = verticalRelations.map(verticalRelation => {
      return horizontalRelations.map(horizontalRelation => {
        return this.board.getItemsByRelation(verticalRelation, horizontalRelation);
      });
    });
    if (!this.board.verticalRelationEnabled) {
      this.defaultRelation = new Relation();
    }
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

  canAddItems() {
    let canAdd = !!this.board;
    if (this.board && this.board.verticalRelationEnabled) {
      canAdd = canAdd && !!this.board.verticalRelations.length;
    }
    if (this.board && this.board.horizontalRelationEnabled) {
      canAdd = canAdd && !!this.board.horizontalRelations.length;
    }
    return canAdd;
  }
}