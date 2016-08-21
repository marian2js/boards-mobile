import {Component, Input} from '@angular/core';
import {List} from '../../models/list.model';
import {TaskElement} from '../task-element/task-element';

/**
 * Displays a list element
 */
@Component({
  selector: 'list-element',
  templateUrl: 'build/components/list-element/list-element.html',
  directives: [TaskElement]
})
export class ListElement {
  @Input() list: List;

  constructor() {

  }
}