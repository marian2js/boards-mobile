import {Task} from './task.model';

export class List {
  id: string;
  name: string;
  position: number;
  tasks: Array<Task> = [];
  createdAt: Date;
}