import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Team} from '../../models/team.model';
import {TeamService} from '../../services/team.service';
import {Autofocus} from '../../directives/autofocus/autofocus';

@Component({
  templateUrl: 'build/pages/team-add-user/team-add-user.html',
  providers: [
    TeamService
  ],
  directives: [
    Autofocus
  ]
})
export class TeamAddUserPage {
  team: Team;
  private user: string = "";

  constructor(navParams: NavParams, private navCtrl: NavController, private teamService: TeamService) {
    this.team = navParams.get('team');
  }

  /**
   * Create the team and close this modal
   */
  create() {
    this.teamService.addUser(this.team, this.user)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }

}