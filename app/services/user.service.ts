import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Board} from '../models/board.model';
import {User} from '../models/user.model';
import {ApiService} from './api.service';
import {BoardService} from './board.service';
import {StorageService} from './storage.service';

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
        this.currentUser.username = res.username;
        this.currentUser.email = res.email;
        this.currentUser.firstName = res.first_name;
        this.currentUser.lastName = res.last_name;
        this.currentUser.gender = res.gender;
        this.currentUser.birthday = res.birthday;
        this.currentUser.createdAt = res.created_at;
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

  /**
   * Fetches user's access token
   */
  private requestAccessToken(id, code): Promise<string> {
    let url = super.getApiUrl(id, 'request_access_token');
    return super.get(url, { code })
      .then(res => res.access_token);
  }

}