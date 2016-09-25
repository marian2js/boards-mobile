import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Board} from '../models/board.model';
import {List} from '../models/list.model';
import {Item} from '../models/item.model';
import {ApiService} from './api.service';

const ENTITY_NAME = 'items';

@Injectable()
export class ItemService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
  }

  createItem(item: Item, list: List, board: Board): Promise<Item> {
    let url = super.getApiUrl();
    let itemData = Object.assign({
      board: board.id,
      list: list.id,
    }, item);
    return super.post(url, itemData)
      .then(res => ItemService.mapItem(res));
  }

  updateItem(item: Item, list?: List): Promise<Item> {
    let url = super.getApiUrl(item.id);
    let itemData: any = {};
    if (list) {
      itemData.list = list.id;
    }
    itemData = Object.assign(itemData, item);
    return super.put(url, itemData)
      .then(res => ItemService.mapItem(res));
  }

  static mapItem(data): Item {
    let item = new Item();
    item.id = data.id;
    item.name = data.name;
    item.description = data.description;
    item.position = data.position;
    item.createdAt = data.created_at;
    return item;
  }
}