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
        let rTime = new Date(today.getFullYear(), reminderDate.getMonth(), reminderDate.getDate()).getTime();
        var timeDiff = Math.abs(rTime - tTime);
        var daysDiff = Math.floor(timeDiff/this.ALL_SECONDS_A_DAY);
        return this.isDate1EarlierThanDate2(reminderDate, today) ? this.ALL_DAYS_A_YEAR - daysDiff : daysDiff;
    }

    ifReachToDay(calendarType, dateStr, daysBefore){
        let daysDiff = this.getDaysDifference(dateStr, calendarType);
        return daysDiff === daysBefore;
    }
}