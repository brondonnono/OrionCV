import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  data: any;
  isCompetence: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.data = this.navParams.data;
    this.showData();
  }

  showData() {
    if (this.data.type == "competences") {
      this.isCompetence = true;
    } else {
      this.isCompetence = false;
    }
  }

  close() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
