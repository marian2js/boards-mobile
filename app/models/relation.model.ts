import {Item} from './item.model';

export class Relation {
  id: string;
  name: string;
  position: number;
  items: Array<Item> = [];
  createdAt: Date;
}