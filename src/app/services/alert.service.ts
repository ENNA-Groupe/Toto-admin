import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public toastController: ToastController
  ) { }

  async toast(data: any){
    console.log(data);
    const toast = await this.toastController.create({
      message: data.message,
      position: 'top',
      color: data.type,
      duration: 2000
    });
    toast.present();
  }

}
