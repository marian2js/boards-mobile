import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {Board} from '../../models/board.model';
import {Relation} from '../../models/relation.model';
import {RelationService} from '../../services/relation.service';
import {Autofocus} from '../../directives/autofocus/autofocus';

@Component({
  templateUrl: 'build/pages/create-relation/create-relation.html',
  providers: [
    RelationService
  ],
  directives: [
    Autofocus
  ]
})
export class CreateRelationPage {
  private relation: Relation = new Relation();
  private board: Board;
  private customPosition = 1;
  private position;

  constructor(params: NavParams,
              private navCtrl: NavController,
              private relationService: RelationService) {
    this.board = params.get('board');
  }

  /**
   * Create the relation and close this modal
   */
  create() {
    switch (this.position) {
      case 'first':
        this.relation.position = 0;
        break;
      case 'last':
        this.relation.position = this.board.relations.length;
        break;
      case 'custom':
        this.relation.position = this.customPosition;
        break;
      default:
        this.relation.position = 0;
    }
    this.relationService.createRelation(this.relation, this.board)
      .then(() => setTimeout(() => this.navCtrl.pop(), 500));
  }
}