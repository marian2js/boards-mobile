import {Injectable} from '@angular/core';
import {LoadingController, Loading} from 'ionic-angular';
import {ApiService} from './api.service';

@Injectable()
export class LoadingService {
  loader: Loading;

  constructor(private loadingCtrl: LoadingController) {

  }

  start() {
    ApiService.requestStartEmitter.subscribe(() => this.onRequestStart());
    ApiService.requestEndEmitter.subscribe(() => this.onRequestEnd());
  }

  private onRequestStart() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

  private onRequestEnd() {
    this.loader.dismiss();
  }
}