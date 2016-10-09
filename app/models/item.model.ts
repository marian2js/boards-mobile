import {User} from './user.model';
import {Relation} from './relation.model';

export class Item {
  id: string;
  name: string;
  description: string;
  position: number;
  createdAt: Date;
  verticalRelation: Relation;
  horizontalRelation: Relation;
  assignees: Array<User> = [];
}