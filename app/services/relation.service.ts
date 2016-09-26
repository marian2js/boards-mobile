import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Board} from '../models/board.model';
import {Relation} from '../models/relation.model';
import {ApiService} from './api.service';

const ENTITY_NAME = 'relations';

@Injectable()
export class RelationService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
  }

  createRelation(relation: Relation, board: Board): Promise<Relation> {
    let url = super.getApiUrl();
    let relationData = Object.assign({
      board: board.id
    }, relation);
    return super.post(url, relationData)
      .then(res => RelationService.mapRelation(res));
  }

  static mapRelation(data): Relation {
    let relation = new Relation();
    relation.id = data.id;
    relation.name = data.name;
    relation.position = data.position;
    relation.createdAt = data.created_at;
    return relation;
  }
}