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
}