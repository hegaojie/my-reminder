import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'reminder-detail.page.html',
})
export class ReminderDetailPage {

  reminder = {};

  tempReminder = {};

  constructor(private nav: NavController, private navParams: NavParams) {

  }


  ionViewDidLoad(){
    this.reminder = this.navParams.data;
    this.tempReminder = this.reminder;
  }


  saveReminder(){
    this.nav.popToRoot()
    
  }
}
