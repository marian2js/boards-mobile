import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Task} from '../../models/task.model';
import {TaskPage} from '../../pages/task/task';

/**
 * Displays a task element
 */
@Component({
  selector: 'task-element',
  templateUrl: 'build/components/task-element/task-element.html'
})
export class TaskElement {
  @Input() task: Task;

  constructor(private navCtrl: NavController) {

  }

  /**
   * Open Task Page
   */
  openTask() {
    this.navCtrl.push(TaskPage, {
      task: this.task
    });
  }
}