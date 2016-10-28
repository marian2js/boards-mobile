import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Printer} from 'ionic-native';
import {Board} from '../models/board.model';
import {Item} from '../models/item.model';
import {ApiService} from './api.service';
import {RelationService} from './relation.service';
import {ItemService} from './item.service';
import {TeamService} from './team.service';

const ENTITY_NAME = 'boards';

@Injectable()
export class BoardService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
  }

  createBoard(board: Board): Promise<Board> {
    let url = super.getApiUrl();
    return super.post(url, BoardService.getBoardData(board))
      .then(res => BoardService.mapBoard(res));
  }

  populateBoard(board: Board): Promise<Board> {
    let url = super.getApiUrl(board.id);
    return super.get(url)
      .then(res => BoardService.mapBoard(res));
  }

  populateBoardRelations(board: Board): Promise<any> {
    let url = super.getApiUrl(board.id, 'relations');
    return super.get(url)
      .then(relations => this.setRelations(board, relations));
  }

  populateBoardItems(board: Board): Promise<any> {
    let url = super.getApiUrl(board.id, 'items');
    return super.get(url)
      .then(items => this.setItems(board, items));
  }

  exportBoard(board: Board): Promise<any> {
    let url = super.getApiUrl(board.id, 'export');
    return super.getFile(url, { format: 'html' })
      .then(file => Printer.print(file, {}));
  }

  importBoard(board: Board, image): Promise<any> {
    let url = super.getApiUrl(board.id, 'import');
    return super.uploadFile(url, image, 'image')
      .then(res => {
        this.setRelations(board, res.relations);
        this.setItems(board, res.items);
      });
  }

  getLanguages(): Array<{}> {
    return [{
      key: 'english',
      value: 'English'
    }, {
      key: 'spanish',
      value: 'Spanish'
    }];
  }

  private setRelations(board: Board, relations: Array<any>) {
    relations = relations.map(relation => RelationService.mapRelation(relation));
    board.verticalRelations = relations.filter(relation => relation.type === 'vertical');
    board.horizontalRelations = relations.filter(relation => relation.type === 'horizontal');
  }

  private setItems(board: Board, items: Array<any>) {
    board.items = items
      .map(item => ItemService.mapItem(item, board))
      .sort((t1: Item, t2: Item) => t1.position - t2.position);
  }

  static mapBoard(data): Board {
    let board = new Board();
    board.id = data.id;
    board.name = data.name;
    board.team = data.team;
    board.createdAt = data.created_at;
    board.verticalRelationEnabled = data.vertical_relation;
    board.horizontalRelationEnabled = data.horizontal_relation;
    board.language = data.language;
    if (data.team && data.team.id) {
      board.team = TeamService.mapTeam(data.team);
    } else if (data.team) {
      board.team = data.team;
    }
    return board;
  }

  static getBoardData(board: Board) {
    let data: any = {
      name: board.name,
      vertical_relation: board.verticalRelationEnabled,
      horizontal_relation: board.horizontalRelationEnabled,
      language: board.language
    };
    if (board.team && board.team.id) {
      data.team = board.team.id;
    }
    return data;
  }

}