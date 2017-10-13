import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ReminderDetailPage } from '../pages';
import { ReminderStorage } from '../../shared/shared';

@Component({
  templateUrl: 'my-reminders.page.html',
})
export class MyRemindersPage {

  items: any[];

  constructor(private nav: NavController, private rs: ReminderStorage) {

  }

  ionViewDidLoad(){
    let item1 = {
      description: 'reminder 001',
    date: '2017-01-01',
    calendar: 'l'};

    let item2 = {description: 'reminder 002',
    date: '2017-02-02',
    calendar: 's'};
    

    this.rs.insertReminder(item1);

    this.rs.insertReminder(item2);

    this.rs.getMyReminders().then(data => this.items = data);
    // this.items = [{
    //   id: 1,
    //   description: 'reminder 001',
    //   date: '2017-01-01',
    //   calendar: 'l'
    // }, {
    //   id: 2,
    //   description: 'reminder 002',
    //   date: '2017-02-02',
    //   calendar: 's'
    // }];


  }

  removeReminder($event, item){
    this.items = this.items.filter(i => {return i != item});
  }

  editReminder($event, item, sitem){
    sitem.close();
    this.nav.push(ReminderDetailPage, item);
  }
}
