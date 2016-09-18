import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Transfer} from 'ionic-native';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {config} from '../config';

@Injectable()
export abstract class ApiService {
  protected static accessToken: string;
  static requestStartEmitter: Subject<any> = new Subject();
  static requestEndEmitter: Subject<any> = new Subject();

  constructor(protected entity: string, private http: Http) {

  }

  /**
   * Returns the URL for a specific API endpoint
   */
  protected getApiUrl(...args): string {
    let argsArray = Array.prototype.slice.call(args);
    let urlParts = [
      config.server_base_url,
      config.api_path,
      this.entity
    ].concat(argsArray);
    return urlParts.join('/');
  }

  /**
   * Makes a GET request to an API endpoint
   */
  protected get(url: string, query = {}): Promise<any> {
    ApiService.requestStartEmitter.next(null);
    let options = {
      headers: ApiService.getApiHeaders()
    };
    url += ApiService.queryToString(query);
    return this.http.get(url, options)
      .map(res => res.json())
      .toPromise()
      .then(data => {
        ApiService.requestEndEmitter.next(null);
        return data;
      });
  }

  /**
   * Makes a POST request to an API endpoint
   */
  protected post(url: string, body = {}): Promise<any> {
    ApiService.requestStartEmitter.next(null);
    let options = {
      headers: ApiService.getApiHeaders()
    };
    return this.http.post(url, body, options)
      .map(res => res.json())
      .toPromise()
      .then(data => {
        ApiService.requestEndEmitter.next(null);
        return data;
      });
  }

  /**
   * Makes a PUT request to an API endpoint
   */
  protected put(url: string, body = {}): Promise<any> {
    ApiService.requestStartEmitter.next(null);
    let options = {
      headers: ApiService.getApiHeaders()
    };
    return this.http.put(url, body, options)
      .map(res => res.json())
      .toPromise()
      .then(data => {
        ApiService.requestEndEmitter.next(null);
        return data;
      });
  }

  /**
   * Makes a DELETE request to an API endpoint
   */
  protected delete(url: string): Promise<any> {
    ApiService.requestStartEmitter.next(null);
    let options = {
      headers: ApiService.getApiHeaders()
    };
    return this.http.delete(url, options)
      .map(res => res.json())
      .toPromise()
      .then(data => {
        ApiService.requestEndEmitter.next(null);
        return data;
      });
  }

  /**
   * Request a file to an API endpoint
   */
  protected getFile(url: string, query = {}): Promise<any> {
    ApiService.requestStartEmitter.next(null);
    let options = {
      headers: ApiService.getApiHeaders()
    };
    url += ApiService.queryToString(query);
    return this.http.get(url, options)
      .toPromise()
      .then((res: any) => {
        ApiService.requestEndEmitter.next(null);
        return res._body;
      });
  }

  /**
   * Upload a file to an API endpoint
   */
  protected uploadFile(url: string, file: string, key: string): Promise<any> {
    ApiService.requestStartEmitter.next(null);
    let options = {
      fileKey: key,
      headers: ApiService.getApiHeaders(false)
    };
    const fileTransfer = new Transfer();
    return fileTransfer.upload(file, url, options)
      .then(data => {
        ApiService.requestEndEmitter.next(null);
        return JSON.parse(data.response);
      });
  }

  /**
   * Default headers for requesting an API endpoint
   */
  private static getApiHeaders(json = true): Headers {
    let headers = new Headers();
    if (ApiService.accessToken) {
      headers.append('Authorization', `Bearer ${ApiService.accessToken}`);
    }
    if (json) {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }

  /**
   * Converts an object into a query string
   */
  private static queryToString(query = {}): string {
    let url = '?';
    for (let key in query) {
      if (query.hasOwnProperty(key) && query[key]) {
        url += `${key}=${query[key]}&`
      }
    }
    return url;
  }

}