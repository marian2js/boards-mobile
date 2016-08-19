import {List} from './list.model';

export class Board {
  id: string;
  name: string;
  lists: Array<List> = [];
  createdAt: Date;
}