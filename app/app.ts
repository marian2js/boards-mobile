import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ApiService} from './services/api.service';
import {AuthService} from './services/auth.service';
import {BoardService} from './services/board.service';
import {ListService} from './services/list.service';
import {PictureService} from './services/picture.service';
import {StorageService} from './services/storage.service';
import {TaskService} from './services/task.service';
import {UserService} from './services/user.service';
import {HomePage} from './pages/home/home';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [
    ApiService,
    AuthService,
    BoardService,
    ListService,
    PictureService,
    StorageService,
    TaskService,
    UserService
  ]
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
