import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Board} from '../models/board.model';
import {Item} from '../models/item.model';
import {ApiService} from './api.service';
import {RelationService} from './relation.service';

const ENTITY_NAME = 'items';

@Injectable()
export class ItemService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
  }

  createItem(item: Item, board: Board): Promise<Item> {
    let url = super.getApiUrl();
    let data: any = {
      board: board.id
    };
    if (item.verticalRelation && item.verticalRelation.id) {
      data.vertical_relation = item.verticalRelation.id;
    }
    if (item.horizontalRelation && item.horizontalRelation.id) {
      data.horizontal_relation = item.horizontalRelation.id;
    }
    let itemData = Object.assign(data, item);
    return super.post(url, itemData)
      .then(res => ItemService.mapItem(res, board));
  }

  updateItem(item: Item, board: Board): Promise<Item> {
    let url = super.getApiUrl(item.id);
    return super.put(url, ItemService.getItemData(item))
      .then(res => ItemService.mapItem(res, board));
  }

  populateItem(item: Item, board: Board): Promise<Item> {
    let url = super.getApiUrl(item.id);
    return super.get(url)
      .then(res => ItemService.mapItem(res, board));
  }

  static mapItem(data, board: Board): Item {
    let item = new Item();
    item.id = data.id;
    item.name = data.name;
    item.description = data.description;
    item.position = data.position;
    item.createdAt = data.created_at;
    if (data.vertical_relation) {
      item.verticalRelation = board.verticalRelations
        .find(relation => relation.id === data.vertical_relation);
    }
    if (data.horizontal_relation) {
      item.horizontalRelation = board.horizontalRelations
        .find(relation => relation.id === data.horizontal_relation);
    }
    if (data.assignees && board.team) {
      item.assignees = data.assignees.map(userId => {
        return board.team.getUsers().find(user => user.id === userId);
      });
    }
    if (data.link_relation && data.link_relation.id) {
      item.linkRelation = RelationService.mapRelation(data.link_relation);
    } else if (data.link_relation) {
      item.linkRelation = data.link_relation;
    }
    if (data.link_relation_items && data.link_relation_items.length) {
      item.linkRelationItems = data.link_relation_items
        .map(itemData => ItemService.mapItem(itemData, board));
    }
    return item;
  }

  static getItemData(item: Item) {
    let data:any = {
      name: item.name,
      description: item.description,
      position: item.position
    };
    if (item.verticalRelation && item.verticalRelation.id) {
      data.vertical_relation = item.verticalRelation.id;
    }
    if (item.horizontalRelation && item.horizontalRelation.id) {
      data.horizontal_relation = item.horizontalRelation.id;
    }
    if (item.assignees) {
      data.assignees = item.assignees.map(user => user.id);
    }
    if (item.linkRelation) {
      data.link_relation = item.linkRelation.id || item.linkRelation;
    }
    return data;
  }
}