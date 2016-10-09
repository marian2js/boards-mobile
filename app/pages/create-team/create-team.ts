import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Team} from '../../models/team.model';
import {TeamService} from '../../services/team.service';
import {Autofocus} from '../../directives/autofocus/autofocus';

@Component({
  templateUrl: 'build/pages/create-team/create-team.html',
  providers: [
    TeamService
  ],
  directives: [
    Autofocus
  ]
})
export class CreateTeamPage {
  private team: Team = new Team();

  constructor(private navCtrl: NavController, private teamService: TeamService) {

  }

  /**
   * Create the team and close this modal
   */
  create() {
    this.teamService.createTeam(this.team)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }

}