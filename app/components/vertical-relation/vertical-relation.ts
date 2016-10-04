import {Component, Input} from '@angular/core';
import {Dragula} from 'ng2-dragula/src/app/directives/dragula.directive';
import {Relation} from '../../models/relation.model';
import {Board} from '../../models/board.model';
import {Item} from '../../models/item.model';
import {ItemElement} from '../item-element/item-element';

/**
 * Displays a relation element
 */
@Component({
  selector: 'vertical-relation',
  templateUrl: 'build/components/vertical-relation/vertical-relation.html',
  directives: [ItemElement, Dragula]
})
export class VerticalRelation {
  @Input() relation: Relation;
  @Input() board: Board;
  @Input() items: Array<Item>;

  constructor() {

  }
}