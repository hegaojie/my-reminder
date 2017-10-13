import { Component, Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ReminderStorage {
    _db: SQLiteObject;

    constructor(private sqlite: SQLite){
        this.sqlite.create({name: 'reminders.db', location:'default'})
        .then((db: SQLiteObject)=>{
            this._db = db;
            this._db.executeSql('CREATE TABLE IF NOT EXISTS reminders(id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, date TEXT, type TEXT)', {})
            .then(res => console.log('executed sql'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
    }

    getMyReminders(){
        return this._db.executeSql('select * from reminders', []);
    }

    insertReminder(reminder) {
        let insert_query = 'INSERT INTO reminders VALUES(?, ?, ?)';
        this._db.executeSql(insert_query, [reminder.description, reminder.date, reminder.type]).then(data => console.log('reminder inserted'));
    }

    updateReminder(reminder){
        let update_query = 'UPDATE reminders SET description=?, type=?, date=? WHERE id=>';
        this._db.executeSql(update_query, [reminder.description, reminder.type, reminder.date, reminder.id]).then(data => console.log('reminder updated'));
    }

    deleteReminder(id){
        let delete_query = '';
        this._db.executeSql('DELETE FROM reminders WHERE id=?', [id]).then(data => console.log('reminder deleted'));
    }
}