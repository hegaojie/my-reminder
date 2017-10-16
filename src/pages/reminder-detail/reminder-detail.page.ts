import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';

import { ReminderStorage } from '../../shared/shared';



@Component({
  templateUrl: 'reminder-detail.page.html',
})
export class ReminderDetailPage {

  reminder: any;
  localReminder: any = {};

  constructor(
    private events: Events,
    private toastCtrl: ToastController,
    private nav: NavController, 
    private navParams: NavParams,
    private storage: ReminderStorage
    ) {
  }

  ionViewDidLoad(){
    this.reminder = this.navParams.data;
    this.localReminder = JSON.parse(JSON.stringify(this.reminder));
  }

  saveReminder(){
    if (this.localReminder.id < 0) {
      this.storage.insertReminder(this.localReminder);
    }
    else {
      this.storage.updateReminder(this.localReminder);
    }
    
    this.events.publish('reminder:changed', this.localReminder);
    this.presentToast();
    this.nav.popToRoot();
  }

  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Reminder was saved successfully',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
