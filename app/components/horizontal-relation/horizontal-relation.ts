import {Component, Input} from '@angular/core';
import {Dragula} from 'ng2-dragula/src/app/directives/dragula.directive';
import {Relation} from '../../models/relation.model';
import {Board} from '../../models/board.model';
import {ItemElement} from '../item-element/item-element';

/**
 * Displays a relation element
 */
@Component({
  selector: 'horizontal-relation',
  templateUrl: 'build/components/horizontal-relation/horizontal-relation.html',
  directives: [ItemElement, Dragula]
})
export class HorizontalRelation {
  @Input() relation: Relation;
  @Input() board: Board;

  constructor() {

  }
}