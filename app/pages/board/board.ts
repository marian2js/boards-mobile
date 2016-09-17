import {Component} from '@angular/core';
import {NavParams, ModalController, ActionSheetController} from 'ionic-angular';
import {DragulaService} from 'ng2-dragula/src/app/providers/dragula.provider';
import {Board} from '../../models/board.model';
import {BoardService} from '../../services/board.service';
import {TaskService} from '../../services/task.service';
import {CreateListPage} from '../create-list/create-list';
import {CreateTaskPage} from '../create-task/create-task';
import {ListElement} from '../../components/list-element/list-element';
import {PictureService} from '../../services/picture.service';

@Component({
  templateUrl: 'build/pages/board/board.html',
  directives: [ListElement],
  providers: [DragulaService]
})
export class BoardPage {
  board: Board;

  constructor(navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private dragulaService: DragulaService,
              private modalCtrl: ModalController,
              private boardService: BoardService,
              private taskService: TaskService,
              private pictureService: PictureService) {
    this.board = navParams.get('board');

    dragulaService.dropModel.subscribe(args => this.onElementDropped(args));
  }

  ionViewWillEnter() {
    this.boardService.populateBoardLists(this.board)
      .then(() => this.boardService.populateBoardTasks(this.board));
  }

  onCreateListPressed() {
    let modal = this.modalCtrl.create(CreateListPage, {
      board: this.board
    });
    modal.present();
  }

  addIconPressed() {
    let modal = this.modalCtrl.create(CreateTaskPage, {
      board: this.board
    });
    modal.present();
  }

  /**
   * Fired when an element is dropped in a different position
   */
  private onElementDropped(args) {
    switch (args[0]) {
      case 'tasks-bag':
        return this.onTaskDropped(args.slice(0));
    }
  }

  /**
   * Fired when a task is dropped in a different position
   */
  private onTaskDropped(args) {
    let taskId = args[1].dataset.taskId;
    let list;
    let task;

    // Find list and task models
    for (let i = 0; i < this.board.lists.length; i++) {
      let taskIndex;
      list = this.board.lists[i];
      taskIndex = list.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        task = list.tasks[taskIndex];
        task.position = taskIndex;
        break;
      }
    }

    this.taskService.updateTask(task, list);
  }

  moreIconPressed() {
    this.actionSheetCtrl.create({
      buttons: [{
        text: 'Upload physical board',
        icon: 'camera',
        handler: () => {
          this.pictureService.getPicture()
            .then(image => this.boardService.importPrintableBoard(this.board, image));
        }
      }, {
        text: 'Print',
        icon: 'print',
        handler: () => {
          this.boardService.exportPrintableBoard(this.board);
        }
      }]
    }).present();
  }
}