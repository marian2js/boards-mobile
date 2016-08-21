import {Component, Input} from '@angular/core';
import {Task} from '../../models/task.model';

/**
 * Displays a task element
 */
@Component({
  selector: 'task-element',
  templateUrl: 'build/components/task-element/task-element.html'
})
export class TaskElement {
  @Input() task: Task;

  constructor() {

  }
}