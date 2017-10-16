import { Component, Injectable } from '@angular/core';
import * as lunar from 'lunar';

@Injectable() 
export class CalendarService {
    getSolarCalendarDate(year, date, calendar){
        if (calendar === "s"){
            return date;
        }
        if (calendar === "l"){
            let m = date.getMonth();
            let d = date.getDate();
            let ld = lunar([year, m, d, true]);
            return ld.toDate();
        }
        
        return date;
    }

    isToday(reminder){
        let today = new Date();
        let tmonth = today.getMonth(); //0 based
        let tdate = today.getDate();
        
        let rdate = this.getSolarCalendarDate(today.getFullYear(), new Date(reminder.date), reminder.calendar);
        let rmonth = rdate.getMonth();
        let rsdate = rdate.getDate();

        return rmonth === tmonth && rsdate === tdate;
    }
}