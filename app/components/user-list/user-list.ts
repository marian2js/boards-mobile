import {Component, Input, Output, EventEmitter} from '@angular/core';
import {User} from '../../models/user.model';

/**
 * Displays a list of boards
 */
@Component({
  selector: 'user-list',
  templateUrl: 'build/components/user-list/user-list.html'
})
export class UserList {
  @Input() users: Array<User> = [];
  @Input() title: string = "";
  @Input() select: boolean = false;
  @Input() usersSelected: Array<User> = [];
  @Output() userClick: EventEmitter<{}> = new EventEmitter();

  constructor() {

  }

  userClicked(user: User) {
    if (this.select) {
      if (this.isSelected(user)) {
        let index = this.usersSelected.findIndex(u => u.id === user.id);
        this.usersSelected.splice(index, 1);
      } else {
        this.usersSelected.push(user);
      }
    }
    this.userClick.emit(user);
  }

  isSelected(user: User) {
    if (!this.select) {
      return false;
    }
    return !!this.usersSelected.find(u => u.id === user.id);
  }
}