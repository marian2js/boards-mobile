import {Injectable} from '@angular/core';
import {InAppBrowser} from 'ionic-native';
import {config} from '../config';
import {UserService} from './user.service';

const PROCESS_LOGIN_FLAG = '/process-login?';

interface AuthResponse {
  id?: string;
  code?: string;
}

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {

  }

  /**
   * Process the authentication with Google
   */
  processGoogleAuth() {
    return this.doExternalAuth('google');
  }

  /**
   * Process the authentication with Facebook
   */
  processFacebookAuth() {
    return this.doExternalAuth('facebook');
  }

  /**
   * Process an external authentication and save the current user
   */
  private doExternalAuth(provider): Promise<any> {
    return new Promise((resolve, reject) => {
      let authUrl = `${config.server_base_url}/auth/${provider}`;
      let browser = InAppBrowser.open(authUrl, '_self', 'location=no');
      browser.addEventListener('loadstart', event => {
        if (event.url.indexOf(PROCESS_LOGIN_FLAG) !== -1) {
          // Auth completed, close the browser
          browser.close();

          // Get the auth data from the URL's query
          let authResponse: AuthResponse = {};
          let data = event.url
            .split(PROCESS_LOGIN_FLAG)[1]
            .split('#')[0]
            .split('&');
          data.forEach(item => {
            let parts = item.split('=');
            authResponse[parts[0]] = parts[1];
          });

          this.userService.setCurrentUser(authResponse.id, authResponse.code)
            .then(resolve)
            .catch(reject);
        }
      });
    });
  }

}