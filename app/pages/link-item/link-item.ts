import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {Item} from '../../models/item.model';
import {UserService} from '../../services/user.service';
import {BoardService} from '../../services/board.service';
import {ItemService} from '../../services/item.service';
import {Relation} from '../../models/relation.model';

@Component({
  templateUrl: 'build/pages/link-item/link-item.html',
})
export class LinkItemPage {
  private item: Item;
  private boards: Array<Board> = [];
  private relations: Array<Relation> = [];
  private boardIndex: number;
  private relationIndex: number;

  constructor(params: NavParams,
              private navCtrl: NavController,
              private userService: UserService,
              private boardService: BoardService,
              private itemService: ItemService) {
    this.item = params.get('item');
  }

  ionViewWillEnter() {
    this.userService.getUserBoards()
      .then(boards => this.boards = boards);
  }

  onBoardChanged() {
    let board = this.boards[this.boardIndex];
    this.boardService.populateBoardRelations(board)
      .then(() => {
        this.relations = [];
        if (board.verticalRelationEnabled && board.verticalRelations) {
          this.relations = this.relations.concat(board.verticalRelations);
        }
        if (board.horizontalRelationEnabled && board.horizontalRelations) {
          this.relations = this.relations.concat(board.horizontalRelations);
        }
      });
  }

  onRelationChange() {
    let board = this.boards[this.boardIndex];
    this.item.linkRelation = this.relations[this.relationIndex];
    this.itemService.updateItem(this.item, board)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }

}
