import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Team} from '../../models/team.model';
import {TeamPage} from '../../pages/team/team';

/**
 * Displays a list of boards
 */
@Component({
  selector: 'team-list',
  templateUrl: 'build/components/team-list/team-list.html'
})
export class TeamList {
  @Input() teams: Array<Team>;

  constructor(private nav: NavController) {

  }

  openTeam(team: Team) {
    this.nav.push(TeamPage, {
      team
    });
  }
}