import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';



@Component({
  templateUrl: 'reminder-detail.page.html',
})
export class ReminderDetailPage {

  reminder: any;
  localReminder: any = {};

  constructor(
    private toastCtrl: ToastController,
    private nav: NavController, 
    private navParams: NavParams
    ) {
  }


  ionViewDidLoad(){
    this.reminder = this.navParams.data;
    this.localReminder = JSON.parse(JSON.stringify(this.reminder));
  }


  saveReminder(){
   
    this.reminder.description = this.localReminder.description;
    this.reminder.date = this.localReminder.date;
    this.reminder.calendar = this.localReminder.calendar;
    this.presentToast();
    this.nav.popToRoot();
   
    //todo: 
  }

  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Reminder was updated successfully',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
