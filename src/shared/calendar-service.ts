import { Component, Injectable } from '@angular/core';
import * as lunar from 'lunar';

@Injectable() 
export class CalendarService {

    private bigMonths = [5, 7, 8, 10, 12];

    private smallMonths = [2, 4, 6, 9, 11];

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

    shouldRemind(reminder){
        if (!reminder.enableReminding){
            return false;
        }
        
        let today = new Date();
        let tmonth = today.getMonth() + 1; //0 based
        let tdate = today.getDate();
        
        let rdate = this.getSolarCalendarDate(today.getFullYear(), new Date(reminder.date), reminder.calendar);
        let rmonth = rdate.getMonth() + 1; //0 based
        let rsdate = rdate.getDate();

        return this.foo(rmonth, tmonth, tdate, rsdate, reminder.beforeReminding);
    }

    foo(rmonth, tmonth, tdate, rsdate, days){
       if (rsdate > days){
           return rmonth === tmonth && tdate === (rsdate - days);
       }

       if (rmonth === 3){
           return 2 === tmonth && (28 + rsdate - days) == tdate;
       }

       if (rmonth === 1){
           return 12 === tmonth && (31 + rsdate - days) === tdate;
       }

       if (this.bigMonths.indexOf(rmonth) > -1){
           return (rmonth - 1) === tmonth && (30 + rsdate - days) === tdate;
       }

       if (this.smallMonths.indexOf(rmonth) > -1){
           return (rmonth - 1) === tmonth && (31 + rsdate - days) === tdate;
       }

       return true;
    }
}