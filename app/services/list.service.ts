import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {List} from '../models/list.model';
import {ApiService} from './api.service';

const ENTITY_NAME = 'lists';

@Injectable()
export class ListService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
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