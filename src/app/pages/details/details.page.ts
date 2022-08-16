import { UtilService } from './../../services/util.service';
import { ModalComponent } from './../../components/modal/modal.component';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  itemName: string = '';
  dataList: any[] = [];
  collectionName: any;

  constructor(
    private route: ActivatedRoute,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private utilService: UtilService,
  ) { }

  ngOnInit() {
    this.itemName = this.route.snapshot.queryParamMap.get('itemName');
    console.log(this.itemName);
    this.initData();
    this.collectionName = `users/${this.storageService.getUid()}/${this.itemName}`;
  }

  async initData() {
    this.dataList = [];
    const result = await this.storageService.getUserCompetences();
    if (result) {
      result.forEach((res) => {
        let item = res.data();
        item.id = res.id;
        console.log(item);
        this.dataList.push(item);
      });
    }
  }

  async seeMore(item: any) {
    item.type = this.itemName;
    this.openModal(item);
  }

  async edit(item: any) {
    console.log('edit: ', item);
  }

  async deleteItem(id: any) {
    this.utilService.showLoader();
    this.storageService.deleteData(id, this.collectionName).then((res)=> {
      this.utilService.dismiss();
      this.utilService.showToast('Opération réussie', 'success');
    })
    .catch((error)=> {
      this.utilService.dismiss();
      this.utilService.showAlert('Erreur', error);
    })
    .finally(()=> {
      this.utilService.dismiss();
      this.initData();
    });
  }

  async openModal(item) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: item
    });
    modal.present();
  }
}
