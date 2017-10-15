import { Component, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ReminderStorage {

    constructor(private storage: Storage){
    }

    getAllReminders(handler){
        return this.storage.forEach((v,k,i)=>{
            handler(v);
        });
    }

    insertReminder(reminder) {
        let key = this.getNewId();
        reminder.id = key;
        this.storage.set(key.toString(), reminder);
    }        

    updateReminder(reminder){
        this.storage.set(reminder.id, reminder);
    }

    deleteReminder(reminder){
        this.storage.remove(reminder.id.toString());
    }

    getNewId(){
        return new Date().getUTCMilliseconds();
    }
}