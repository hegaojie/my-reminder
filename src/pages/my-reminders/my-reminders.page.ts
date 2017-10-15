import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

import { ReminderDetailPage } from '../pages';
import { ReminderStorage } from '../../shared/shared';

@Component({
  templateUrl: 'my-reminders.page.html',
})
export class MyRemindersPage {

  private items = [];

  constructor(
    private events: Events,
    private nav: NavController, 
    private rs: ReminderStorage) {
  }

  ionViewDidLoad(){
    this.events.subscribe('reminder:changed', (reminder)=>{
      let index = this.items.findIndex(r => r.id === reminder.id);
      if (index > -1) {
        this.items[index] = reminder;
      }
      else {
        this.items.push(reminder);
      }
    });

    this.items = [];
    this.rs.getAllReminders((data)=>{this.items.push(data)});
  }

  removeReminder($event, item){
    let index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.rs.deleteReminder(item);
  }

  editReminder($event, item, sitem){
    sitem.close(); // close the slide
    this.nav.push(ReminderDetailPage, item);
  }

  addReminder(){
    this.nav.push(ReminderDetailPage, {id: -1, description: "", date: "", calendar: "s"});
  }
}
