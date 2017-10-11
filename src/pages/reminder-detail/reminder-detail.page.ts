import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  templateUrl: 'reminder-detail.page.html',
})
export class ReminderDetailPage {

  reminder: any;
  localReminder: any = {};

  constructor(private nav: NavController, private navParams: NavParams, private sql: SQLite) {
  }


  ionViewDidLoad(){
    this.reminder = this.navParams.data;

    this.localReminder = JSON.parse(JSON.stringify(this.reminder));
  }


  saveReminder(){
   
    this.reminder.description = this.localReminder.description;
    this.nav.popToRoot();
   
    //todo: 
  }
}
