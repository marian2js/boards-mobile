import {Component, Input} from '@angular/core';
import {Dragula} from 'ng2-dragula/src/app/directives/dragula.directive';
import {Relation} from '../../models/relation.model';
import {ItemElement} from '../item-element/item-element';

/**
 * Displays a relation element
 */
@Component({
  selector: 'relation-element',
  templateUrl: 'build/components/relation-element/relation-element.html',
  directives: [ItemElement, Dragula]
})
export class RelationElement {
  @Input() relation: Relation;

  constructor() {

  }
}