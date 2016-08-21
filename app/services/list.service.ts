import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Board} from '../models/board.model';
import {List} from '../models/list.model';
import {ApiService} from './api.service';

const ENTITY_NAME = 'lists';

@Injectable()
export class ListService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
  }

  createList(list: List, board: Board): Promise<List> {
    let url = super.getApiUrl();
    let listData = Object.assign({
      board: board.id
    }, list);
    return super.post(url, listData)
      .then(res => ListService.mapList(res));
  }

  static mapList(data): List {
    let list = new List();
    list.id = data.id;
    list.name = data.name;
    list.position = data.position;
    list.createdAt = data.created_at;
    return list;
  }
}