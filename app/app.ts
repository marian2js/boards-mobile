import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {BoardService} from './services/board.service';
import {RelationService} from './services/relation.service';
import {TeamService} from './services/team.service';
import {LoadingService} from './services/loading.service';
import {PictureService} from './services/picture.service';
import {StorageService} from './services/storage.service';
import {ItemService} from './services/item.service';
import {UserService} from './services/user.service';
import {HomePage} from './pages/home/home';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
    ApiService,
    AuthService,
    BoardService,
    RelationService,
    TeamService,
    LoadingService,
    PictureService,
    StorageService,
    ItemService,
    UserService
  ]
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, loadingService: LoadingService) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      loadingService.start();
    });
  }
}

ionicBootstrap(MyApp);
