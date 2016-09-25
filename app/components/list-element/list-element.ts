import {Component, Input} from '@angular/core';
import {Dragula} from 'ng2-dragula/src/app/directives/dragula.directive';
import {List} from '../../models/list.model';
import {ItemElement} from '../item-element/item-element';

/**
 * Displays a list element
 */
@Component({
  selector: 'list-element',
  templateUrl: 'build/components/list-element/list-element.html',
  directives: [ItemElement, Dragula]
})
export class ListElement {
  @Input() list: List;

  constructor() {

  }
}