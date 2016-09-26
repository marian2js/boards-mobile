import {Relation} from './relation.model';

export class Board {
  id: string;
  name: string;
  relations: Array<Relation> = [];
  createdAt: Date;
}