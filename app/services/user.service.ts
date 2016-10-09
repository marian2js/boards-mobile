import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Board} from '../models/board.model';
import {User} from '../models/user.model';
import {Team} from '../models/team.model';
import {ApiService} from './api.service';
import {BoardService} from './board.service';
import {StorageService} from './storage.service';
import {TeamService} from './team.service';

const ENTITY_NAME = 'users';
const CURRENT_USER_KEY = `${ENTITY_NAME}_current`;

@Injectable()
export class UserService extends ApiService {
  private currentUser: User;

  constructor(http: Http, private storageService: StorageService) {
    super(ENTITY_NAME, http);
  }

  /**
   * Returns the current user or null if there is not an user authenticated
   */
  getCurrentUser(): Promise<User> {
    if (this.currentUser) {
      return Promise.resolve(this.currentUser);
    }
    let userData = this.storageService.get(CURRENT_USER_KEY);
    if (userData && userData.id) {
      this.currentUser = new User();
      this.currentUser.id = userData.id;
      ApiService.accessToken = userData.accessToken;
      return this.fetchCurrentUserData();
    }
    return Promise.resolve(null);
  }

  /**
   * Sets the current user with the data for requesting the access token
   */
  setCurrentUser(id, code): Promise<any> {
    return this.requestAccessToken(id, code)
      .then(accessToken => {
        if (!accessToken) {
          return;
        }
        this.storageService.set(CURRENT_USER_KEY, {
          id,
          accessToken
        });
      });
  }

  /**
   * Fetches user's data
   */
  fetchCurrentUserData(): Promise<User> {
    let url = super.getApiUrl(this.currentUser.id);
    return super.get(url)
      .then(res => {
        this.currentUser = UserService.mapUser(res);
        return this.currentUser;
      });
  }

  /**
   * Saves current user's data
   */
  saveCurrentUser(): Promise<any> {
    let url = super.getApiUrl(this.currentUser.id);
    return super.put(url, this.currentUser);
  }

  getUserBoards(): Promise<Array<Board>> {
    let url = super.getApiUrl(this.currentUser.id, 'boards');
    return super.get(url)
      .then(boards => boards.map(board => BoardService.mapBoard(board)));
  }

  getUserTeams(): Promise<Array<Team>> {
    let url = super.getApiUrl(this.currentUser.id, 'teams');
    return super.get(url)
      .then(teams => teams.map(team => TeamService.mapTeam(team)));
  }

  /**
   * Fetches user's access token
   */
  private requestAccessToken(id, code): Promise<string> {
    let url = super.getApiUrl(id, 'request_access_token');
    return super.get(url, { code })
      .then(res => res.access_token);
  }

  static mapUser(data): User {
    let user = new User();
    user.id = data.id;
    user.username = data.username;
    user.email = data.email;
    user.firstName = data.first_name;
    user.lastName = data.last_name;
    user.gender = data.gender;
    user.birthday = data.birthday;
    user.createdAt = data.created_at;
    return user;
  }

}