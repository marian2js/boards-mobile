import {Relation} from './relation.model';
import {Item} from './item.model';

export class Board {
  id: string;
  name: string;
  verticalRelations: Array<Relation> = [];
  horizontalRelations: Array<Relation> = [];
  verticalRelationEnabled: boolean;
  horizontalRelationEnabled: boolean;
  items: Array<Item> = [];
  createdAt: Date;

  getItemsByRelation(verticalRelation: Relation, horizontalRelation: Relation): Array<Item> {
    let items = this.items;
    if (verticalRelation) {
      items = items
        .filter(item => item.verticalRelation && item.verticalRelation.id === verticalRelation.id);
    }
    if (horizontalRelation) {
      items = items
        .filter(item => item.horizontalRelation && item.horizontalRelation.id === horizontalRelation.id);
    }
    return items;
  }

  getMaxItemsPerHorizontalRelation(horizontalRelation: Relation): number {
    let verticalRelations;
    if (this.verticalRelationEnabled) {
      verticalRelations = this.verticalRelations;
    } else {
      verticalRelations = [null];
    }
    return verticalRelations.reduce((prev, curr) => {
      let total = this.getItemsByRelation(curr, horizontalRelation).length;
      return Math.max(total, prev);
    }, 0);
  }
}