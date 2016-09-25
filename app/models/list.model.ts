import {Item} from './item.model';

export class List {
  id: string;
  name: string;
  position: number;
  items: Array<Item> = [];
  createdAt: Date;
}