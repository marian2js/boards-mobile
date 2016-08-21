import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Board} from '../models/board.model';
import {List} from '../models/list.model';
import {Task} from '../models/task.model';
import {ApiService} from './api.service';

const ENTITY_NAME = 'tasks';

@Injectable()
export class TaskService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
  }

  createTask(task: Task, list: List, board: Board): Promise<Task> {
    let url = super.getApiUrl();
    let taskData = Object.assign({
      board: board.id,
      list: list.id,
    }, task);
    return super.post(url, taskData)
      .then(res => TaskService.mapTask(res));
  }

  updateTask(task: Task, list?: List): Promise<Task> {
    let url = super.getApiUrl(task.id);
    let taskData: any = {};
    if (list) {
      taskData.list = list.id;
    }
    taskData = Object.assign(taskData, task);
    return super.put(url, taskData)
      .then(res => TaskService.mapTask(res));
  }

  static mapTask(data): Task {
    let task = new Task();
    task.id = data.id;
    task.name = data.name;
    task.description = data.description;
    task.position = data.position;
    task.createdAt = data.created_at;
    return task;
  }
}