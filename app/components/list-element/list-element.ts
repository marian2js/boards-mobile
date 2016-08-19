import {Component, Input} from '@angular/core';
import {List} from '../../models/list.model';

/**
 * Displays a list element
 */
@Component({
  selector: 'list-element',
  templateUrl: 'build/components/list-element/list-element.html'
})
export class ListElement {
  @Input() list: List;

  constructor() {

  }
}