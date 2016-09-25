import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Printer} from 'ionic-native';
import {Board} from '../models/board.model';
import {Item} from '../models/item.model';
import {ApiService} from './api.service';
import {ListService} from './list.service';
import {ItemService} from './item.service';

const ENTITY_NAME = 'boards';

@Injectable()
export class BoardService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
  }

  createBoard(board: Board): Promise<Board> {
    let url = super.getApiUrl();
    return super.post(url, board)
      .then(res => BoardService.mapBoard(res));
  }

  populateBoardLists(board: Board): Promise<any> {
    let url = super.getApiUrl(board.id, 'lists');
    return super.get(url)
      .then(lists => this.setLists(board, lists));
  }

  populateBoardItems(board: Board): Promise<any> {
    let url = super.getApiUrl(board.id, 'items');
    return super.get(url)
      .then(items => this.setItems(board, items));
  }

  exportPrintableBoard(board: Board): Promise<any> {
    let url = super.getApiUrl(board.id, 'export/printable');
    return super.getFile(url, { format: 'html' })
      .then(file => Printer.print(file, {}));
  }

  importPrintableBoard(board: Board, image) {
    let url = super.getApiUrl(board.id, 'import/printable');
    return super.uploadFile(url, image, 'image')
      .then(res => {
        this.setLists(board, res.lists);
        this.setItems(board, res.items);
      });
  }

  private setLists(board: Board, lists: Array<any>) {
    board.lists = lists.map(list => ListService.mapList(list));
  }

  private setItems(board: Board, items: Array<any>) {
    board.lists.forEach(list => {
      list.items = items
        .filter(item => item.list === list.id)
        .map(item => ItemService.mapItem(item))
        .sort((t1: Item, t2: Item) => t1.position - t2.position);
    });
  }

  static mapBoard(data): Board {
    let board = new Board();
    board.id = data.id;
    board.name = data.name;
    board.createdAt = data.created_at;
    return board;
  }

}