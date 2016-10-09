import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ApiService} from './api.service';
import {Team} from '../models/team.model';
import {UserService} from './user.service';

const ENTITY_NAME = 'teams';

@Injectable()
export class TeamService extends ApiService {
  constructor(http: Http) {
    super(ENTITY_NAME, http);
  }

  createTeam(team: Team): Promise<Team> {
    let url = super.getApiUrl();
    return super.post(url, TeamService.getTeamData(team))
      .then(res => TeamService.mapTeam(res));
  }

  populateTeam(team: Team): Promise<Team> {
    let url = super.getApiUrl(team.id);
    return super.get(url)
      .then(res => TeamService.mapTeam(res));
  }

  addUser(team: Team, user: string): Promise<any> {
    let url = super.getApiUrl(team.id, 'add-user');
    return super.post(url, { user });
  }

  static mapTeam(data): Team {
    let team = new Team();
    team.id = data.id;
    team.name = data.name;
    team.createdAt = data.created_at;
    team.users = data.users.map(teamUser => {
      teamUser.user = UserService.mapUser(teamUser.user);
      return teamUser;
    });
    return team;
  }

  static getTeamData(team: Team) {
    return {
      name: team.name,

    };

  }

}