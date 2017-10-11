import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ReminderDetailPage } from '../pages';

@Component({
  templateUrl: 'my-reminders.page.html',
})
export class MyRemindersPage {

  items: any[];

  constructor(private nav: NavController) {

  }

  ionViewDidLoad(){
    this.items = [{
      id: 1,
      description: 'reminder 001'
    }, {
      id: 2,
      description: 'reminder 002'
    }];
  }

  removeReminder($event, item){
    this.items = this.items.filter(i => {return i != item});
  }

  editReminder($event, item, sitem){
    sitem.close();
    this.nav.push(ReminderDetailPage, item);
  }
}
