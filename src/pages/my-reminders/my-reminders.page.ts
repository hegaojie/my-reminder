import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { ReminderDetailPage } from '../pages';
import { ReminderStorage, CalendarService } from '../../shared/shared';


@Component({
  templateUrl: 'my-reminders.page.html',
})
export class MyRemindersPage {

  private items = [];

  constructor(
    private notification: LocalNotifications,
    private cs: CalendarService,
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

    //todo: init checker
    setInterval(()=>{
      this.items.forEach((v, i)=>{
        let tdate = new Date();
        let month = tdate.getMonth(); //0 based
        let date = tdate.getDate();
        
        let rdate = this.cs.getSolarCalendarDate(tdate.getFullYear(), new Date(v.date), v.calendar);
        let rmonth = rdate.getMonth();
        let rsdate = rdate.getDate();

        if (rmonth === month && rsdate === date){
          //todo: send local notification
          console.log("It is today");
          this.notification.schedule({
            id: 1,
            text: `${v.description} is today`
          });
        }
      });
    }, 5000);
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
