import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {Task} from '../../models/task.model';

@Component({
  templateUrl: 'build/pages/task/task.html'
})
export class TaskPage {
  task: Task;

  constructor(navParams: NavParams) {
    this.task = navParams.get('task');
  }

}