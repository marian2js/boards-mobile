import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Board} from '../models/board.model';
import {List} from '../models/list.model';
import {ApiService} from './api.service';
import {ListService} from './list.service';

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
      .then(lists => {
        board.lists = lists.map(list => ListService.mapList(list));
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