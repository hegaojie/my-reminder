import { Component, Injectable } from '@angular/core';
import * as lunar from 'lunar';

@Injectable() 
export class CalendarService {
    private bigMonths = [5, 7, 8, 10, 12];
    private smallMonths = [2, 4, 6, 9, 11];
    public ALL_SECONDS_A_DAY = 86400000;
    public ALL_DAYS_A_YEAR = 365;

    convertToSolarDateFromString(lunarDateString){
        return this.convertToSolarDateFromDate(new Date(lunarDateString));
    }

    convertToSolarDateFromDate(lunarDate){
        let lmonth = lunarDate.getMonth();
        let ldate = lunarDate.getDate();
        let date = lunar([new Date().getFullYear(), lmonth, ldate, true]);
        return date.toDate();
    }
    
    fromDateStringToShortDateString(dateString) {
        return this.fromDateToShortDateString(new Date(dateString));
    }

    // return 'YYYY-MM-DD' format string
    fromDateToShortDateString(d){
        let month = '' + (d.getMonth() + 1);
        let date = '' + d.getDate();
        let year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (date.length < 2) date = '0' + date;
        return [year, month, date].join('-');
    }

    isDate1EarlierThanDate2(date1, date2){
        return (date1.getMonth() < date2.getMonth() || date1.getDate() < date2.getDate());
    }

    getDaysDifference(dateStr, calendarType){
        let today = new Date();
        let reminderDate = calendarType === "l" ? this.convertToSolarDateFromString(dateStr) : new Date(dateStr);
        let tTime = today.getTime();
        let rTime = reminderDate.getTime();
        var timeDiff = Math.abs(rTime - tTime);
        var daysDiff = Math.floor(timeDiff/this.ALL_SECONDS_A_DAY);
        return this.isDate1EarlierThanDate2(reminderDate, today) ? this.ALL_DAYS_A_YEAR - daysDiff : daysDiff;
    }

    ifReachToday(calendarType, dateStr, daysBefore){
        let daysDiff = this.getDaysDifference(dateStr, calendarType);
        return daysDiff === daysBefore;
    }

    // shouldRemind(reminder){
    //     if (!reminder.enableReminding){
    //         return false;
    //     }
        
    //     let today = new Date();
    //     let tmonth = today.getMonth() + 1; //0 based
    //     let tdate = today.getDate();
        
    //     let rdate = this.getSolarCalendarDate(today.getFullYear(), new Date(reminder.date), reminder.calendar);
    //     let rmonth = rdate.getMonth() + 1; //0 based
    //     let rsdate = rdate.getDate();

    //     return this.foo(rmonth, tmonth, tdate, rsdate, reminder.beforeReminding);
    // }

    // getSolarCalendarDate(year, date, calendar){
    //     if (calendar === "s"){
    //         return date;
    //     }
    //     if (calendar === "l"){
    //         let m = date.getMonth();
    //         let d = date.getDate();
    //         let ld = lunar([year, m, d, true]);
    //         return ld.toDate();
    //     }
        
    //     return date;
    // }

    // foo(rmonth, tmonth, tdate, rsdate, days){
    //    if (rsdate > days){
    //        return rmonth === tmonth && tdate === (rsdate - days);
    //    }

    //    if (rmonth === 3){
    //        return 2 === tmonth && (28 + rsdate - days) == tdate;
    //    }

    //    if (rmonth === 1){
    //        return 12 === tmonth && (31 + rsdate - days) === tdate;
    //    }

    //    if (this.bigMonths.indexOf(rmonth) > -1){
    //        return (rmonth - 1) === tmonth && (30 + rsdate - days) === tdate;
    //    }

    //    if (this.smallMonths.indexOf(rmonth) > -1){
    //        return (rmonth - 1) === tmonth && (31 + rsdate - days) === tdate;
    //    }

    //    return true;
    // }
}