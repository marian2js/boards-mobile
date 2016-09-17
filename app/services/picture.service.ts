import {Injectable} from '@angular/core';
import {Camera} from 'ionic-native';

@Injectable()
export class PictureService {

  getPicture(): Promise<any> {
    return Camera.getPicture({});
  }

}