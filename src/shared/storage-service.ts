import { Component, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class ReminderStorage {
    constructor(private storage: Storage){
    }

    getAllReminders(){

        return [];
    }

    insertReminder(reminder) {
        this.storage.set(reminder.id, JSON.stringify(reminder));
    }        

    updateReminder(reminder){
        
    }

    deleteReminder(id){
        
    }
}