import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Team} from '../../models/team.model';
import {TeamPage} from '../../pages/team/team';
import {User} from '../../models/user.model';

/**
 * Displays a list of boards
 */
@Component({
  selector: 'user-list',
  templateUrl: 'build/components/user-list/user-list.html'
})
export class UserList {
  @Input() users: Array<User>;

  constructor() {

  }
}