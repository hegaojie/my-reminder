import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { ReminderStorage, CalendarService } from '../../shared/shared';

@Component({
  templateUrl: 'reminder-detail.page.html',
})
export class ReminderDetailPage {

  reminder: any;
  localReminder: any = {};

  constructor(
    private cs: CalendarService,
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

    if (this.ifNotificationAdjusted()){
      this.events.publish('notification:adjusted', this.localReminder);
    }
    
    this.events.publish('reminder:changed', this.localReminder);
    this.presentToast(`Reminder '${this.localReminder.description}' was saved successfully`);
    this.nav.popToRoot();
  }

  ifNotificationAdjusted(){
    return this.reminder.enableReminding !== this.localReminder.enableReminding 
    || this.reminder.date !== this.localReminder.date
    || this.reminder.remindingTimes !== this.localReminder.remindingTimes
    || this.reminder.beforeReminding !== this.localReminder.beforeReminding;
  }

  deleteReminder(){
    this.events.publish('reminder:deleted', this.localReminder);
    this.presentToast(`Reminder '${this.localReminder.description}' was deleted successfully`);
    this.nav.popToRoot();
  }

  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  toSolarDateShortString(lunarDateStr){
    let solarDate = this.cs.convertToSolarDateFromString(lunarDateStr);
    return this.cs.fromDateToShortDateString(solarDate);
  }
}
