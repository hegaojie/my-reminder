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

    this.rs.deleteReminder({id:"1"});
    this.rs.deleteReminder({id:"2"});
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
    this.rs.getAllReminders((data)=>{
      this.items.push(data);
    });

    let index = 0;
    setInterval(()=>{
      this.items.forEach((v, i)=>{
        if (this.cs.shouldRemind(v)){
          this.notification.schedule({
            id: 1,
            title: 'My Reminder',
            text: `'${v.description}'`
          });
        }
      });
    }, 1000 * 3600 * 24);
  }

  removeReminder($event, item){
    let index = this.items.findIndex(r => r.id === item.id);
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
    this.nav.push(ReminderDetailPage, {id: -1, description: "", date: "", calendar: "s", enableReminding: true});
  }

  getCalendarType(reminder){
    if (reminder.calendar === "l"){
      return "农";
    }
    else{
      return "阳";
    }
  }

  getCalendarColor(reminder){
    if (reminder.calendar === "l"){
      return "danger";
    }
    else{
      return "custom03";
    }
  }

  filterReminders(ev){

    if (this.origItems.length <= 0 ){
      this.origItems = this.items.slice(0);
      this.origItems.reverse();
    }

    this.items = this.origItems;
    
    let query = ev.target.value;
    if (query && query.trim() != ''){
      this.items = this.items.filter(i => {return i.description.toLowerCase().indexOf(query.toLowerCase()) > -1});
    }
  }

  private origItems = [];
}
