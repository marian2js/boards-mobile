import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Team} from '../../models/team.model';
import {TeamService} from '../../services/team.service';
import {TeamAddUserPage} from '../team-add-user/team-add-user';
import {UserList} from '../../components/user-list/user-list';

@Component({
  templateUrl: 'build/pages/team/team.html',
  directives: [UserList]
})
export class TeamPage {
  team: Team;

  constructor(navParams: NavParams, private navCtrl: NavController, private teamService: TeamService) {
    this.team = navParams.get('team');
  }

  ionViewWillEnter() {
    this.teamService.populateTeam(this.team)
      .then(team => {
        this.team = team;
      });
  }

  addIconPressed() {
    this.navCtrl.push(TeamAddUserPage, {
      team: this.team
    });
  }
}