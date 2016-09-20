import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {Task} from '../../models/task.model';
import {TaskService} from '../../services/task.service';
import {Autofocus} from '../../directives/autofocus/autofocus';

@Component({
  templateUrl: 'build/pages/create-task/create-task.html',
  providers: [
    TaskService
  ],
  directives: [
    Autofocus
  ]
})
export class CreateTaskPage {
  private task: Task = new Task();
  private board: Board;
  private listIndex = 0;

  constructor(params: NavParams,
              private navCtrl: NavController,
              private taskService: TaskService) {
    this.board = params.get('board');
  }

  /**
   * Create the task and close this modal
   */
  create() {
    let list = this.board.lists[this.listIndex];
    this.task.position = list.tasks.length;
    this.taskService.createTask(this.task, list, this.board)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }
}