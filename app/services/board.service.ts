import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Printer} from 'ionic-native';
import {Board} from '../models/board.model';
import {Task} from '../models/task.model';
import {ApiService} from './api.service';
import {ListService} from './list.service';
import {TaskService} from './task.service';

const ENTITY_NAME = 'boards';

@Injectable()
export class BoardService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
  }

  createBoard(board: Board): Promise<Board> {
    let url = super.getApiUrl();
    return super.post(url, board)
      .then(res => BoardService.mapBoard(res));
  }

  populateBoardLists(board: Board): Promise<any> {
    let url = super.getApiUrl(board.id, 'lists');
    return super.get(url)
      .then(lists => {
        board.lists = lists.map(list => ListService.mapList(list));
      });
  }

  populateBoardTasks(board: Board): Promise<any> {
    let url = super.getApiUrl(board.id, 'tasks');
    return super.get(url)
      .then(tasks => {
        board.lists.forEach(list => {
          list.tasks = tasks
            .filter(task => task.list === list.id)
            .map(task => TaskService.mapTask(task))
            .sort((t1: Task, t2: Task) => t1.position - t2.position);
        });
      });
  }

  exportPrintableBoard(board: Board): Promise<any> {
    let url = super.getApiUrl(board.id, 'export/printable');
    return super.getFile(url, { format: 'html' })
      .then(file => Printer.print(file, {}));
  }

  static mapBoard(data): Board {
    let board = new Board();
    board.id = data.id;
    board.name = data.name;
    board.createdAt = data.created_at;
    return board;
  }

}