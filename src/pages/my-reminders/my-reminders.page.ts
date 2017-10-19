import { Component } from '@angular/core';
import { NavController, Events, ToastController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ReminderDetailPage } from '../pages';
import { ReminderStorage, CalendarService } from '../../shared/shared';

@Component({
  templateUrl: 'my-reminders.page.html',
})
export class MyRemindersPage {
  private items = [];
  private origItems = [];
  private intervalIds: any[] = [];
  private dailyIntervalId : number = 0;

  constructor(
    private toastCtrl: ToastController,
    private notification: LocalNotifications,
    private cs: CalendarService,
    private events: Events,
    private nav: NavController, 
    private rs: ReminderStorage) {
  }

  ionViewDidLoad(){
    this.subscribeEvents();
    this.refreshReminders().then(()=>this.setupReminding());

    // refresh data once a day automatically
    this.dailyIntervalId = setInterval(()=>{
      this.refreshReminders().then(()=>{this.setupReminding();});
    }, this.cs.ALL_SECONDS_A_DAY);
  }

  ionViewWillUnload(){
    clearInterval(this.dailyIntervalId);
    this.clearAllRemindingIntervals();
  }

  private clearAllRemindingIntervals(){
    this.intervalIds.forEach((v, i)=>{clearInterval(v.intervalId)});
    this.intervalIds = [];
  }

  subscribeEvents(){
    this.events.subscribe('reminder:added', (reminder)=>{
      this.items.push(reminder);
      this.setNotificationForReminder(reminder);
    });

    this.events.subscribe('reminder:updated', (data)=>{
      let index = this.items.findIndex(r => r.id === data.reminder.id);
      this.items[index] = data.reminder;

      if (data.notificationAdjusted){
        this.removeNotification(data.reminder);
        this.setNotificationForReminder(data.reminder);
      }
    });

    this.events.subscribe('reminder:deleted', (reminder)=>{
      this.removeReminder(reminder);
      this.removeNotification(reminder);
    });
  }

  removeNotification(reminder){
    let index = this.intervalIds.findIndex(i => i.id === reminder.id);
    clearInterval(this.intervalIds[index].intervalId);
    this.intervalIds.splice(index, 1);
  }

  setNotificationForReminder(reminder){
    if (this.shouldRemind(reminder)){
      let intervalId = setInterval(()=>{
        this.notification.schedule({
          id: reminder.id,
          title: 'My Reminder',
          text: `'${reminder.description}'`
        });
      }, Math.round(this.cs.ALL_SECONDS_A_DAY / reminder.remindingTimes));
      this.intervalIds.push({id: reminder.id, intervalId: intervalId});
    }
  }

  setupReminding(){
    this.clearAllRemindingIntervals();

    this.items.forEach((v, i)=>{
      this.setNotificationForReminder(v);
    });
  }

  shouldRemind(reminder){
    if (!reminder.enableReminding){
      return false;
    }

    return this.cs.ifReachToDay(reminder.calendar, reminder.date, reminder.beforeReminding);
  }

  refreshReminders(){
    this.items = [];
    return this.rs.getAllReminders((data)=>this.items.push(data));
  }

  removeReminder(item){
    let index = this.items.findIndex(r => r.id === item.id);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.rs.deleteReminder(item);

    let toast = this.toastCtrl.create({
      message: `Reminder '${item.description}' was deleted successfully`,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  editReminder($event, item, sitem){
    sitem.close(); // close the slide
    this.nav.push(ReminderDetailPage, item);
  }

  addReminder(){
    this.nav.push(ReminderDetailPage, {id: -1, description: "", 
    date: this.cs.fromDateToShortDateString(new Date()),
    calendar: "s", 
    enableReminding: 
    true, 
    beforeReminding: 0, 
    remindingTimes: 1});
  }

  getItemClass(reminder){
    let daysDiff = this.getDaysDifference(reminder);
    if (daysDiff <= 3) {return "danger"};
    if (daysDiff <= 7) {return "warn"};
    return "custom03";
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

  getDaysDifference(reminder){
    return this.cs.getDaysDifference(reminder.date, reminder.calendar);
  }

  doRefresh(refresher){
    this.refreshReminders().then(()=>{
      this.setupReminding();
      refresher.complete();
    });
  }
}
