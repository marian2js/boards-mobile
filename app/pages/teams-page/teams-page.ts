import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {User} from '../../models/user.model';
import {Team} from '../../models/team.model';
import {UserService} from '../../services/user.service';
import {CreateTeamPage} from '../create-team/create-team';
import {TeamList} from '../../components/team-list/team-list';

@Component({
  templateUrl: 'build/pages/teams-page/teams-page.html',
  directives: [TeamList]
})
export class TeamsPage {
  private user: User;
  teams: Array<Team> = [];

  constructor(private navCtrl: NavController, private userService: UserService) {

  }

  ionViewWillEnter() {
    this.userService.getCurrentUser()
      .then(user => {
        this.user = user;
        return this.userService.getUserTeams();
      })
      .then(teams => this.teams = teams);
  }

  /**
   * Open a modal for creating a new board
   */
  addIconTapped() {
    this.navCtrl.push(CreateTeamPage);
  }
}
